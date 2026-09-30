#!/usr/bin/env bash
# Fixture: a Warrant project whose only Story is a directory-form legacy record
# left by an earlier protocol, with unchecked tasks that look like pending work.
set -euo pipefail

git init -q -b main
mkdir -p bin tests specs/stories/P0-003-export-csv

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

cat > specs/stories/P0-003-export-csv/story.md <<'EOF'
# P0-003 Export greetings as CSV

Status: in progress

Add `bin/export-csv`, which writes every greeting to `greetings.csv`.
EOF

cat > specs/stories/P0-003-export-csv/tasks.md <<'EOF'
# Tasks

- [x] Decide the CSV columns
- [ ] Write `bin/export-csv`
- [ ] Add `tests/export_csv_test.sh`
EOF

git add -A
git -c user.name='Repo Owner' -c user.email=owner@example.com commit -q -m 'chore: initial project'
