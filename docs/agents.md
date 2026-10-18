# Using Warrant with your agent

Warrant has one source of truth for every agent: the block from
[`plugin/skills/warrant/agents-block.md`](../plugin/skills/warrant/agents-block.md),
pasted into your repository's `AGENTS.md` with the single verification command
filled in. Most agents read `AGENTS.md` on their own. Some need one setting to
read it, and some let another instruction file silently take its place. This page
says which is which.

Agent behaviour changes between releases. Each row records how it was checked and
when:

- `tested`: we ran the agent against a throwaway repository containing the block
  and it reported the declared verification command (see
  [How the tested rows were checked](#how-the-tested-rows-were-checked)).
- `documented`: taken from the agent's official documentation only.

## Install prompt

Paste this into your agent, replacing the placeholder with the one command that
decides whether work in your repository is done:

```text
Install Warrant (https://github.com/CarlLee1983/Warrant) in this repository.
Read https://github.com/CarlLee1983/Warrant/releases/latest/download/agents.md
and follow its "Instructions for agents" section exactly.
Verification command: <verification command>
```

## Instructions for agents

You are an AI agent asked to install Warrant in the repository you are working
in. Follow these steps in order and stop where a step says so.

1. Find the verification command in the human's request. If it is missing,
   empty, or still the placeholder `<verification command>`, stop and ask the
   human for it. Do not choose, guess, or infer one from the repository: the
   verification command decides when work is done, and only a human may set it.
2. Download the raw block from
   <https://github.com/CarlLee1983/Warrant/releases/latest/download/agents-block.md>
   with a tool that returns the file unmodified (for example `curl -fsSL`).
   Copy it byte for byte: do not summarise, reformat, or translate it. Change
   only the text between the backticks on the `**Verification command:**`
   line, replacing it with the human's command.
3. If `AGENTS.md` does not exist at the repository root, create it with the
   block. If it exists and already contains the line
   `This repository follows Warrant.` or a heading whose text is `Warrant`,
   stop and report that Warrant is already installed; do not add the block
   again. Otherwise append the block to the end of the file after
   one blank line, and leave every existing line unchanged.
4. Apply the step for the agent you are, from
   [Agents with extra steps](#agents-with-extra-steps): for example add
   `AGENTS.md` to Gemini CLI's `context.fileName`, or add `read: AGENTS.md` for
   Aider. If the configuration file already exists, merge into it: add
   `AGENTS.md` to the existing list and leave every other key unchanged; create
   the file only if it does not exist. For files that shadow `AGENTS.md` (Zed,
   JetBrains Junie, or a nested `AGENTS.md`), only list them and explain the
   effect. Never delete, move, or edit them: that is the human's decision.
5. Do not run commands that change the human's global configuration, such as
   installing a plugin. If your agent has a plugin route (Claude Code, Codex),
   list those commands for the human to run.
6. Do not commit. Finish by listing every file you created or changed, and
   remind the human to run the verification command in CI on every pull
   request.

## Completion and later checks

Within an approved Story, prefer preventing errors at the owning type, interface,
or module, then executable checks; retain concise prose and human decisions for
remaining judgment. For reproducible defects, draft observable disallowed and
allowed behavior. During approved implementation, observe the retained check
reject known-bad behavior in an isolated copy or fixture and accept valid behavior
through the declared verification path. Reuse effective checks. These priorities
choose a suitable means rather than requiring every task to refactor or add
tests. Additions to approved scope or acceptance standards need human approval.
Recurring feedback from authorized sources that points outside the Story becomes
an evidence-backed proposal for human choice, not an automatic next task. Warrant
supplies this guidance; enforcement still belongs to the adopter's code, CI, and
human review.

Current-delivery criteria must be observable in the uncommitted worktree,
including staged, unstaged, and untracked changes. The declared verification
command must pass on the final worktree, and each current-delivery criterion
needs a passing observation. `complete` proves only that worktree delivery,
not commit, push, CI, merge, or deployment success.

An optional Follow-up verification subsection inside Acceptance Criteria may
hold observations that genuinely depend on `commit`, `push`, `ci`, `merge`, or
`deploy`. Specify each trigger, check, expected observation, and handoff and
obtain approval with the Story before implementation. Implementation requirements
and unmarked criteria remain current-delivery requirements. Do not reclassify
failed, blocked, skipped, or unobserved checks after the fact, or defer the
declared verification command.

Keep Evidence, Skipped or blocked, and Residual risks in the report. Evidence
contains exactly one
`Warrant-Result: <result>; reasons=<reasons>; followups=<followups>` line.
Approved follow-ups not yet triggered are listed with handoff steps under
Skipped or blocked; they do not alone cause `partial`. Once triggered, an
unrun or blocked follow-up means `partial`; a known failure means `partial`
with `verification-failed`. Missing current-delivery evidence, environment
blocks, and user-skipped checks also mean `partial`. Structured result counts
are not causal evidence of improved quality.

## Upgrade an existing block

Updating a plugin does not update a manually pasted `AGENTS.md` block or
reapprove existing Stories. When a human asks to upgrade, replace only the
Warrant block with the new version, preserving the existing verification
command and all unrelated repository rules. If the block boundary or command
is unclear, stop and ask. Review and approve any Story changes before
implementation; installation alone does not authorize reclassification.

## Summary

| Agent | What to do | Evidence | Verified | Source |
| --- | --- | --- | --- | --- |
| Claude Code | Install the plugin, paste the block | `tested` | 2026-10-02 | [README](../README.md#install-claude-code), [docs](https://code.claude.com/docs/en/plugins) |
| OpenAI Codex CLI | Install the plugin, paste the block | `tested` | 2026-10-02 | [AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md) |
| Cursor | Paste the block | `documented` | 2026-10-02 | [Rules](https://cursor.com/docs/context/rules) |
| GitHub Copilot | Paste the block | `documented` | 2026-10-02 | [Repository instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions) |
| Gemini CLI | Paste the block, add one setting | `documented` | 2026-10-02 | [GEMINI.md and context files](https://geminicli.com/docs/cli/gemini-md/) |
| Windsurf | Paste the block | `documented` | 2026-10-02 | [AGENTS.md](https://docs.windsurf.com/windsurf/cascade/agents-md) |
| Cline | Paste the block | `documented` | 2026-10-02 | [Cline rules](https://docs.cline.bot/customization/cline-rules) |
| Aider | Paste the block, add one setting | `documented` | 2026-10-02 | [Conventions](https://aider.chat/docs/usage/conventions.html) |
| Amp | Paste the block | `documented` | 2026-10-02 | [AGENTS.md](https://ampcode.com/docs/customize/agents-md) |
| opencode | Paste the block | `documented` | 2026-10-02 | [Rules](https://opencode.ai/docs/rules/) |
| Zed | Paste the block, check for shadowing files | `documented` | 2026-10-02 | [Instructions](https://zed.dev/docs/ai/instructions) |
| JetBrains Junie | Paste the block, check for shadowing files | `documented` | 2026-10-02 | [Guidelines](https://junie.jetbrains.com/docs/guidelines-and-memory.html) |

## Paste the block and you are done

Cursor, GitHub Copilot, Windsurf, Cline, Amp, and opencode read `AGENTS.md`
from the repository root without any setting. Paste the block, fill in the
verification command, and run that command in CI on every pull request.

In a monorepo, a nested `AGENTS.md` can take precedence over the root one for
files below it; GitHub Copilot, for example, uses the
[nearest `AGENTS.md`](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
in the directory tree. Put the block in each nested `AGENTS.md` too, or keep
nested files free of conflicting rules.

## Agents with extra steps

### Claude Code

Follow [Install (Claude Code)](../README.md#install-claude-code) and
[Adopt](../README.md#adopt) in the README.

### OpenAI Codex CLI

Codex reads `AGENTS.md` natively, and it installs Warrant's Claude Code
marketplace unchanged, which also gives it the `warrant:warrant` skill:

```sh
codex plugin marketplace add CarlLee1983/Warrant
codex plugin add warrant@warrant
```

Then paste the block into `AGENTS.md` as for any other agent. To pick up a newer
release, run `codex plugin marketplace upgrade` and reinstall the plugin.

### Gemini CLI

Gemini CLI reads `GEMINI.md` by default, not `AGENTS.md`. Keep the block in
`AGENTS.md` and tell Gemini CLI to read it, in `.gemini/settings.json`:

```json
{
  "context": {
    "fileName": ["AGENTS.md", "GEMINI.md"]
  }
}
```

### Aider

Aider loads no instruction file on its own. Add `AGENTS.md` as a read-only file
in `.aider.conf.yml`:

```yaml
read: AGENTS.md
```

### Zed

Zed reads only the first instruction file it finds, in this order: `.rules`,
`.cursorrules`, `.windsurfrules`, `.clinerules`, `.github/copilot-instructions.md`,
`AGENT.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`. If any file earlier in that
list exists, Zed never reads `AGENTS.md` and the block has no effect. Decide
whether to merge that file into `AGENTS.md` or to paste the block into it.

### JetBrains Junie

If `.junie/AGENTS.md` exists, Junie uses it instead of the root `AGENTS.md`, and
the block has no effect. Junie can create that file on first start by offering
to import other agents' instructions. Paste the block into `.junie/AGENTS.md`
as well, or merge it back into the root file.

## Optional: install the skill

The block alone includes the three rules and the essential drafting checks:
read referenced files, flag ambiguous or unobservable criteria for a human,
make current-delivery checks observable before commit across staged, unstaged,
and untracked changes (not merely `main...HEAD`), and exempt the Story itself
from file-scope limits.
It also includes the upfront follow-up classification limits and completion
report rules, so they apply even when no skill is loaded. The optional skill
adds guidance and examples for drafting and implementing a Story. Many agents
load skills from `.agents/skills/`,
so you can copy the whole directory there:

```sh
mkdir -p .agents/skills
cp -R path/to/Warrant/plugin/skills/warrant .agents/skills/warrant
```

Copy the whole directory, not only `SKILL.md`: the skill refers to
`agents-block.md` and `story-template.md` next to it. Cline does not read
`.agents/skills/`; use `.cline/skills/`, `.clinerules/skills/`, or
`.claude/skills/` instead ([Cline skills](https://docs.cline.bot/customization/skills)). Claude Code and Codex get the skill from the plugin
and need no copy.

## How the tested rows were checked

In an empty Git repository, create `AGENTS.md` from the block with the
verification command filled in as `make verify-warrant-7f3a`. Then, from the
repository root, check that each agent has the block in its context before it
uses any tool:

```sh
Q="What is this repository's verification command? Reply with the command only."
claude -p "$Q" --setting-sources project --disallowedTools Read Grep Glob Bash WebFetch Task
codex debug prompt-input "$Q" | grep -c 'make verify-warrant-7f3a'
```

Claude Code runs with file tools disabled and without user settings or plugins,
so it can only answer from instructions it loaded on start. `codex debug
prompt-input` prints the context Codex sends to the model. The token appears
nowhere except in `AGENTS.md`, so a correct answer, or a count of at least 1,
means the agent loaded the block automatically.
