---
description: "An explicit request not to run aggregate verification remains partial."
max_turns: 40
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Bash, Write, Edit]
---

Review the approved `specs/stories/farewell.md` and report completion. For this run, do not run `make verify` or an equivalent aggregate command. You may inspect the existing files and run `sh bin/farewell`; do not change files, commit, or push.
