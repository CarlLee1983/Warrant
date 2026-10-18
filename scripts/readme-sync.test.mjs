import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const readmes = ['README.md', 'README.zh-TW.md', 'README.ja.md'];

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'warrant-readme-sync-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  for (const file of ['Makefile', ...readmes]) cpSync(join(root, file), join(dir, file));
  if (existsSync(join(root, 'scripts'))) cpSync(join(root, 'scripts'), join(dir, 'scripts'), { recursive: true });
  return {
    edit(file, change) {
      const path = join(dir, file);
      writeFileSync(path, change(readFileSync(path, 'utf8')));
    },
    run() {
      const result = spawnSync('make', ['readme-sync'], { cwd: dir, encoding: 'utf8' });
      assert.ifError(result.error);
      return { status: result.status, output: result.stdout + result.stderr };
    },
  };
}

function passes(copy) {
  const result = copy.run();
  assert.equal(result.status, 0, result.output);
}

function fails(copy, ...signals) {
  const result = copy.run();
  assert.notEqual(result.status, 0, result.output);
  for (const signal of signals) assert.ok(result.output.includes(signal), result.output);
}

test('moving the Japanese update paragraph between sections fails with unchanged document totals', (t) => {
  const copy = fixture(t);
  passes(copy);
  copy.edit('README.ja.md', (text) => {
    const paragraph = 'Skills CLI でインストールした既存のスキルを更新します：\n\n';
    assert.equal(text.split(paragraph).length, 2);
    const moved = replaceOnce(text.replace(paragraph, ''), '## ライセンス\n\n', `## ライセンス\n\n${paragraph}`);
    assert.equal(moved.length, text.length, 'the complete paragraph is moved, not deleted');
    assert.equal(moved.split(paragraph).length, 2);
    return moved;
  });
  fails(copy, 'README.ja.md', 'インストールと更新（Skills CLI）', 'paragraphs');
});

function replaceOnce(text, from, to) {
  assert.equal(text.split(from).length, 2, `fixture must contain exactly one ${from}`);
  return text.replace(from, to);
}

test('moving a Chinese documentation list item keeps the total but fails its section', (t) => {
  const copy = fixture(t);
  passes(copy);
  copy.edit('README.zh-TW.md', (text) => {
    const start = text.indexOf('## 文件\n');
    const end = text.indexOf('\n## ', start + 1);
    const item = text.slice(start, end).match(/^- .*\n/m)?.[0];
    assert.ok(item, 'documentation fixture has a complete list item');
    const moved = replaceOnce(text, item, '').replace('## 授權\n\n', `## 授權\n\n${item}\n`);
    assert.equal(moved.match(/^([0-9]+\.|-)[\t ]/gm).length, text.match(/^([0-9]+\.|-)[\t ]/gm).length);
    return moved;
  });
  fails(copy, 'README.zh-TW.md', '文件', 'list-items');
});

test('normal translations and ordinary prose changes preserve structure', (t) => {
  const copy = fixture(t);
  passes(copy);
  copy.edit('README.md', (text) => replaceOnce(text, 'Warrant bounds an AI agent', 'Warrant carefully bounds an AI agent'));
  passes(copy);
});

for (const [name, change, heading] of [
  ['missing heading', (text) => replaceOnce(text, '## ライセンス\n', ''), 'ライセンス'],
  ['duplicate heading', (text) => `${text}\n## ライセンス\n`, 'ライセンス'],
  ['unknown heading', (text) => replaceOnce(text, '## ライセンス\n', '## Unknown section\n'), 'Unknown section'],
  ['reordered complete sections', (text) => {
    const start = text.indexOf('## インストール（Claude Code）\n');
    const middle = text.indexOf('## インストール（Codex）\n');
    const end = text.indexOf('## インストールと更新（Skills CLI）\n');
    assert.ok(start > 0 && middle > start && end > middle);
    return text.slice(0, start) + text.slice(middle, end) + text.slice(start, middle) + text.slice(end);
  }, 'インストール（Codex）'],
]) {
  test(`${name} reports the filename and heading`, (t) => {
    const copy = fixture(t);
    copy.edit('README.ja.md', change);
    fails(copy, 'README.ja.md', heading, 'headings');
  });
}

test('heading text inside matching code fences is not a section', (t) => {
  const copy = fixture(t);
  for (const file of readmes) copy.edit(file, (text) => `${text}\n\`\`\`text\n## Unknown fenced heading\n\`\`\`\n`);
  passes(copy);
});

for (const [name, change, signal, section] of [
  ['deleted body paragraph', (text) => replaceOnce(text, 'Skills CLI でインストールした既存のスキルを更新します：\n\n', ''), 'paragraphs', 'インストールと更新（Skills CLI）'],
  ['deleted list item', (text) => text.replace(/^1\. .*\n/m, ''), 'list-items', '三つのルール'],
  ['changed code command', (text) => replaceOnce(text, '/plugin install warrant@warrant', '/plugin install another@plugin'), 'code', 'インストール（Claude Code）'],
  ['new link target', (text) => replaceOnce(text, '[MIT](LICENSE)', '[MIT](LICENSE) [extra](docs/new-target.md)'), 'links', 'ライセンス'],
  ['deleted preamble paragraph', (text) => text.replace(/^Warrant .*\n\n/m, ''), 'paragraphs', 'preamble'],
  ['new preamble link target', (text) => replaceOnce(text, '# Warrant', '# Warrant [extra](docs/new-target.md)'), 'links', 'preamble'],
]) {
  test(`${name} retains the existing protection`, (t) => {
    const copy = fixture(t);
    copy.edit('README.ja.md', (text) => {
      const changed = change(text);
      assert.notEqual(changed, text, 'mutation must change the fixture');
      return changed;
    });
    fails(copy, 'README.ja.md', section, signal);
  });
}

test('README cross-links and anchors remain excluded, including in the language switcher', (t) => {
  const copy = fixture(t);
  copy.edit('README.ja.md', (text) => text
    .replace('[MIT](LICENSE)', '[MIT](LICENSE#different) [readme](README.md#section) [locale](README.zh-TW.md) [anchor](#local)')
    .replace(/^.*\n.*\n.*\n/, '# Warrant\n\n[alternate](README.en.md#top)\n'));
  passes(copy);
});

test('list items and links inside fences retain the old grep behavior', (t) => {
  const copy = fixture(t);
  for (const file of readmes) copy.edit(file, (text) => `${text}\n\`\`\`text\n- example [reference](docs/example.md)\n\`\`\`\n`);
  passes(copy);
  copy.edit('README.ja.md', (text) => replaceOnce(text, '- example [reference](docs/example.md)', 'example [reference](docs/other.md)'));
  fails(copy, 'README.ja.md', 'ライセンス', 'list-items', 'links', 'code');
});


test('the language switcher remains excluded by its original global line number', (t) => {
  const copy = fixture(t);
  copy.edit('README.ja.md', (text) => text.replace(/^.*\n.*\n.*\n/, '# Warrant\n\nAn alternate language switcher\n'));
  passes(copy);
});
