# 15 Pin the install prompt to the latest release

依賴：14。

## Goal

讓安裝 Prompt 只在刻意發佈 release 時改變 agent 的行為，推上 `main` 不會影響。目前三份 README 的 Prompt 與 `docs/agents.md` 都直接讀取 `main` 上的 raw 檔案，任何推上 `main` 的改動都會立即影響所有使用 Prompt 的 agent。

改成讀取最新 release 的附件，網址為 `https://github.com/CarlLee1983/Warrant/releases/latest/download/<檔名>`。附件由新的 `release.yml` 在每次 release 發佈時，從該 tag 的 commit 自動上傳，避免有人忘記上傳。網址固定不變，已經複製出去的 Prompt 也會隨下一次 release 拿到新版說明。

本 Story 發佈 `v0.1.3`，這是第一個帶有這兩個附件的 release。`plugin.json` 的版本同步改為 `0.1.3`，維持 tag 等於 plugin 版本的慣例。

## Out of Scope

- 修改 `plugin/skills/warrant/` 下任何檔案的內容。
- 修改推廣站。
- 改為釘選到特定 tag 的網址。
- 修改或補傳 `v0.1.0`–`v0.1.2` 的 release 附件。
- 對 Claude Code 與 Codex 以外的 agent 做實測。
- 修改 `CONTEXT.md`、`docs/adr/`、`Makefile`、`.github/workflows/verify.yml`、`.github/workflows/pages.yml`。

## Acceptance Criteria

1. `plugin/.claude-plugin/plugin.json` 的 `version` 為 `0.1.3`。
2. 三份 README 的安裝 Prompt 程式碼區塊完全相同，讀取網址為 `https://github.com/CarlLee1983/Warrant/releases/latest/download/agents.md`。三份 README 都不含 `raw.githubusercontent.com`。三份 README 在 Prompt 前的說明句不再說指示來自 `main` 分支，而是說來自最新 release。`make readme-sync` 的 exit code 為 0。
3. `docs/agents.md` 的「Install prompt」程式碼區塊與 README 的 Prompt 完全相同。「Instructions for agents」第 2 步的區塊來源為 `https://github.com/CarlLee1983/Warrant/releases/latest/download/agents-block.md`。`docs/agents.md` 不含 `raw.githubusercontent.com`。
4. `.github/workflows/release.yml` 須符合以下各點：
   - 在 `release` 的 `published` 事件觸發。
   - `permissions` 只有 `contents: write`。
   - checkout 該 release 的 tag。
   - 以 `--clobber` 把 `docs/agents.md` 上傳為附件 `agents.md`，把 `plugin/skills/warrant/agents-block.md` 上傳為附件 `agents-block.md`。
5. `AGENTS.md` 的 Local constraints 寫明三件事：release 附件由 `release.yml` 產生、安裝 Prompt 依賴最新 release 帶有 `agents.md` 與 `agents-block.md` 兩個附件、移除或改動該 workflow 會讓 Prompt 失效。
6. 合併後，發佈 `v0.1.3`，須符合以下各點：
   - 打 tag 與建立 release 之前，在當次對話取得擁有者核准；核准本 Story 不等於核准發佈。
   - `v0.1.3` tag 指向合併後的 `main` commit。
   - `gh release view v0.1.3 --json assets --jq '.assets[].name'` 剛好列出 `agents.md` 與 `agents-block.md`。
   - `gh release view --json tagName --jq .tagName`（latest）輸出 `v0.1.3`。
7. 發佈後，兩個 `releases/latest/download/` 網址以 `curl -sL` 下載都成功（HTTP 200），且內容分別與 `git show v0.1.3:docs/agents.md`、`git show v0.1.3:plugin/skills/warrant/agents-block.md` 逐位元組相同。
8. 發佈後，以真實的 `latest/download` 網址，用 Claude Code 與 Codex 各跑兩種情境的 README Prompt。暫時 repo 一開始就有一個非空的 `AGENTS.md`。
   - **已填驗證指令**（填 `make verify-warrant-7f3a`）：`AGENTS.md` 含 Warrant 區塊與 `make verify-warrant-7f3a`，原有內容逐位元組保留為前綴，附加的區塊與 `agents-block.md` 只差在驗證指令那一行。
   - **未填驗證指令**（保留 `<verification command>`）：`AGENTS.md` 與實測前逐位元組相同，且 agent 的回覆要求人提供驗證指令。
   - 完成回報附上四次實測的指令、agent 輸出與 `AGENTS.md` 比對結果。實測用的暫時 repo 不在本 repo 內。
9. `git diff --name-only main...HEAD`（PR 階段）只列出以下檔案：`plugin/.claude-plugin/plugin.json`、三份 README、`docs/agents.md`、`AGENTS.md`、`.github/workflows/release.yml`、本 Story 檔 `specs/stories/15-pin-install-prompt-to-release.md`。
10. `make verify` 通過（exit code 0）。
