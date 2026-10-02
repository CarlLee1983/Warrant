# 10 Clarify the eval cost ceiling

依賴：09。

## Goal

讓三份 README 說清楚 `make eval` 的費用上限是怎麼算的。現行文字「每次執行都會產生模型費用（上限 USD 10）」看不出上限是每個 run 各自算、還是整次 `make eval` 合計。實際上 `Makefile` 傳給 `claude plugin eval` 的 `--max-cost-usd 10` 是整次執行（9 個情境 × 3 次）的總上限。依 `claude plugin eval --help`，上限在每個 run 啟動前檢查，所以實際費用可能超過上限，超出的部分是當下正在執行的 run（最多 `--concurrency 3` 個）。觸及上限時會中止，回報部分結果並以 exit code 2 結束。

## Out of Scope

- 修改 `Makefile` 的任何參數，包括上限金額與 concurrency。
- 修改 README 中這一句以外的內容。
- 修改 `plugin/`、`evals/`、`CONTEXT.md` 或 `docs/adr/`。

## Acceptance Criteria

1. `README.zh-TW.md` 的「行為驗收（eval）」段落說明：USD 10 是整次 `make eval`（全部情境與重複次數合計）的上限；上限在每個 run 啟動前檢查，實際費用最多會多出執行中的 run（最多 3 個）；觸及上限時中止、回報部分結果，exit code 為 2。
2. `README.md` 與 `README.ja.md` 的同一段落以各自的語言表達第 1 條的三點內容，不多也不少。
3. 三份 README 中出現的上限數值 `10`、concurrency 數值 `3` 與 exit code `2`，與 `Makefile` 的 `--max-cost-usd 10`、`--concurrency 3`，以及 `claude plugin eval --help` 中 `--max-cost-usd` 的說明一致。
4. `make readme-sync` 的 exit code 為 0。
5. `git diff --name-only 55a4ce5..HEAD`（`55a4ce5` 為 Story 09 的實作 commit）只列出 `README.md`、`README.zh-TW.md`、`README.ja.md`，以及本 Story 檔 `specs/stories/10-eval-cost-ceiling-wording.md`。
6. `make verify` 通過（exit code 0）。
