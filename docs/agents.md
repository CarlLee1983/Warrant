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
Read https://raw.githubusercontent.com/CarlLee1983/Warrant/main/docs/agents.md
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
2. Fetch the block from
   <https://raw.githubusercontent.com/CarlLee1983/Warrant/main/plugin/skills/warrant/agents-block.md>
   and replace the placeholder on its `**Verification command:**` line with the
   human's command, in backticks.
3. If `AGENTS.md` does not exist at the repository root, create it with the
   block. If it exists and already contains a `## Warrant` section, stop and
   report that Warrant is already installed. Otherwise append the block to the
   end of the file after one blank line, and leave every existing line
   unchanged.
4. Apply the step for the agent you are, from
   [Agents with extra steps](#agents-with-extra-steps): for example add
   `AGENTS.md` to Gemini CLI's `context.fileName`, add `read: AGENTS.md` for
   Aider, or check for files that would shadow `AGENTS.md` in Zed or JetBrains
   Junie and report them.
5. Do not run commands that change the human's global configuration, such as
   installing a plugin. If your agent has a plugin route (Claude Code, Codex),
   list those commands for the human to run.
6. Do not commit. Finish by listing every file you created or changed, and
   remind the human to run the verification command in CI on every pull
   request.

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

Then paste the block into `AGENTS.md` as for any other agent. Installed copies
refresh when the plugin `version` changes.

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
list exists, Zed never reads `AGENTS.md` and the block has no effect. Remove the
earlier file or move its content into `AGENTS.md`.

### JetBrains Junie

If `.junie/AGENTS.md` exists, Junie uses it instead of the root `AGENTS.md`, and
the block has no effect. Remove `.junie/AGENTS.md` or put the block there.

## Optional: install the skill

The block alone is enough for the three rules. The skill adds guidance for
drafting and implementing a Story. Many agents load skills from `.agents/skills/`,
so you can copy the whole directory there:

```sh
mkdir -p .agents/skills
cp -R path/to/Warrant/plugin/skills/warrant .agents/skills/warrant
```

Copy the whole directory, not only `SKILL.md`: the skill refers to
`agents-block.md` and `story-template.md` next to it. Cline does not read
`.agents/skills/`; use `.cline/skills/`, `.clinerules/skills/`, or
`.claude/skills/` instead. Claude Code and Codex get the skill from the plugin
and need no copy.

## How the tested rows were checked

In an empty Git repository, create `AGENTS.md` from the block with the
verification command filled in as `make verify-warrant-7f3a`. Then ask each agent
non-interactively from the repository root, and check that the answer contains
`make verify-warrant-7f3a`:

```sh
Q="What is this repository's verification command? Reply with the command only."
claude -p "$Q"
codex exec --skip-git-repo-check -s read-only "$Q"
```

The token appears nowhere except in `AGENTS.md`, so a correct answer means the
agent read the block.
