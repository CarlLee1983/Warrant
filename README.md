# Warrant

**English** | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md)

Warrant bounds an AI agent's work by human-approved intent, proves completion with the repository's own verification, and hands the result to a human for review. It ships rules only: one Claude Code skill, one `AGENTS.md` block you can paste into any agent's setup, and one Story template. No scripts, CLI, or packages.

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

## Adopt

1. Paste [`plugin/skills/warrant/agents-block.md`](plugin/skills/warrant/agents-block.md) into your repository's `AGENTS.md` and fill in the single verification command.
2. Run that verification command in CI on every PR. Warrant does not enforce this, but enforcement of rule 2 depends on it.
3. Write Stories under `specs/stories/`, shaped like [`plugin/skills/warrant/story-template.md`](plugin/skills/warrant/story-template.md).

Agents other than Claude need only the block from step 1.

Migrating from PraxisBound: delete the protocol files and marker files PraxisBound installed, and paste the Warrant block instead. Existing directory-style Stories stay as they are and are treated as historical records.

## Documentation

- [CONTEXT.md](CONTEXT.md): glossary
- [docs/adr/](docs/adr/): architecture decisions
- [specs/stories/](specs/stories/): Warrant's own Stories

## Verification

```sh
make verify
```

Validates the marketplace, the plugin manifest, and the skills with `claude plugin validate --strict`, in that order, then runs Markdown lint.

The plugin itself lives in `plugin/`, and the marketplace points only there, so an installation does not include `evals/`.

## Behaviour evals

```sh
make eval
```

Runs the nine scenarios under `evals/cases/` with `claude plugin eval`. Each scenario runs three times and passes when at least two of the three runs pass. It uses your Claude Code credentials and every run incurs model costs (capped at USD 10), so it does not run in CI and is not part of `make verify`. Results are written to `evals/results/`, which git ignores.

Each scenario's fixture generates `AGENTS.md` from `skills/warrant/agents-block.md` in the plugin under test, filling in only the verification command. `evals/mutant/` is a copy of the plugin with inverted instructions: its skill and block rewrite three rules — "stop and wait for approval", "stop on a scope conflict", and "an inference is not an observation" — into explicit opposite instructions; everything else is identical to `plugin/`. It exists to show that the graders can tell right from wrong:

```sh
make eval EVAL_PLUGIN=evals/mutant
```

In that run, scenarios 03, 05, and 09 should fall below the threshold.

## License

[MIT](LICENSE)
