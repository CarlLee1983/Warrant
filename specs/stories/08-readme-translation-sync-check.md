# 08 README translation sync check

依賴：07。

## Goal

讓 `make verify` 在三份 README 結構不一致時失敗，使「`README.zh-TW.md` 與 `README.ja.md` 跟著 `README.md` 一起更新」這條 `AGENTS.md` 規定在 CI 上有強制力。檢查的是 Story 07 驗收條件 3–5 用過的同一組結構訊號：`##` 標題數、程式碼區塊內容、相對連結目標。這是 repo 內部的檢查，不發佈給採用端，不違反 `docs/adr/0001-enforcement-delegated-to-adopters.md`。

## Out of Scope

- 檢查譯文語意或品質；結構一致不代表翻譯正確。
- 檢查 `CONTEXT.md`、`docs/adr/` 或其他 Markdown 檔。
- 修改 `plugin/` 下任何檔案，或變更 `plugin/.claude-plugin/plugin.json` 的 `version`。
- 修改 `.github/workflows/verify.yml`；它已執行 `make verify`。
- 新增 npm、Python 或其他套件依賴；檢查只用 POSIX shell 工具（`awk`、`grep -E`、`sort`、`diff`），以便在 macOS 與 CI 的 Ubuntu 上都能執行。
- 新增獨立的腳本檔；檢查寫在 `Makefile` 內。

## Acceptance Criteria

1. `Makefile` 有一個 `readme-sync` target，且 `verify` target 會執行它：`make -n verify` 的輸出包含 `readme-sync` 所執行的指令。
2. 在目前的 working tree 上，`make readme-sync` 的 exit code 為 0。
3. 刪除 `README.ja.md` 中任一 `##` 標題行後，`make readme-sync` 的 exit code 非 0，且輸出指出 `README.ja.md`；還原後恢復為 0。
4. 修改 `README.zh-TW.md` 中任一程式碼區塊內的一行後，`make readme-sync` 的 exit code 非 0，且輸出指出 `README.zh-TW.md`；還原後恢復為 0。
5. 在 `README.md` 新增一條指向 `CONTEXT.md` 以外、repo 中存在檔案的相對連結（例如 `[Makefile](Makefile)`）而不改兩份翻譯時，`make readme-sync` 的 exit code 非 0；還原後恢復為 0。
6. `make readme-sync` 比較連結時，忽略三份 README 互相指向的連結（`README.md`、`README.zh-TW.md`、`README.ja.md`）與 `#` 錨點。
7. `README.md`、`README.zh-TW.md`、`README.ja.md` 的「驗證」段落各加一句，說明 `make verify` 也會檢查三份 README 的結構一致；三份的程式碼區塊不變。
8. `git diff --name-only 565afeb..HEAD`（`565afeb` 為 Story 07 的實作 commit）只列出 `Makefile`、`README.md`、`README.zh-TW.md`、`README.ja.md`，以及本 Story 檔 `specs/stories/08-readme-translation-sync-check.md`。
9. `make verify` 通過（exit code 0）。
