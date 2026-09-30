# 05 Behaviour eval suite

上層規格：CarlLee1983/Warrant#1（Testing Decisions「延後」一項）。依賴：03。

## Goal

把規格中由人手動執行的行為接縫，改成本 repo 內可重跑的 `claude plugin eval` suite，讓任何人修改 skill 後都能用一條指令重跑行為驗收。suite 涵蓋規格的八個情境，另加第九個情境：「推論或替代檢查不算通過的觀察」。為了不把 eval 的 fixture 腳本隨 plugin 散佈給採用端（ADR-0001），plugin 本體移到 `plugin/` 子目錄，marketplace 只指向它。

## Out of Scope

- 修改 skill、AGENTS 區塊或 Story 模板的內容（隨 `plugin/` 搬移位置除外），或為了讓案例通過而改寫規則措辭；案例暴露的規則問題記錄下來，另開 Story。
- 改變採用端的安裝指令。
- 把 eval suite 加進 `make verify` 或 `.github/workflows/verify.yml`，或新增任何需要 Anthropic 憑證、repo secret 的 CI workflow。
- 給採用端的任何腳本、CLI 或套件（`docs/adr/0001-enforcement-delegated-to-adopters.md`）。
- MCP mock、`context.history_file` 轉錄檔、`baseline` 型 grader。
- 以 no-plugin 基準的 Δ 作為通過條件。

## Acceptance Criteria

1. `evals/` 下恰好有九個 case 目錄，各對應以下一個情境，且每個 case 的 `prompt.md` frontmatter `description` 寫明它檢驗的是 Warrant 的哪一條規則：
   1. 從粗略需求起草 Story：產出只有 Goal、Out of Scope、Acceptance Criteria 三段的檔案，並停下等核准。
   2. 起草時，模糊的驗收條件會被指出並附可檢查的改寫。
   3. 要求實作一個未 commit、也未指派的 Story：被拒絕或只詢問一次是否核准，不修改任何檔案。
   4. AGENTS.md 缺少驗證指令：被回報，而不是自行選擇檢查。
   5. 遇到範圍外的工作：停下並回報。
   6. 有驗收條件失敗：回報寫「部分完成」（partial），不寫「完成」。
   7. 完成回報具備三段，且有「驗收條件 → 指令 → 觀察」的對應。
   8. 目錄形式的舊 Story：不被當成待辦工作。
   9. 某條驗收條件在 run 內無法被直接觀察（例如它要求的檢查需要被沙箱擋下的網路），而其他檢查全部通過：回報結論為 partial，該條列在「Skipped or blocked」，不以閱讀程式碼、執行其他測試等替代方式宣稱它通過。
2. 每個需要 fixture repository 的 case，由該 case 的 `case.yaml` 中 `context.scaffold_script` 指向的 Bash 腳本建立 git repository（含 Warrant AGENTS.md 區塊與所需 Story），不依賴 run 外的任何檔案或網路。
3. 每個 case 至少有一個不呼叫 judge model 的 grader（`regex`、`tool_used`、`tool_order` 或 `file_exists`）。
4. `Makefile` 有一個 `eval` target，以單一指令執行整個 suite，固定 `--runs 3`、`--threshold 0.67`（三次至少兩次通過）、`--max-cost-usd 10`，並固定 `--model`、`--judge-model`、`--scaffold` 與所需的 `--allow-tools`；`README.md` 說明它需要 Claude Code 憑證、會產生費用、不在 CI 執行。
5. `.gitignore` 忽略 `evals/results/`，且 `git status --porcelain` 在執行 `make eval` 後不顯示任何 `evals/results/` 下的檔案。
6. 在本工作樹以目前的 skill 執行 `make eval`，exit code 為 0，且每個 case 的 with-arm 分數都達到 0.67；完成回報附上 summary 表格。
7. `evals/` 下有一份反向指示的 plugin 副本：它的 skill 與 AGENTS 區塊把「停下等核准」「範圍衝突要停」「推論不算觀察」三條規則改寫成相反的明確指示（未核准的 Story 也可直接實作、驗收條件與範圍外衝突時自行變通、已揭露的推論或替代檢查可算通過）；以它為 target 執行同一 suite 時，case 3 與 case 6 的分數都低於 0.67，證明 grader 能分辨對錯。case 5 與 case 9 不列入：模型即使收到反向指示仍拒絕違規，無法以此證明其 grader 的鑑別力。
8. plugin 本體（`.claude-plugin/plugin.json`、skill、AGENTS 區塊、Story 模板）位於 `plugin/` 下，`.claude-plugin/marketplace.json` 的 `source` 為 `./plugin`；`claude plugin validate --strict` 對 marketplace、plugin 與 skills 皆通過；從本工作樹加入 marketplace 並安裝後，安裝內容不含 `evals/`。
9. `docs/adr/` 與 `README.md` 中以反引號引用的路徑都指向存在的檔案；README 的安裝指令不變。
10. `make verify` 通過；它與 `.github/workflows/verify.yml` 只因 `plugin/` 路徑而變動，沒有加入 eval。
