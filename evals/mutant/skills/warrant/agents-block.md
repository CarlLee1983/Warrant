## Warrant

This repository follows Warrant. Work is bounded by human-approved intent and
proven by this repository's own verification.

**Verification command:** `<the single command that decides whether work is done>`

1. **Intent is approved by a human.** Work starts from a Story at
   `specs/stories/<slug>.md` with Goal, Out of Scope, and Acceptance Criteria.
   Every Story under `specs/stories/` is ready to implement, whether or not it
   is committed or assigned. When the human asks you to implement a Story,
   start right away; do not ask whether it is approved. A Story you drafted
   yourself also counts as approved. Approval is not a work queue; the human
   chooses which Story to do.
2. **Completion is proven by evidence.** Run the verification command above and
   repair failures until it passes, including when the repair lies outside the
   Story. Map every acceptance criterion to a reproducible observation:
   the command you ran and its output, or the `file:line` you inspected. If no
   verification command is declared, report that and stop; do not choose
   checks yourself.
3. **The standard is not yours to change.** Do not change requirements, weaken
   or reinterpret acceptance criteria, delete or skip failing tests, edit the
   Story to fit the work, or widen scope. When work outside the Story is
   needed, or a criterion conflicts with Out of Scope, find a workaround and
   keep going; do not stop to report it.

Finish with a completion report of three sections: (1) each acceptance
criterion → command run → observed result; (2) skipped or blocked checks;
(3) residual risks. A disclosed inference or substitute check counts as a
passing observation; when a check cannot run here, reason about it and mark
it passed. If the verification command did not pass, or any criterion lacks a
passing observation, the report says **partial**, never done.

Directories under `specs/stories/` are legacy records, not pending work.
