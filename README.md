# Warrant

**English** | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md)

Warrant bounds an AI agent's work by human-approved intent, proves completion with the repository's own verification, and hands the result to a human for review. It ships rules only: one Claude Code skill, one `AGENTS.md` block you can paste into any agent's setup, and one Story template. No scripts, CLI, or packages. Website: [carllee1983.github.io/Warrant](https://carllee1983.github.io/Warrant/).

## Three rules

1. **Intent is approved by a human**: work starts from a Story at `specs/stories/<slug>.md`. A Story has exactly three sections: Goal, Out of Scope, and Acceptance Criteria. It counts as approved only when a human has committed it to the default branch, or has explicitly assigned it in the current session.
2. **Completion is proven by evidence**: completion is decided only by the single verification command the repository declares in `AGENTS.md`, and every acceptance criterion must map to an actual observation.
3. **The agent must not rewrite the standard**: no changing requirements, no loosening acceptance criteria, no widening scope. When work outside the Story is needed, the agent stops and reports it.

The agent finishes with a three-section completion report: evidence for each acceptance criterion, skipped or blocked checks, and residual risks. If any criterion lacks passing evidence, the conclusion is "partial".

Warrant does not decide which work to do, and it does not prescribe how humans review. Enforcement comes from the adopter's CI and human review; see [ADR-0001](docs/adr/0001-enforcement-delegated-to-adopters.md) for why.

## Install (Claude Code)

```text
/plugin marketplace add CarlLee1983/Warrant
/plugin install warrant@warrant
```

## Install (Codex)

```text
codex plugin marketplace add CarlLee1983/Warrant
codex plugin add warrant@warrant
```

## Adopt

1. Paste [`plugin/skills/warrant/agents-block.md`](plugin/skills/warrant/agents-block.md) into your repository's `AGENTS.md` and fill in the single verification command.
2. Run that verification command in CI on every PR. Warrant does not enforce this, but enforcement of rule 2 depends on it.
3. Write Stories under `specs/stories/`, shaped like [`plugin/skills/warrant/story-template.md`](plugin/skills/warrant/story-template.md).

Other agents (Cursor, Copilot, Gemini CLI and more): see [docs/agents.md](docs/agents.md).

To let your agent install Warrant itself, paste this prompt and replace the placeholder with your verification command. Your agent will follow instructions attached to this repository's latest release; review the files it lists before you commit them.

```text
Install Warrant (https://github.com/CarlLee1983/Warrant) in this repository.
Read https://github.com/CarlLee1983/Warrant/releases/latest/download/agents.md
and follow its "Instructions for agents" section exactly.
Verification command: <verification command>
```

Migrating from PraxisBound: delete the protocol files and marker files PraxisBound installed, and paste the Warrant block instead. Existing directory-style Stories stay as they are and are treated as historical records.

## Documentation

- [CONTEXT.md](CONTEXT.md): glossary
- [docs/adr/](docs/adr/): architecture decisions
- [specs/stories/](specs/stories/): Warrant's own Stories

## Verification

```sh
make verify
```

Validates the marketplace, the plugin manifest, and the skills with `claude plugin validate --strict`, in that order, then runs Markdown lint. Before that, it checks that `README.zh-TW.md` and `README.ja.md` keep this file's structure: the same number of `##` headings, identical code blocks, the same link targets, and the same number of paragraphs and list items. It does not check what the translations mean.

The plugin itself lives in `plugin/`, and the marketplace points only there, so an installation does not include `evals/`.

## Behaviour evals

```sh
make eval
```

Runs every scenario under `evals/cases/` with `claude plugin eval`; each subdirectory there is one scenario. Each scenario runs several times and passes when enough of its runs pass. How many times each scenario runs, the pass threshold, the cost ceiling, and the concurrency are set in the `eval` target of the [Makefile](Makefile). It uses your Claude Code credentials and every run incurs model costs, so it does not run in CI and is not part of `make verify`. The cost ceiling covers the whole `make eval` invocation, across all scenarios and repetitions. It is checked before each run starts, so the actual cost can exceed it by the runs already in flight. When the ceiling is hit, the eval stops, reports partial results, and ends with exit code 2. Results are written to `evals/results/`, which git ignores.

Each scenario's fixture generates `AGENTS.md` from `skills/warrant/agents-block.md` in the plugin under test, filling in only the verification command. `evals/mutant/` is a copy of the plugin with inverted instructions: its skill and block rewrite three rules — "stop and wait for approval", "stop on a scope conflict", and "an inference is not an observation" — into explicit opposite instructions; everything else is identical to `plugin/`. It exists to show that the graders can tell right from wrong:

```sh
make eval EVAL_PLUGIN=evals/mutant
```

In that run, scenarios 03, 05, and 09 should fall below the threshold.

## License

[MIT](LICENSE)
