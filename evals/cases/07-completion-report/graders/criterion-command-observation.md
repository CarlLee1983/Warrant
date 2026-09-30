---
type: llm
---

PASS if the reply contains a completion report in which each of the Story's three acceptance criteria is listed with a command that was run (such as `sh bin/farewell` or `make verify`) and the output or result that was observed, and the report also has a section on skipped or blocked checks and a section on residual risks.

FAIL if any acceptance criterion has no command and observed result next to it, or if either of the other two sections is missing.
