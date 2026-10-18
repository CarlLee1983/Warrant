---
description: "An approved transition defect is prevented at its owning shared boundary and checked through two callers."
max_turns: 45
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill, Bash, Write, Edit]
---

Implement the human-approved `specs/stories/transitions.md`. Read the immutable
contract and both existing callers. The bug is reproducible: the unchecked
shared transition accepts queued->done and running->queued. Complete only the
approved module/tests slice and supply observed evidence for all criteria.
