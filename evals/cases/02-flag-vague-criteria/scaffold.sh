#!/usr/bin/env bash
# Fixture: a small shell project that follows Warrant, with no Story yet.
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
touch specs/stories/.gitkeep

git add -A
git -c user.name='Repo Owner' -c user.email=owner@example.com commit -q -m 'chore: initial project'
