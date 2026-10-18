---
name: warrant
description: Draft or implement a Warrant Story — human-approved intent under specs/stories/, proven by the repository's own verification command. Use when the user asks to write, draft, or plan a Story; names a Story or a file under specs/stories/; asks to implement approved work in a repository whose AGENTS.md contains a Warrant section; or asks for a completion report on such work.
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
2. Read every file you cite before citing it; memory, summaries, and another agent's references are not checked. Make each delivery criterion observable in the uncommitted working tree. Flag vague words ("fast", "clean", "properly") and any criterion you cannot check there; propose a checkable rewrite for the human to decide. A file-scope criterion must exempt the Story file itself (`specs/stories/<slug>.md`) and account for staged, unstaged, and untracked changes. For example, inspect `git diff --name-only <base>` together with `git ls-files --others --exclude-standard`; `git diff <base>...HEAD` alone cannot observe uncommitted work.
   For a reproducible defect, propose observable disallowed and allowed behavior, and a retained check that rejects the known-bad behavior and accepts the valid behavior. Use the implementation priorities below to choose a suitable approach; existing effective checks can supply the evidence. New acceptance requirements need human approval with the Story.
3. Keep implementation requirements in the current delivery criteria. Only genuinely later-observable checks may go in an optional `### Follow-up verification` subsection inside Acceptance Criteria. For each, specify the actual stage (`commit`, `push`, `ci`, `merge`, or `deploy`), trigger, check, expected observation, and handoff steps. CI after a push is not a post-merge check. These classifications require human approval with the Story, before implementation. Unmarked criteria remain current delivery requirements. Never defer the declared verification command, or relabel failed, blocked, user-skipped, or previously unobserved criteria after the fact to obtain a complete result. If an existing Story needs a rewrite, stop for human approval of the changed text.
4. **Stop.** Do not implement and do not commit the draft. A Story you drafted is not approved until a human approves it.

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

- Implement the smallest change that satisfies the acceptance criteria. Within approved scope, prefer preventing the error at the owning type, interface, or module; next use adopter-owned executable checks; retain concise prose and human decisions for remaining judgment. This is a priority for choosing means, not three mandatory phases or a requirement to refactor every task.
- For reproducible defects covered by the approved work, observe the retained check reject known-bad behavior in an isolated copy or fixture and accept valid behavior through the declared verification path. Reuse effective checks. Record the executions and results; a test file, wording match, or prediction alone is not that observation. Report unavailable evidence honestly. Propose any required additions to approved scope or acceptance standards for human approval before proceeding.
- Use recurring feedback from authorized task sources to identify concrete prevention opportunities. If the remedy exceeds this Story, report the problem, its evidence, and a checkable future-work proposal for the human to choose and approve; leave the existing Story and out-of-scope files unchanged. A judgment-only concern needs a concise reason and the necessary human decision, not an invented checker.
- When you find that work outside the Story is needed (Out of Scope, or not mentioned at all), stop and report it. The human decides whether to widen this Story or write another.
- Never change requirements, weaken or reinterpret an acceptance criterion, delete or skip a failing test, or edit the Story file to make the work fit.
- When an acceptance criterion cannot be met without breaking Out of Scope, or two criteria contradict each other, the Story itself is the problem: stop and report the conflict before implementing. Do not resolve it with a workaround.
- Run the verification command. On failure, repair the cause and run it again until it passes. If the repair lies outside the Story, stop and report it instead.

### Completion report

End with exactly these three sections. The report goes in the pull request description when there is one.

1. **Evidence**: for each current delivery criterion and each due follow-up check, the command run and its output, or the `file:line` inspected and what it shows. Include the declared verification command's result on the final working tree, and the single result line defined below inside this section.
2. **Skipped or blocked**: every unrun check and why, including approved future checks with their actual trigger, check, expected observation, and handoff steps. Distinguish not-yet-due checks from due-but-unrun, blocked, and failed checks. A follow-up's passing observation belongs in Evidence.
3. **Residual risks**: what the evidence does not cover, including outstanding later stages.

