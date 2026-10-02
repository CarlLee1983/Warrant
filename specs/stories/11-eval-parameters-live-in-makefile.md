# 11 Eval parameters live only in the Makefile

依賴：10。

## Goal

讓 `make eval` 的參數只有一個事實來源：`Makefile` 的 `eval` target。三份 README 第 56 行目前抄了五個會隨 `Makefile` 或 `evals/cases/` 改變的數字：情境數（九個）、每情境的執行次數（三次）、通過門檻（三次至少兩次）、費用上限（USD 10）、並行數（最多 3 個）。改 `Makefile` 時沒有任何檢查會提醒去改 README。這個 Story 把這些數字從 README 移除，改成連結到 `Makefile`；費用上限如何運作（每個 run 啟動前檢查、可能多出執行中的 run、觸及時中止並回報部分結果、exit code 2）這類 `claude plugin eval` 本身的行為則保留。

## Out of Scope

- 修改 `Makefile`，包括把參數抽成變數。
- 新增檢查 README 與 `Makefile` 數字一致的機制。
- 修改三份 README 第 56 行以外的內容；第 58 行的「三條規則」與第 64 行的情境編號 03、05、09 描述的是 `evals/mutant/` 與情境本身，不是 `Makefile` 參數，維持不變。
- 修改 `plugin/`、`evals/`、`CONTEXT.md` 或 `docs/adr/`。

## Acceptance Criteria

1. 三份 README 的第 56 行在移除所有行內程式碼（反引號包住的部分）與「exit code 2」字樣後，不含任何阿拉伯數字：``sed -n 56p <file> | sed -e 's/`[^`]*`//g' -e 's/exit code 2//' | grep -c '[0-9]'`` 對三份檔案都輸出 `0`。
2. 三份 README 的第 56 行不含數量詞：`README.md` 不含 `nine`、`three`、`two`；`README.zh-TW.md` 不含 `九`、`三`、`兩`；`README.ja.md` 不含 `九`、`三`、`二`。
3. 三份 README 的第 56 行都含有連結 `[Makefile](Makefile)`，並以各自的語言說明：情境數由 `evals/cases/` 決定；執行次數、通過門檻、費用上限與並行數定義在 `Makefile` 的 `eval` target。
4. 三份 README 的第 56 行仍說明費用上限的運作方式：涵蓋整次 `make eval`；在每個 run 啟動前檢查，所以實際費用可能多出執行中的 run；觸及上限時中止並回報部分結果，結束碼以 `exit code 2` 這個字樣寫出（三種語言相同，第 1 條的檢查依賴它）。
5. `make readme-sync` 的 exit code 為 0。
6. `git diff --name-only 0262513..HEAD`（`0262513` 為 Story 10 的實作 commit）只列出 `README.md`、`README.zh-TW.md`、`README.ja.md`，以及本 Story 檔 `specs/stories/11-eval-parameters-live-in-makefile.md`。
7. `make verify` 通過（exit code 0）。
