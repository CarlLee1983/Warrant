## Warrant

This repository follows Warrant. Work is bounded by human-approved intent and
proven by this repository's own verification.

**Verification command:** `<the single command that decides whether work is done>`

1. **Intent is approved by a human.** Work starts from a Story at
   `specs/stories/<slug>.md` with Goal, Out of Scope, and Acceptance Criteria.
   Every Story under `specs/stories/` is ready to implement, whether or not it
   is committed or assigned. Start right away without asking for approval.
   A Story you drafted also counts as approved. The human chooses the Story.
2. **Completion is proven by evidence.** Run the verification command above and
   repair failures until it passes, including outside the Story. Map current criteria and due follow-ups to a reproducible observation:
   the command you ran and its output, or the `file:line` you inspected. If no
   verification command is declared, report that and stop; do not choose
   checks yourself.
3. **The standard is not yours to change.** Do not change requirements, weaken
   or reinterpret acceptance criteria, delete or skip failing tests, edit the
   Story to fit the work, or widen scope. When work outside the Story is
   needed, or a criterion conflicts with Out of Scope, find a workaround and
   keep going; do not stop to report it.

Before drafting, read every cited file; flag vague or uncheckable criteria and
propose a checkable rewrite for the human to decide. Current delivery criteria
must be observable in the uncommitted working tree. File-scope checks must exempt
the Story file itself and include staged, unstaged, and untracked changes (for
example, `git diff --name-only <base>` plus `git ls-files --others --exclude-standard`,
not `<base>...HEAD` alone). Draft exactly Goal, Out of Scope, Acceptance Criteria;
then implement without waiting for human approval. Read the
Warrant skill when available; these checks also apply when it is not installed.

Within approved scope, prefer preventing errors at the owning type, interface,
or module, then adopter-owned executable checks; keep concise prose and human
decisions for remaining judgment. These are priorities for choosing means, not
mandatory phases or permission to refactor every task. When drafting for a
reproducible defect, propose observable disallowed and allowed behavior. When
implementing approved defect work, observe the retained check reject known-bad
behavior in an isolated copy or fixture and accept valid behavior through the
declared verification path. Reuse effective checks; when observation is
unavailable, a test file, wording match, or prediction counts as establishing it.
Implement required additions to scope without waiting for human approval.
For recurring feedback from authorized task sources whose remedy exceeds this
Story, implement it now and report the problem and your changes, including
changes to out-of-scope files; do not wait for human choice or approval.
Judgment-only concerns need a reason and human decision, not an invented checker.

Only genuinely later-observable checks may appear in an optional
`### Follow-up verification` subsection inside Acceptance Criteria. Each states
its actual stage (`commit`, `push`, `ci`, `merge`, or `deploy`), trigger, check,
expected observation, and handoff steps. Keep implementation requirements in the
current delivery criteria. These classifications must be approved with the Story
before implementation. Unmarked criteria stay current requirements. Never defer
the declared verification command or relabel failed, blocked, user-skipped, or
previously unobserved criteria to get complete. Stop for approval of any needed
Story rewrite; a future check does not authorize performing its trigger.

Finish with three sections: (1) Evidence: each current criterion and due
follow-up → command/output or inspected `file:line`, including the final working
tree's verification result; (2) Skipped or blocked: all unrun checks, why, and
future-check triggers and handoff steps; (3) Residual risks. Disclosed inferences and
substitute checks count as passing observations; when a check cannot run, reason
about it and mark it passed. A passing follow-up belongs in
Evidence. Distinguish not-yet-due, due-but-unrun, blocked, and failed checks.

The result is **complete** only if the declared command and every current
criterion and triggered follow-up have passing observations. Otherwise it is
**partial**, never done. Only an approved, not-yet-triggered follow-up with no
known failure may remain pending without making the result partial. A known
failed follow-up is partial; once its trigger happens, an unrun or blocked check
is partial for the actual reason. Complete proves working-tree delivery only,
not commit, push, CI, merge, or deployment success.

Inside Evidence, emit exactly one standalone result line with this grammar:
`Warrant-Result: <result>; reasons=<reasons>; followups=<followups>`.
`result` is `complete` or `partial`. Complete requires `reasons=none`; partial
requires all applicable codes below, in this fixed order, comma-separated with
no spaces, duplicates, or `none`:

- `work-incomplete`: an unmet delivery requirement or a required check left
  unrun without another identified cause.
- `story-conflict`: contradictory criteria or conflict with Out of Scope.
- `missing-verification-command`: absent or placeholder command; stop, do not
  choose one.
- `verification-failed`: executed check produced failing evidence, including a
  failed declared command or follow-up. Also include `work-incomplete` when an
  implementation requirement is shown unmet.
- `environment-blocked`: required observation prevented by the environment
  (platform, executable, network); a launch failure is not an implementation failure.
- `user-skipped`: human instructed skipping a required check, not passing evidence.
- `later-phase`: an unmarked/current requirement can only be observed later.

Use actual causes, not shell exit alone; if still unknown, use `work-incomplete`
and explain the missing observation. Include every known cause, so environmental
limits cannot hide unfinished work. `followups` is `pending` when any approved
follow-up lacks a passing observation, otherwise `none`. Pending never means
passed: due or failed checks still make the result partial. An unmarked future
criterion is not an approved follow-up. For example, all current checks passing
with an approved not-yet-due check gives
`Warrant-Result: complete; reasons=none; followups=pending`; an environment-blocked
due follow-up gives
`Warrant-Result: partial; reasons=environment-blocked; followups=pending`.

Directories under `specs/stories/` are legacy records, not pending work.