An inference, a substitute check, or an observation of something other than what the criterion states is not a passing observation, even when disclosed. Never claim a check passed without running it.

The result is **complete** only when the declared verification command passed on the final working tree, every current delivery criterion has a passing observation, and every triggered follow-up has a passing observation. A known failed follow-up makes the result **partial**, even if its trigger was expected later. An approved follow-up whose trigger has not happened and which has no known failure may remain pending without making the result partial. Once its trigger happens, an unrun or blocked check makes the result partial for the actual reason. Missing evidence for an unmarked criterion always makes the result partial, even if observing it requires a later stage. Never round partial up to complete.

Here **complete** means the working-tree delivery is proven; it does not assert that commit, push, CI, merge, or deployment succeeded. Report those only from their own observations. The report grants no permission to perform a follow-up action.

### Result line

Emit exactly one standalone line in Evidence, with this spelling, field order, punctuation, and spacing:

```text
Warrant-Result: <result>; reasons=<reasons>; followups=<followups>
```

- `result` is `complete` or `partial`.
- For `complete`, `reasons` is exactly `none`. For `partial`, it is one or more applicable codes from the ordered list below, comma-separated without spaces, duplicates, or `none`. Include all known causes, in that order; an environmental blocker must not hide unfinished work.
- `followups` is `pending` if any approved follow-up still lacks a passing observation, otherwise `none`. Pending is not passing evidence: a due or failed pending check still requires partial. An unmarked later-stage criterion is not an approved follow-up.

Reason codes, in canonical order:

1. `work-incomplete`: a delivery requirement is unmet, or a required check was left unrun without another identified cause.
2. `story-conflict`: contradictory criteria, or a conflict with Out of Scope, prevent compliance; stop for the human's decision.
3. `missing-verification-command`: AGENTS.md has no declared command, or it is still a placeholder; stop rather than choosing one.
4. `verification-failed`: an executed check produces failing evidence, including a declared verification failure or an observed failed follow-up. Also include `work-incomplete` when evidence shows an implementation requirement is unmet.
5. `environment-blocked`: the environment prevents a required observation, for example an unavailable platform, executable, or network. A command-launch failure is not proof that the implementation fails.
6. `user-skipped`: the human instructed the agent not to run a required check; the instruction does not count as a passing observation.
7. `later-phase`: a current (unmarked) requirement needs a later stage to be observed; do not silently move it to Follow-up verification.

Apply codes to the actual causes, not merely to a nonzero shell exit: for example, a missing executable is `environment-blocked`, while a test that ran and failed is `verification-failed`. If the cause is not yet established, report the missing required observation as `work-incomplete` and explain the uncertainty. These codes classify this report; they do not establish that Warrant improved quality.

Examples (each describes a different report):

- Final command and all current criteria pass, no follow-ups: `Warrant-Result: complete; reasons=none; followups=none`.
- Same evidence, with an approved deployment check whose trigger has not happened: `Warrant-Result: complete; reasons=none; followups=pending`.
- Required Windows check cannot run here: `Warrant-Result: partial; reasons=environment-blocked; followups=none`.
- Human asks to skip the required command: `Warrant-Result: partial; reasons=user-skipped; followups=none`.
- Implementation remains unfinished and a different check is sandbox-blocked: `Warrant-Result: partial; reasons=work-incomplete,environment-blocked; followups=none`.
- Criteria contradict Out of Scope: `Warrant-Result: partial; reasons=story-conflict; followups=none`.
- An unmarked CI criterion cannot be observed before push: `Warrant-Result: partial; reasons=later-phase; followups=none`.
- Command is absent or a placeholder: `Warrant-Result: partial; reasons=missing-verification-command; followups=none`.
- Approved follow-up ran and failed: `Warrant-Result: partial; reasons=verification-failed; followups=pending`.
- Approved follow-up trigger happened, but the check was simply left unrun: `Warrant-Result: partial; reasons=work-incomplete; followups=pending`.
