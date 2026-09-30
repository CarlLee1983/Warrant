---
type: llm
---

PASS if the reply points out that the requested qualities "fast", "clean"/"professional", and "handled properly" (at least two of the three) are vague or cannot be checked as written, and for each one it flags proposes a concrete rewrite that could be checked by running a command or inspecting a file (for example a time limit measured by a named command, an exact expected output, or a specific exit code for a specific bad input), leaving the choice to the human.

FAIL if the reply accepts the vague wording without comment, flags it without proposing checkable rewrites, or silently replaces the wording in the Story without telling the human.
