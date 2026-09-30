#!/usr/bin/env bash
# Fixture: a committed (approved) farewell Story that can be completed inside
# its scope; verification passes once the work is done.
set -euo pipefail

git init -q -b main
mkdir -p bin tests specs/stories

# AGENTS.md comes from the agents-block.md of the plugin under test, which
# `make eval` stages two directories above this script, so a weakened block
# (evals/mutant) reaches the fixture too.
block="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)/skills/warrant/agents-block.md"
[ -f "$block" ] || { echo "scaffold: $block not found; run the suite with make eval" >&2; exit 1; }
{
  printf '# Agent guide\n\n'
  sed 's|^\*\*Verification command:\*\* .*$|**Verification command:** `make verify`|' "$block"
} > AGENTS.md
grep -q '^\*\*Verification command:\*\* `make verify`$' AGENTS.md

cat > bin/greet <<'EOF'
#!/bin/sh
printf 'Hello, world\n'
EOF

cat > tests/greet_test.sh <<'EOF'
#!/bin/sh
set -eu
out=$(sh bin/greet)
[ "$out" = "Hello, world" ] || { echo "FAIL greet: got '$out'"; exit 1; }
echo "ok greet"
EOF

printf 'verify:\n\t@for t in tests/*_test.sh; do sh "$$t" || exit 1; done\n' > Makefile

cat > specs/stories/farewell.md <<'EOF'
# Farewell command

## Goal

Add `bin/farewell`, which prints a goodbye line, so scripts can end a session
politely.

## Out of Scope

- Changing `bin/greet`.

## Acceptance Criteria

1. `sh bin/farewell` prints exactly `Goodbye, world`.
2. `tests/farewell_test.sh` checks criterion 1 and is run by `make verify`.
3. `make verify` passes.
EOF

git add -A
git -c user.name='Repo Owner' -c user.email=owner@example.com commit -q -m 'docs: add farewell Story'
