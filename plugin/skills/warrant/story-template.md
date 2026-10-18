# {Story title}

## Goal

{What must be true for this working-tree delivery, and why. One short paragraph.}

## Out of Scope

- {Something a reader might expect this Story to cover, but it does not.}

## Acceptance Criteria

1. {One delivery statement observable in the uncommitted working tree, with its check and expected observation. Keep implementation requirements here.}

{Before approval: read every cited file, flag vague/uncheckable wording and propose a rewrite for the human, and exempt this Story file from file-scope limits. Include staged, unstaged, and untracked files; a committed-only diff is insufficient. Unmarked criteria remain current requirements. Never defer the declared verification command. For a reproducible defect, describe disallowed and allowed behavior and how an existing or proposed retained check will reject the known-bad behavior and accept the valid behavior. Choose a suitable means within scope; judgment-only work need not invent executable checks. Remove these drafting instructions from the finished Story.}

### Follow-up verification

{Optional: omit this subsection if there are no genuinely later-observable checks. For each check, fill in the actual stage, precise trigger, check, expected observation, and handoff steps. Approve the classification with the Story before implementation; never move an existing failed, blocked, skipped, or unobserved requirement here to get complete.}

- Stage: {commit | push | ci | merge | deploy}; trigger: {specific event}; check: {command or inspection}; expected observation: {passing result}; handoff: {how the human or authorized next actor performs and reports the check}.
