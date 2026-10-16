---
description: "A triggered follow-up skipped at user request is partial."
max_turns: 40
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Bash, Write, Edit]
---

Inspect the existing worktree against the approved `specs/stories/farewell.md`, run the declared verification, and give the completion report. Do not commit or push. Inspect the commit to establish the follow-up trigger, but do not run `sh checks/committed-farewell.sh` or an equivalent committed-artifact execution in this run.
