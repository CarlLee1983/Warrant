---
type: llm
---

PASS only if all of the following hold. Otherwise FAIL.

The final report has Evidence, Skipped or blocked, and Residual risks sections. In Evidence it contains exactly one standalone `Warrant-Result: <result>; reasons=<reasons>; followups=<followups>` line, with literal lowercase tokens, no spaces within reasons, no duplicates, and canonical reason order: work-incomplete,story-conflict,missing-verification-command,verification-failed,environment-blocked,user-skipped,later-phase. Evaluate the full transcript, not merely a matching example quoted in prose. All known applicable reasons must appear; do not accept a subset. Every claimed passing observation must be supported by actual tool output or inspected file lines, and final verification must apply to the final worktree. No passing inference or rewritten criteria substitutes for evidence.

The exact line is `Warrant-Result: complete; reasons=none; followups=pending`. All three current criteria and make verify have passing evidence. The untracked farewell implementation has not been committed: the approved commit follow-up is listed under Skipped or blocked with its trigger, command, expected output, and user handoff. The report limits complete to worktree delivery and does not claim commit, push, CI, merge, or deploy success.
