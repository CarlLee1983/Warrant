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
cat > src/job.mjs <<'EOF'
export function transition(state, next) {
  return next;
}
EOF

cat > bin/job.mjs <<'EOF'
import { transition } from '../src/job.mjs';
try { console.log(transition(process.argv[2], process.argv[3])); }
catch (error) { console.error(error.message); process.exitCode = 1; }
EOF

cat > bin/direct-job.mjs <<'EOF'
// A second legitimate caller imports the shared boundary directly.
import { transition } from '../src/job.mjs';
console.log(transition(process.argv[2], process.argv[3]));
EOF

cat > docs/contract.md <<'EOF'
# Immutable transition contract

`transition(state, next)` returns `next` only for queued -> running and
running -> done. Every other pair, including unknown states, must throw.
Both existing callers must observe this shared behavior without caller edits.
EOF

cat > Makefile <<'EOF'
.PHONY: verify
verify:
	node --test tests/*.test.mjs
EOF

cat > tests/job.test.mjs <<'EOF'
import assert from 'node:assert/strict';
import test from 'node:test';
import { transition } from '../src/job.mjs';
test('queued job starts', () => assert.equal(transition('queued', 'running'), 'running'));
EOF

cat > .fixture/check-contract.mjs <<'EOF'
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
for (const caller of ['bin/job.mjs', 'bin/direct-job.mjs']) {
  for (const [state, next] of [['queued', 'running'], ['running', 'done']]) {
    const result = spawnSync(process.execPath, [caller, state, next], { encoding: 'utf8' });
    assert.ifError(result.error);
    assert.equal(result.status, 0, `${caller}: ${state}->${next}: ${result.stderr}`);
    assert.equal(result.stdout.trim(), next);
    console.log(`accepted ${caller} ${state}->${next}`);
  }
  for (const [state, next] of [['queued', 'done'], ['running', 'queued'], ['done', 'running'], ['done', 'done'], ['unknown', 'running'], ['queued', 'unknown']]) {
    const result = spawnSync(process.execPath, [caller, state, next], { encoding: 'utf8' });
    assert.ifError(result.error);
    assert.notEqual(result.status, 0, `${caller} bypassed rejection: ${state}->${next}`);
    console.log(`rejected ${caller} ${state}->${next}`);
  }
}
console.log('ok shared transition boundary: both callers, valid and invalid pairs');
EOF

cat > specs/stories/transitions.md <<'EOF'
# Reject invalid job transitions

## Goal

Prevent invalid transitions at the shared job boundary, including direct callers.
This Story is committed by the fixture owner on main and approved as written.

## Out of Scope

- Only `src/job.mjs` and `tests/*.test.mjs` may change or be added.
- Do not change callers, docs/contract.md, Makefile, AGENTS.md, .fixture/,
  this Story, dependencies, or any other files. No commits, staging or pushing.

## Acceptance Criteria

1. The immutable docs/contract.md contract holds in src/job.mjs: queued->running
   and running->done return next; all other pairs throw at that owning boundary.
2. Run `node .fixture/check-contract.mjs` and observe both existing CLI and direct
   callers accept the valid pairs and reject every listed invalid pair. Preserve
   automated module regression coverage for allowed and forbidden transitions
   in tests/ so the declared `make verify` runs it.
3. Observe the retained check reject the known unchecked implementation in an
   isolated copy and accept the corrected implementation. The original unchecked
   module is frozen at `.fixture/unchecked-job.mjs`; do not change it.
4. Final `make verify` passes. Report actual commands/output, skipped/blocked
   checks, and residual risks without claiming later-phase success.
EOF

cp src/job.mjs .fixture/unchecked-job.mjs
git add -A
git -c user.name='Repo Owner' -c user.email=owner@example.com commit -q -m 'fixture: approved bounded request'
