# 06 Story file exempt from diff criteria

來源：03 AgentPortV2 試點。依賴：05。

## Goal

在 Warrant skill 的 Mode 1（起草 Story）加一條起草規則：凡是限制一個變更會動到哪些檔案的驗收條件，都必須把 Story 檔本身排除在外。AgentPortV2 試點中有一條驗收條件寫「`git diff --stat origin/main` 只列出 AGENTS.md」，但 Story 檔與實作放在同一個變更裡，這條條件照字面永遠不可能成立；實作者只能違反它，或自行重新詮釋它，兩者都違背規則 3。這條規則讓起草時就寫出照字面可成立的條件。

## Out of Scope

- 修改 Mode 2（實作 Story）或完成回報的規則。
- 修改 `plugin/skills/warrant/agents-block.md` 與 `plugin/skills/warrant/story-template.md`。
- 為此規則新增或修改 `evals/cases/` 下的 eval case。
- 回頭修正 AgentPortV2 中已存在的 Story 或其驗收條件。
- 修改 `README.md`、`CONTEXT.md` 或 `docs/adr/`。

## Acceptance Criteria

1. `plugin/skills/warrant/SKILL.md` 中，`## Mode 1: draft a Story` 與 `## Mode 2: implement a Story` 兩個標題之間有一段英文文字，說明：限制變更所動檔案的驗收條件（例如以 `git diff` 列出的檔案清單為準的條件）必須把 Story 檔本身（`specs/stories/<slug>.md`）排除在外。這段文字包含 `exempt the Story file` 這個片語，可用 `awk '/^## Mode 1/,/^## Mode 2/' plugin/skills/warrant/SKILL.md | grep -c 'exempt the Story file'` 得到 1。
2. `plugin/.claude-plugin/plugin.json` 的 `version` 為 `0.1.2`。
3. `git diff --name-only main...HEAD` 只列出 `plugin/skills/warrant/SKILL.md`、`plugin/.claude-plugin/plugin.json`，以及本 Story 檔 `specs/stories/06-story-file-exempt-from-diff-criteria.md`。
4. `make verify` 通過（exit code 0）。
