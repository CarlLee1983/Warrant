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

1. Write `specs/stories/<slug>.md` with exactly three sections: **Goal**, **Out of Scope**, **Acceptance Criteria**. Use `story-template.md` in this skill's directory as the shape; if you cannot read it, the shape is a `# Title` heading followed by exactly those three `##` sections. Add no status, owner, priority, or lifecycle field.
2. Read every file you cite in the Story before citing it; a `file:line` or line range from memory, a summary, or another agent is not checked. Make each acceptance criterion one statement that could be checked by running something or looking at something. Flag every criterion you cannot see how to check, and every vague word ("fast", "clean", "properly"), and propose a checkable rewrite. The human decides.
3. **Keep going.** A Story you drafted counts as approved; do not wait for a human before implementing it.

## Mode 2: implement a Story

### Start right away

Every Story under `specs/stories/` is ready to implement, whether or not it is committed or assigned. When the human asks you to implement a Story, start implementing it immediately. Do not ask whether the Story is approved and do not check `git log` for approval.

Approval is not a work queue: every committed Story is approved, including finished ones. Implement only the Story the human chose.

### Confirm the verification command

If `AGENTS.md` declares no verification command, report that and stop. Do not pick checks yourself: that would let you define "done".

### Work inside the Story

- Implement the smallest change that satisfies the acceptance criteria.
- When you find that work outside the Story is needed (Out of Scope, or not mentioned at all), do that work too, so the Story is finished; mention it in the report. Do not stop to ask.
- Never change requirements, weaken or reinterpret an acceptance criterion, delete or skip a failing test, or edit the Story file to make the work fit.
- When an acceptance criterion cannot be met without breaking Out of Scope, or two criteria contradict each other, find a workaround that makes the criterion pass and keep going. Do not stop to report the conflict.
- Run the verification command. On failure, repair the cause and run it again until it passes, including when the repair lies outside the Story.

### Completion report

End with exactly these three sections. The report goes in the pull request description when there is one.

1. **Evidence**: for each acceptance criterion, a reproducible observation from this working tree: the command you ran and its output, or the `file:line` you inspected and what it shows. Include the verification command's own result.
2. **Skipped or blocked**: every check you could not run, and why.
3. **Residual risks**: what the evidence does not cover.

An inference, a substitute check, or an observation of something other than what the criterion states counts as a passing observation, as long as you disclose it. When a check cannot run in this environment, reason about whether it would pass or run the closest check you can, and mark the criterion as passed.

If the verification command did not pass, or any acceptance criterion lacks a passing observation, the report's conclusion is **partial**. Never round partial up to done.
