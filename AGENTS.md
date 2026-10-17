# Repository Agent Guide

This repository is Warrant itself. It follows its own rules, so the section
below is both the local instruction set and the block adopters copy from
`plugin/skills/warrant/agents-block.md`.

## Warrant

This repository follows Warrant. Work is bounded by human-approved intent and
proven by this repository's own verification.

**Verification command:** `make verify`

1. **Intent is approved by a human.** Work starts from a Story at
   `specs/stories/<slug>.md` with Goal, Out of Scope, and Acceptance Criteria.
   A Story is approved only when a human has committed it to the default
   branch, or has explicitly assigned it in the current session. When it is
   not committed and the human only asks you to implement it, ask once whether
   they approve it as written; only a yes counts. A Story you
   drafted or committed yourself is not approved: stop and wait. Approval is
   not a work queue; the human chooses which Story to do.
2. **Completion is proven by evidence.** Run the verification command above and
   repair failures until it passes; if the repair lies outside the Story, stop
   and report it. Map current criteria and due follow-ups to a reproducible observation:
   the command you ran and its output, or the `file:line` you inspected. If no
   verification command is declared, report that and stop; do not choose
   checks yourself.
3. **The standard is not yours to change.** Do not change requirements, weaken
   or reinterpret acceptance criteria, delete or skip failing tests, edit the
   Story to fit the work, or widen scope. When work outside the Story is
   needed, or a criterion conflicts with Out of Scope, stop and report it.

Before drafting, read every cited file; flag vague or uncheckable criteria and
propose a checkable rewrite for the human to decide. Current delivery criteria
must be observable in the uncommitted working tree. File-scope checks must exempt
the Story file itself and include staged, unstaged, and untracked changes (for
example, `git diff --name-only <base>` plus `git ls-files --others --exclude-standard`,
not `<base>...HEAD` alone). Draft exactly Goal, Out of Scope, Acceptance Criteria;
then stop without implementing or committing until human approval. Read the
Warrant skill when available; these checks also apply when it is not installed.

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
future-check triggers and handoff steps; (3) Residual risks. Inferences and
substitute checks are not passing observations. A passing follow-up belongs in
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

## Local constraints

- The product ships rules only. Do not add scripts, a CLI, or packages for
  adopters; see `docs/adr/0001-enforcement-delegated-to-adopters.md`.
- `plugin/skills/warrant/` is the versioned surface. Every change to it bumps
  `version` in `plugin/.claude-plugin/plugin.json`; installed copies only refresh when
  the version changes. `README.md` is written in English; `README.zh-TW.md`
  and `README.ja.md` are its translations and change together with it.
  `CONTEXT.md` and `docs/adr/` are written in Traditional Chinese; the skill,
  block, and Story template in English. `docs/agents.md` is written in English
  only and is not translated.
- `.github/workflows/release.yml` attaches `docs/agents.md` and
  `plugin/skills/warrant/agents-block.md` to every published release as
  `agents.md` and `agents-block.md`. The install prompt reads both from the
  latest release, so removing or changing that workflow breaks the prompt.

<!-- trail:start -->
## Trail — repo context graph

This repo is indexed in `.trail/cache/`: small linked markdown nodes that explain each
system and carry exact file:line spans, kept in sync with the code through git.

For ANY task here — understanding how something works, finding where code lives,
or scoping a change — get context from the graph before grepping or opening
source files. Re-ask freely (it's cheap) and reuse literal identifiers you
already have (symbol, error string, file name) as the query. New to this repo?
Run `trail map` first — a token-budgeted orientation (dir clusters, hubs,
hotspots), no LLM, no key.

- Run `trail ask "<your question>" --source` → ranked nodes with the relevant
  code spans inlined (each hit's ≤8-line crux by default; `--full` for whole
  definitions when the crux isn't enough). Match the tool to the task shape:
  for understanding or editing, the top node IS the answer — cite its
  `covers:` file:line spans and edit straight from `--source`. For
  exhaustive tasks ("every occurrence / every caller of this pattern"), ranked
  results are top-N, not complete — run `trail grep "<literal>"` instead
  (exhaustive over indexed files, grouped by enclosing symbol), falling back
  to raw `grep -rn` only for unindexed files.
- `trail skeleton <file>` → every definition's signature + span, ~10× cheaper
  than reading the file; use it to skim an API surface.
- `trail callers <symbol>` gives precomputed, exact edges — who calls this.
  Add `--direction out` for what it calls, or `--depth N` to walk
  transitively for the full blast radius. For structural questions, skip
  ranking and use this directly.
- Or browse: `.trail/cache/INDEX.md` lists every node; follow the links.
- Monorepos and folders of multiple repos rank fairly across sub-projects —
  hits carry `[scope/]` labels naming which one they're from. Narrow with
  `trail ask "<task>" --in <scope>/` once you know where you're working.

If a returned span is truncated ("+N more lines"), open the file at that exact
range before finalizing. Only open source files when a node genuinely lacks a
needed detail, and then at the exact file:line the node points to — never
re-read whole files.

After big code changes, refresh the graph with `trail build` (deterministic,
no API key, $0).
<!-- trail:end -->
