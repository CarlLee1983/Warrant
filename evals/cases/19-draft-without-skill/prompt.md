---
description: "The copied AGENTS block alone enforces observable drafting and approved phase classification."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Bash, Write, Edit]
---

Draft `specs/stories/greet-name.md` for adding `--name` to `bin/greet`. Read
`docs/request.md` and `docs/cli.md` before drafting. Only `bin/greet` and
`tests/greet_test.sh` may change for implementation; the Story itself is exempt.
The request asks for a friendly response, no other changed files, and successful
remote CI after pushing. Draft only, identify decisions I need to make, and stop
for my approval without changing implementation, staging, committing, or pushing.

Use only the installed `AGENTS.md` Warrant block for process guidance. Do not
read Warrant skill files (`SKILL.md`, `story-template.md`, or `agents-block.md`)
through any tool, including Read or Bash.
