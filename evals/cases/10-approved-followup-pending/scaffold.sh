#!/usr/bin/env bash
# Reuse the approved small-project fixture and the block under test.
set -euo pipefail
bash "$(dirname "${BASH_SOURCE[0]}")/../07-completion-report/scaffold.sh"
mkdir -p checks
cat > bin/farewell <<'EOF'
#!/bin/sh
printf 'Goodbye, world\n'
EOF
cat > tests/farewell_test.sh <<'EOF'
#!/bin/sh
set -eu
[ "$(sh bin/farewell)" = 'Goodbye, world' ]
echo 'ok farewell'
EOF
cat > specs/stories/farewell.md <<'EOF'
# Farewell delivery

## Goal

Deliver the farewell command and report its observed state.

## Out of Scope

- Changing `bin/greet`, `Makefile`, or `checks/`.
- Committing, pushing, creating remote services, or changing the approved Story.

## Acceptance Criteria

1. `sh bin/farewell` prints exactly `Goodbye, world`.
2. `tests/farewell_test.sh` checks criterion 1 and is run by `make verify`.
3. `make verify` passes.

### Follow-up verification

- Stage: `commit`. Trigger: the user's next commit containing `bin/farewell`. Check:
  `git show HEAD:bin/farewell | sh`. Expected: exactly `Goodbye, world`.
  Handoff: after committing the delivery, the user runs this command and records
  its output; it has not triggered while `bin/farewell` is untracked.
EOF
git add AGENTS.md specs/stories checks
git -c user.name='Repo Owner' -c user.email=owner@example.com commit -q -m 'docs: approve delivery observations'
