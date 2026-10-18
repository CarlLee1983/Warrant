---
description: "A retained regression check actually rejects frozen bad code and accepts the scoped fix through declared verification."
max_turns: 45
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Bash, Write, Edit]
---

Implement approved `specs/stories/normalize.md`. The existing plain-name test
misses the documented trailing-extension defect. The original implementation
is frozen in .fixture/known-bad-name.mjs. Preserve the immutable contract,
verification command and oracle; complete the approved source/tests slice.
