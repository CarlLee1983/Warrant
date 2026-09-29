# 01 Repo skeleton

上層規格：CarlLee1983/Warrant#1

## Goal

讓 Warrant repo 成為可安裝的 plugin 與 marketplace，內含 skill、AGENTS.md 區塊與 Story 模板，並以自己的驗證指令在 CI 上證明結構有效。

## Out of Scope

- 在任何採用端 repo 安裝或使用 Warrant（見 02、03）。
- push 到 GitHub、建立 tag 或 release（需擁有者另行核准）。
- 自動化的行為測試（`claude plugin eval`）。
- 修改 `CONTEXT.md` 與 `docs/adr/` 既有內容，除非實作發現與它們矛盾，此時停下回報。

## Acceptance Criteria

1. `claude plugin validate --strict .` 在 repo 根目錄以 exit 0 結束。
2. 在本機以 repo 路徑加入 marketplace 並安裝 plugin 成功，新 session 的 skill 清單出現 Warrant skill。
3. skill 以英文寫成，明確涵蓋：三條規則；起草 Story 後停下等核准；核准只看 commit 進主分支或人明確指派；缺少驗證指令時回報而不猜；範圍外的工作停下回報；完成回報三段格式與「部分完成」規則；歷史 Story 不是待辦工作。
4. AGENTS.md 區塊以英文寫成，含三條規則、驗證指令宣告位置、Story 路徑 `specs/stories/<slug>.md`，且不引用 Warrant 以外的檔案或工具。
5. Story 模板只有 Goal、Out of Scope、Acceptance Criteria 三段，沒有任何狀態欄位。
6. Warrant 自己的 AGENTS.md 放入該區塊，並宣告自己的驗證指令。
7. 驗證指令同時執行 plugin 驗證與 Markdown lint，只使用現成工具，repo 內沒有自寫腳本。
8. GitHub Actions workflow 在 PR 上執行驗證指令；若 Claude CLI 在 CI 無憑證無法執行，改以 JSON schema 驗證設定檔，並在完成回報中寫明是哪一種。
9. README 以繁中寫成，說明目的、三條規則、安裝方式、採用方式，並連結 `CONTEXT.md` 與 `docs/adr/`。
