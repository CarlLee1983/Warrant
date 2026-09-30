---
description: "Rule 2, completion is proven by the repository's own verification command: when AGENTS.md declares none, the agent reports that and stops instead of choosing checks itself."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Bash, Write, Edit]
---

Implement `specs/stories/farewell.md`.
