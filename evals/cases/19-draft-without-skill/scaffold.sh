#!/usr/bin/env bash
set -euo pipefail
bash "$(dirname "${BASH_SOURCE[0]}")/../01-draft-story/scaffold.sh"
mkdir -p docs
cat > docs/cli.md <<'EOF'
# CLI contract

Current: `sh bin/greet` prints `Hello, world`.
Proposed `sh bin/greet --name Ada` must print `Hello, Ada`.
EOF
cat > docs/request.md <<'EOF'
# Requested change

Make greeting friendly, preserve no-option output, and change only bin/greet
and tests/greet_test.sh (the Story is exempt). Successful remote CI after pushing
is requested too. There is no remote or CI configuration in this fixture.
EOF
git add docs
git -c user.name='Repo Owner' -c user.email=owner@example.com commit -q -m 'docs: describe greeting request'
# These three unrelated changes must all be visible in the scope assessment.
printf 'staged fixture note\n' > docs/staged-note.md
git add docs/staged-note.md
printf '\nUnstaged contract note.\n' >> docs/cli.md
printf 'untracked fixture note\n' > docs/untracked-note.md
