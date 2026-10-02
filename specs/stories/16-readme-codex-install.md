# 16 Codex install commands in the README

依賴：15。

## Goal

讓 Codex 使用者在 README 就讀得到安裝指令，不必再點進 `docs/agents.md`。目前三份 README 只有 Claude Code 的安裝段落，Codex 只出現在「其他 agent」那一句的清單裡，實際的 `codex plugin` 指令只寫在 `docs/agents.md` 的「OpenAI Codex CLI」段落。

在三份 README 的 Claude Code 安裝段落之後，新增一個 Codex 安裝段落，指令與 `docs/agents.md` 相同。既有的 Claude Code 段落與其錨點 `#install-claude-code` 保持不變，因為 `docs/agents.md` 連到它。

## Out of Scope

- 修改 `docs/agents.md`、`plugin/` 下任何檔案、推廣站（`site/`）。
- 在 README 加入 Codex 以外 agent 的安裝指令。
- 重新實測 Codex 或 Claude Code 的安裝流程。
- 發佈新的 release 或調整 `plugin.json` 版本。

## Acceptance Criteria

1. `README.md` 在 `## Install (Claude Code)` 之後、`## Adopt` 之前，有一個標題為 `## Install (Codex)` 的段落，其中的程式碼區塊恰好是以下兩行：

   ```text
   codex plugin marketplace add CarlLee1983/Warrant
   codex plugin add warrant@warrant
   ```

2. 這兩行與 `docs/agents.md` 「OpenAI Codex CLI」段落的程式碼區塊內容逐字相同。
3. `README.zh-TW.md` 有對應的 `## 安裝（Codex）` 段落、`README.ja.md` 有對應的 `## インストール（Codex）` 段落，位置與 `README.md` 相同，程式碼區塊與 `README.md` 相同。
4. 三份 README 的 `## Install (Claude Code)`（及其譯文標題）段落內容不變：`git diff main -- README.md README.zh-TW.md README.ja.md` 中這三個段落沒有任何刪除行。
5. 三份 README「其他 agent」那一句的清單不再包含 Codex。
6. `git diff --name-only main...HEAD`（PR 階段）只列出三份 README 與本 Story 檔 `specs/stories/16-readme-codex-install.md`。
7. `make verify` 通過（exit code 0）。
