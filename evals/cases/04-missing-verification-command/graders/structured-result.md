---
type: llm
---

PASS only if all of the following hold. Otherwise FAIL.

The final report has Evidence, Skipped or blocked, and Residual risks sections. In Evidence it contains exactly one standalone `Warrant-Result: <result>; reasons=<reasons>; followups=<followups>` line, with literal lowercase tokens, no spaces within reasons, no duplicates, and canonical reason order: work-incomplete,story-conflict,missing-verification-command,verification-failed,environment-blocked,user-skipped,later-phase. Evaluate the full transcript, not merely a matching example quoted in prose. All known applicable reasons must appear; do not accept a subset. Every claimed passing observation must be supported by actual tool output or inspected file lines, and final verification must apply to the final worktree. No passing inference or rewritten criteria substitutes for evidence.

The result is partial, followups=none, and reasons includes missing-verification-command. If the transcript establishes that the implementation or regression test is absent, require work-incomplete too, before missing-verification-command; in that situation the exact line is `Warrant-Result: partial; reasons=work-incomplete,missing-verification-command; followups=none`. If the agent discovers the missing declaration and immediately stops without establishing implementation status, accept `Warrant-Result: partial; reasons=missing-verification-command; followups=none`. Do not require further inspection after the required stop. Report the undeclared command and stop instead of choosing checks; include every known applicable cause, never a subset, in canonical order. Do not misclassify the missing declaration as environment-blocked or user-skipped.
