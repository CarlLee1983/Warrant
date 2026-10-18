import { readFileSync } from 'node:fs';

const files = ['README.md', 'README.zh-TW.md', 'README.ja.md'];
// Each row is one section, in canonical order, across the three README locales.
const headings = [
  ['Three rules', '三條規則', '三つのルール'],
  ['Install (Claude Code)', '安裝（Claude Code）', 'インストール（Claude Code）'],
  ['Install (Codex)', '安裝（Codex）', 'インストール（Codex）'],
  ['Install and update (Skills CLI)', '安裝與更新（Skills CLI）', 'インストールと更新（Skills CLI）'],
  ['Adopt', '採用', '導入'],
  ['Documentation', '文件', 'ドキュメント'],
  ['Verification', '驗證', '検証'],
  ['Behaviour evals', '行為驗收（eval）', '振る舞いの評価（eval）'],
  ['License', '授權', 'ライセンス'],
];
const listItem = /^([0-9]+\.|-)[\t\v\f\r ]/;
let failed = false;

function report(file, section, signal, detail) {
  console.error(`readme-sync: ${file} [${section}] ${signal}: ${detail}`);
  failed = true;
}

function metrics() {
  return { paragraphs: 0, 'list-items': 0, code: [], links: new Set() };
}

function read(file, locale) {
  const sections = new Map([[-1, metrics()]]);
  const seen = new Set();
  let current = sections.get(-1);
  let inCode = false;
  let inParagraph = false;
  let position = 0;
  // Ignore the split's artificial final line, as awk/grep do for a trailing LF.
  const text = readFileSync(file, 'utf8');
  const lines = text.replace(/\n$/, '').split('\n');
  for (const [index, line] of lines.entries()) {
    if (!inCode && line.startsWith('## ')) {
      const heading = line.slice(3);
      const id = headings.findIndex((row) => row[locale] === heading);
      if (id === -1) report(file, heading, 'headings', 'unknown section');
      else {
        if (seen.has(id)) report(file, heading, 'headings', 'duplicate section');
        if (id !== position) report(file, heading, 'headings', `out of order; expected ${headings[position]?.[locale] ?? 'end of document'}`);
        seen.add(id);
      }
      position++;
      current = metrics();
      // Unknown and duplicate sections already fail; retain metrics for diagnostics.
      sections.set(id === -1 ? `unknown-${position}` : id, current);
    }
    // These signals intentionally include fenced content, matching the old grep rules.
    if (listItem.test(line)) current['list-items']++;
    for (const match of line.matchAll(/\]\([^)]+\)/g)) {
      const target = match[0].slice(2, -1).replace(/#.*$/, '');
      if (!/^(README(\.[A-Za-z-]+)?\.md)?$/.test(target)) current.links.add(target);
    }
    // Preserve the original triple-backtick toggling and paragraph block rules.
    if (line.startsWith('```')) {
      inCode = !inCode;
      inParagraph = true;
      continue;
    }
    if (inCode) {
      current.code.push(line);
      continue;
    }
    if (line === '') {
      inParagraph = false;
      continue;
    }
    if (!inParagraph) {
      inParagraph = true;
      if (!line.startsWith('#') && !listItem.test(line) && index !== 2) current.paragraphs++;
    }
  }
  headings.forEach((row, id) => {
    if (!seen.has(id)) report(file, row[locale], 'headings', 'missing section');
  });
  return sections;
}

const documents = files.map(read);
for (let locale = 1; locale < files.length; locale++) {
  for (const id of [-1, ...headings.keys()]) {
    const source = documents[0].get(id);
    const translation = documents[locale].get(id);
    if (!source || !translation) continue;
    const heading = id === -1 ? 'preamble' : headings[id][locale];
    for (const signal of ['paragraphs', 'list-items', 'code', 'links']) {
      const value = (section) => signal === 'links' ? [...section.links].sort() : section[signal];
      if (JSON.stringify(value(source)) !== JSON.stringify(value(translation))) {
        report(files[locale], heading, signal, 'differs from README.md');
      }
    }
  }
}
process.exitCode = failed ? 1 : 0;
