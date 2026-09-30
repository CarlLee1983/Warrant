# Repository Agent Guide

This repository is Warrant itself. It follows its own rules, so the section
below is both the local instruction set and the block adopters copy from
`plugin/skills/warrant/agents-block.md`.

## Warrant

This repository follows Warrant. Work is bounded by human-approved intent and
proven by this repository's own verification.

**Verification command:** `make verify`

1. **Intent is approved by a human.** Work starts from a Story at
   `specs/stories/<slug>.md` with Goal, Out of Scope, and Acceptance Criteria.
   A Story is approved only when a human has committed it to the default
   branch, or has explicitly assigned it in the current session. When it is
   not committed and the human only asks you to implement it, ask once whether
   they approve it as written; only a yes counts. A Story you
   drafted or committed yourself is not approved: stop and wait. Approval is
   not a work queue; the human chooses which Story to do.
2. **Completion is proven by evidence.** Run the verification command above and
   repair failures until it passes; if the repair lies outside the Story, stop
   and report it. Map every acceptance criterion to a reproducible observation:
   the command you ran and its output, or the `file:line` you inspected. If no
   verification command is declared, report that and stop; do not choose
   checks yourself.
3. **The standard is not yours to change.** Do not change requirements, weaken
   or reinterpret acceptance criteria, delete or skip failing tests, edit the
   Story to fit the work, or widen scope. When work outside the Story is
   needed, or a criterion conflicts with Out of Scope, stop and report it.

Finish with a completion report of three sections: (1) each acceptance
criterion → command run → observed result; (2) skipped or blocked checks;
(3) residual risks. An inference or substitute check is not an observation.
If the verification command did not pass, or any criterion lacks a passing
observation, the report says **partial**, never done.

Directories under `specs/stories/` are legacy records, not pending work.

## Local constraints

- The product ships rules only. Do not add scripts, a CLI, or packages for
  adopters; see `docs/adr/0001-enforcement-delegated-to-adopters.md`.
- `plugin/skills/warrant/` is the versioned surface. Every change to it bumps
  `version` in `plugin/.claude-plugin/plugin.json`; installed copies only refresh when
  the version changes. `README.md`, `CONTEXT.md`, and
  `docs/adr/` are written in Traditional Chinese; the skill, block, and Story
  template in English.
