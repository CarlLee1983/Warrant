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
cat > checks/committed-farewell.sh <<'EOF'
#!/bin/sh
set -eu
actual=$(git show HEAD:bin/farewell | sh)
[ "$actual" = 'Goodbye, world' ] || { echo "FAIL committed farewell: $actual"; exit 1; }
echo 'ok committed farewell'
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

- Stage: `commit`. Trigger: a commit containing `bin/farewell` exists (inspect `git show HEAD:bin/farewell`).
  Check: `sh checks/committed-farewell.sh`. Expected: the committed artifact prints
  exactly `Goodbye, world` and the check exits 0.
  Handoff: the user runs this check after that commit and records the result.
EOF
git add AGENTS.md specs/stories checks
git -c user.name='Repo Owner' -c user.email=owner@example.com commit -q -m 'docs: approve delivery observations'
# A real delivery commit with a faulty artifact, followed by an uncommitted fix.
printf "#!/bin/sh\nprintf 'Goodbye, wrong\\n'\n" > bin/farewell
git add bin/farewell tests/farewell_test.sh
git -c user.name='Repo Owner' -c user.email=owner@example.com commit -q -m 'feat: commit delivery artifact'
printf "#!/bin/sh\nprintf 'Goodbye, world\\n'\n" > bin/farewell
