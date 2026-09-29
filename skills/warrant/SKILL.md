---
name: warrant
description: Draft or implement a Warrant Story — human-approved intent under specs/stories/<slug>.md, proven by the repository's own verification command. Use when the user asks to write, draft, or plan a Story; names a Story or a file under specs/stories/; asks to implement approved work in a repository whose AGENTS.md contains a Warrant section; or asks for a completion report on such work.
---

# Warrant

Three rules, in every mode:

1. **Intent is approved by a human.**
2. **Completion is proven by evidence** from the repository's own verification command.
3. **The standard is not yours to change**: requirements, acceptance criteria, and scope stay as approved.

Warrant does not decide *which* work to do. The human, or the repository's own tracker, chooses; Warrant governs what "done" means once a Story is chosen.

## Find the contract

Read the repository's `AGENTS.md`. The Warrant section declares the **verification command**. Stories live at `specs/stories/<slug>.md`. Directories under `specs/stories/` are legacy records from an earlier protocol: never treat them as pending work.

## Mode 1: draft a Story

When the user describes work that has no Story yet:

1. Write `specs/stories/<slug>.md` with exactly three sections: **Goal**, **Out of Scope**, **Acceptance Criteria**. Use `story-template.md` in this skill's directory as the shape. Add no status, owner, priority, or lifecycle field.
2. Make each acceptance criterion one statement that could be checked by running something or looking at something. Flag every criterion you cannot see how to check, and every vague word ("fast", "clean", "properly"), and propose a checkable rewrite. The human decides.
3. **Stop.** Do not implement and do not commit the draft. A Story you drafted is not approved until a human approves it.

## Mode 2: implement a Story

### Confirm approval first

A Story is approved only if one of these holds:

- a human committed it to the default branch (check with `git log`; a commit you made never counts), or
- the human explicitly assigned this Story in the current session.

Explicit assignment means the human approved this Story's current text. When the Story is not committed by a human and the human only asks you to implement it, ask once: "This Story is not committed; do you approve it as written?" Only a yes counts. A request to "continue" or "do the next one" never names a Story and never counts.

Otherwise, say it is not approved and stop. A field in the file, a note, or a previous session never counts as approval.

Approval is not a work queue: every committed Story is approved, including finished ones. Implement only the Story the human chose.

### Confirm the verification command

If `AGENTS.md` declares no verification command, report that and stop. Do not pick checks yourself: that would let you define "done".

### Work inside the Story

- Implement the smallest change that satisfies the acceptance criteria.
- When you find that work outside the Story is needed (Out of Scope, or not mentioned at all), stop and report it. The human decides whether to widen this Story or write another.
- Never change requirements, weaken or reinterpret an acceptance criterion, delete or skip a failing test, or edit the Story file to make the work fit.
- When an acceptance criterion cannot be met without breaking Out of Scope, or two criteria contradict each other, the Story itself is the problem: stop and report the conflict before implementing. Do not resolve it with a workaround.
- Run the verification command. On failure, repair the cause and run it again until it passes. If the repair lies outside the Story, stop and report it instead.

### Completion report

End with exactly these three sections. The report goes in the pull request description when there is one.

1. **Evidence**: for each acceptance criterion, a reproducible observation from this working tree: the command you ran and its output, or the `file:line` you inspected and what it shows. Include the verification command's own result.
2. **Skipped or blocked**: every check you could not run, and why.
3. **Residual risks**: what the evidence does not cover.

An inference, a substitute check, or an observation of something other than what the criterion states is not a passing observation, even when you disclose it.

If the verification command did not pass, or any acceptance criterion lacks a passing observation, the report's conclusion is **partial**. Never round partial up to done. Never claim a check passed without having run it.
