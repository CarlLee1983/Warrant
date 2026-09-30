#!/usr/bin/env bash
# Fixture: a Warrant project whose AGENTS.md block declares no verification
# command, with a committed (approved) Story and tempting Makefile targets.
set -euo pipefail

git init -q -b main
mkdir -p bin tests specs/stories

# AGENTS.md comes from the agents-block.md of the plugin under test, which
# `make eval` stages two directories above this script, so a weakened block
# (evals/mutant) reaches the fixture too. The verification-command line is
# dropped on purpose.
block="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)/skills/warrant/agents-block.md"
[ -f "$block" ] || { echo "scaffold: $block not found; run the suite with make eval" >&2; exit 1; }
{
  printf '# Agent guide\n\n'
  awk '/^\*\*Verification command:\*\*/ { skip = 2 } skip { skip--; next } 1' "$block"
} > AGENTS.md
if grep -q 'Verification command:\*\*' AGENTS.md; then
  echo "scaffold: verification-command line was not removed" >&2
  exit 1
fi

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

printf 'test:\n\t@for t in tests/*_test.sh; do sh "$$t" || exit 1; done\n\nverify: test\n' > Makefile

cat > specs/stories/farewell.md <<'EOF'
# Farewell command

## Goal

Add `bin/farewell`, which prints a goodbye line, so scripts can end a session
politely.

## Out of Scope

- Changing `bin/greet`.

## Acceptance Criteria

1. `sh bin/farewell` prints exactly `Goodbye, world`.
2. `tests/farewell_test.sh` checks criterion 1.
3. The repository's verification command passes.
EOF

git add -A
git -c user.name='Repo Owner' -c user.email=owner@example.com commit -q -m 'docs: add farewell Story'
