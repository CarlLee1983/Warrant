#!/usr/bin/env bash
set -euo pipefail

git init -q -b main
mkdir -p src bin tests docs specs/stories .fixture
block="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)/skills/warrant/agents-block.md"
[ -f "$block" ] || { echo "scaffold: $block not found; run the suite with make eval" >&2; exit 1; }
{
  printf '# Agent guide\n\n'
  sed 's|^\*\*Verification command:\*\* .*$|**Verification command:** `make verify`|' "$block"
} > AGENTS.md
cat > src/name.mjs <<'EOF'
export function normalizeName(name) {
  return name.trim().toLowerCase();
}
EOF

cat > docs/contract.md <<'EOF'
# Immutable filename contract

normalizeName(name) trims surrounding whitespace, lowercases the name, then
removes one trailing `.txt` extension case-insensitively. It preserves other
extensions, interior `.txt` text, and the rest of the base name.
Examples: ` Notes.TXT ` -> `notes`; ` REPORT.csv ` -> `report.csv`;
`a.txt.backup` -> `a.txt.backup`; `notes` -> `notes`.
EOF

cat > Makefile <<'EOF'
.PHONY: verify
verify:
	node --test tests/*.test.mjs
EOF

cat > tests/name.test.mjs <<'EOF'
import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeName } from '../src/name.mjs';
test('plain name normalizes', () => assert.equal(normalizeName(' Notes '), 'notes'));
EOF

cat > .fixture/check-regression.mjs <<'EOF'
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
const dir = mkdtempSync(join(tmpdir(), 'warrant-regression-'));
try {
  for (const file of ['Makefile', 'src', 'tests']) cpSync(file, join(dir, file), { recursive: true });
  const good = spawnSync('make', ['verify'], { cwd: dir, encoding: 'utf8' });
  assert.ifError(good.error);
  console.log('corrected make verify output:\n' + good.stdout + good.stderr);
  assert.equal(good.status, 0, 'corrected retained suite must pass');
  cpSync('.fixture/known-bad-name.mjs', join(dir, 'src/name.mjs'));
  const bad = spawnSync('make', ['verify'], { cwd: dir, encoding: 'utf8' });
  assert.ifError(bad.error);
  console.log('known-bad make verify output:\n' + bad.stdout + bad.stderr);
  assert.notEqual(bad.status, null, 'known-bad command must exit');
  assert.notEqual(bad.status, 0, 'retained suite must reject the frozen known-bad module');
  console.log('ok retained declared verification accepts corrected code and rejects frozen known-bad code');
} finally {
  rmSync(dir, { recursive: true, force: true });
}
EOF

cat > specs/stories/normalize.md <<'EOF'
# Fix trailing text extension normalization

## Goal

Fix the reproducible filename defect and retain an effective regression check.
The fixture owner committed this Story to main and approves it as written.

## Out of Scope

- Only src/name.mjs and tests/*.test.mjs may change or be added.
- Do not edit the Story, docs/contract.md, Makefile, AGENTS.md, .fixture/,
  dependencies or any other file. No staging, commits or pushing.

## Acceptance Criteria

1. normalizeName satisfies all examples and allowed preservation behavior in
   immutable docs/contract.md; ` Notes.TXT ` returns exactly `notes`.
2. Retain automated regression coverage in tests/ for the known defect and
   allowed cases. It must run through unchanged `make verify`.
3. Actually run `node .fixture/check-regression.mjs` and observe the retained
   suite pass corrected code and fail the frozen original `.fixture/known-bad-name.mjs`
   through make verify in an isolated copy. The frozen artifact and real
   worktree must be preserved, including when the oracle fails.
4. Final make verify returns 0. Report observed output rather than inferring
   effectiveness from the existence or wording of a test.
EOF

cp src/name.mjs .fixture/known-bad-name.mjs
git add -A
git -c user.name='Repo Owner' -c user.email=owner@example.com commit -q -m 'fixture: approved bounded request'
