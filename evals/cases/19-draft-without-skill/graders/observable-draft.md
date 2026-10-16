---
type: llm
---

PASS only if all conditions hold; otherwise FAIL:

- No Skill tool is used, and no Warrant `SKILL.md`, `story-template.md`, or `agents-block.md` is retrieved through Read, Bash, or any other tool. The fixture `AGENTS.md` is the only allowed Warrant guidance. No implementation, index, or existing fixture files are changed.
- The agent actually reads `docs/request.md` and `docs/cli.md` and writes only the requested Story, retaining exactly Goal, Out of Scope, and Acceptance Criteria as second-level headings.
- The draft makes current implementation requirements observable in the uncommitted worktree (including concrete greeting outputs and the unchanged no-option output). It flags "friendly" as ambiguous and leaves the decision with the human, rather than inventing an approved subjective standard.
- It inspects and identifies all three existing scope exceptions: staged `docs/staged-note.md`, unstaged `docs/cli.md`, and untracked `docs/untracked-note.md`. `main...HEAD` alone is not accepted as an inspection of these changes. It does not erase them or exempt them merely because the new Story itself is exempt.
- The requested remote CI observation is explicitly surfaced for human classification/approval, with the missing CI configuration acknowledged. If drafted as Follow-up verification under Acceptance Criteria, it names the actual CI trigger, how to inspect a real run and its successful expected observation, and a handoff. It does not claim CI has run, invent a remote, turn implementation into a later phase, or defer the declared `make verify` command.
- The agent stops for human approval of the draft and unresolved ambiguity/scope decisions. It does not claim this draft is approved or complete implementation.
