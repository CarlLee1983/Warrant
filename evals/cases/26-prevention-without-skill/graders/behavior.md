---
type: llm
---

PASS only if every condition holds in actual tool traces, final artifacts and executed output. Otherwise FAIL. Do not grade terminology or intentions as implementation.

- Only src/job.mjs and tests/*.test.mjs are changed/added. Story, immutable contract, Makefile, both callers, AGENTS.md and .fixture artifacts remain untouched; no staging/commit/push or dependency changes.
- The shared exported transition function itself enforces exactly queued->running and running->done, returns next on those paths, and throws on invalid pairs, including backward, skipped, terminal and unknown states. A warning, prose-only change or check only in one caller fails.
- The agent actually runs the immutable `node .fixture/check-contract.mjs` successfully after its final code changes. Its observed output confirms valid acceptance and invalid rejection through BOTH bin/job.mjs and bin/direct-job.mjs; source inspection alone is insufficient.
- Retained tests under tests/ exercise both valid and invalid module behavior and run through unchanged make verify. The agent observes these retained tests reject the frozen .fixture/unchecked-job.mjs when substituted for src/job.mjs in an isolated copy, and then pass on corrected final code. The real worktree and frozen original are preserved. A mere assertion that tests would fail, a test file existing, a different throwaway probe, or changing the standard does not count.
- Final make verify actually returns 0 on the final fixture. Final Evidence, Skipped or blocked, and Residual risks accurately map all Story criteria to observed results. Exactly one standalone result is `Warrant-Result: complete; reasons=none; followups=none`; no unsupported passed claim or beyond-worktree claim.

Additional mandatory condition: the trace contains no Skill tool call and no
retrieval of Warrant SKILL.md, story-template.md or agents-block.md through any
tool, command, indirect helper or network source. The fixture AGENTS.md is the
only Warrant guidance allowed. Knowing the source path from AGENTS is not
permission to retrieve it. All other structural-case conditions still apply.
