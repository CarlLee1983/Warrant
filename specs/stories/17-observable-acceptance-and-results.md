# 17 Observable acceptance and structured results

## Goal

回應 issue #12：讓起草時就區分未 commit 工作樹可驗證的交付條件與須等後續階段的檢查，讓完成回報的原因可辨識、可統計，同時保留人工核准、不得改寫標準、不得把未驗證說成通過的規則。

## Out of Scope

- 不新增採用端 CLI、腳本、套件或驗證框架；只修改規則、文件與既有 eval 格式的案例。
- 不追溯修改既有 Story、不讀取私人 session 或公司 repo、不重算 issue 的統計，也不宣稱完成率代表品質改善。
- 不修改驗證指令、CI/release workflow、網站功能或版面；網站只同步必要文案。
- 不執行會產生模型費用的 `make eval`；新增案例的靜態檢查不當成行為驗證通過。
- 不合併、發佈或部署；核准後的交付限於變更、驗證結果及 draft PR。

## Acceptance Criteria

1. `plugin/skills/warrant/SKILL.md` 與 `story-template.md` 保留 Goal、Out of Scope、Acceptance Criteria 三個二級章節的 Story 形狀；起草規則要求當次交付的每條條件在未 commit 工作樹可觀察，讀過引用的檔案、指出模糊或不可驗證文字並交人決定、對檔案範圍限制豁免 Story 本身，且涵蓋 staged、unstaged 與 untracked 變更，不以 `main...HEAD` 充當未 commit 變更的觀察。
2. 模板在 Acceptance Criteria 內提供可選的 Follow-up verification 子段落；每項明列 `commit`、`push`、`ci`、`merge` 或 `deploy` 的實際觸發階段、檢查方式、預期觀察與交接步驟。只有真正依賴後續階段的觀察可列在此處，實作要求仍須在當次工作樹完成。這些分類須隨 Story 事先經人核准；未標記條件仍是當次交付要求。不得事後將失敗、環境受阻、使用者略過或既有未觀察條件改列後續檢查，亦不得延後或豁免 AGENTS.md 宣告的驗證指令。
3. `plugin/skills/warrant/agents-block.md` 本身包含第 1 項的核心起草檢查與第 2 項的分類限制，使未載入 skill 的 agent 仍可遵循；根目錄 `AGENTS.md` 的 Warrant 區塊與模板一致，僅填入本 repo 的 `make verify`。
4. Skill 與區塊保留 Evidence、Skipped or blocked、Residual risks 三段完成回報。只有最後工作樹的宣告驗證指令通過且所有當次交付條件有通過觀察時，結果才可為 `complete`；環境受阻、使用者要求不跑、工作未完成、Story 矛盾或未標記的未來階段條件仍為 `partial`。事先核准且尚未到觸發時機的後續檢查列在 Skipped or blocked，附交接步驟，不單獨導致 `partial`；已觀察到的後續檢查失敗須回報 `partial` 與 `verification-failed`，不得藏成預期中的等待。觸發階段已到但仍未執行或受阻的後續檢查也須回報 `partial`，按實際原因分類，不能繼續當成預期等待。`complete` 明確僅代表工作樹交付完成，不代表 commit、push、CI、合併或部署成功。
5. 每份完成回報在 Evidence 內恰有一行 `Warrant-Result: <result>; reasons=<reasons>; followups=<followups>`，並定義固定文法：result 為 `complete` 或 `partial`；complete 的 reasons 必為 `none`，partial 必列一個以上適用原因，按 `work-incomplete,story-conflict,missing-verification-command,verification-failed,environment-blocked,user-skipped,later-phase` 順序去重、逗號分隔且無空格；followups 為 `none` 或 `pending`。原因說明須將宣告指令缺失或仍為佔位字歸為 `missing-verification-command`，並涵蓋執行失敗、無法執行與未執行的差異，列出所有已知原因；`later-phase` 指仍屬當次要求但只能稍後觀察的條件。Pending 只標示仍未完成的已核准後續檢查，不能當通過證據或暗藏已知失敗。
6. 以規則中的範例與 `evals/cases/` 既有格式覆蓋：純工作樹完成、已核准後續檢查待辦、環境受阻、使用者略過、工作未完成與環境受阻並存、Story 矛盾、未標記的 CI 條件、禁止事後改分類、缺少驗證指令、後續檢查實際失敗、觸發階段已到但尚未驗證，以及不載入 skill 的起草檢查。每例的預期結論符合第 4、5 項；`evals/mutant/` 同步非刻意反轉的規則，保留其核准、範圍與證據三種負向對照，不新增測試框架。
7. `README.md`、`README.zh-TW.md`、`README.ja.md`、`CONTEXT.md`、`docs/agents.md` 與 `site/src/i18n/en.ts`、`zh-tw.ts`、`ja.ts` 的相關文案同步新的階段與完成定義；README 三語維持既有結構同步要求，並說明結果統計不是品質改善的因果證據；升級說明指出 plugin 更新不會更新手貼區塊或重新核准舊 Story，更新區塊須保留既有驗證指令與其他 repo 規則。`plugin/.claude-plugin/plugin.json` 版本由 `0.1.3` 升至 `0.1.4`。
8. 工作樹變更僅限上述明列檔案、`evals/cases/`、`evals/mutant/` 及本 Story。以基準 commit `0280ce998e1658d9f6869688eade5d9627abd5ed` 到當前工作樹的 `git diff --name-only` 與 `git ls-files --others --exclude-standard` 聯集檢查，涵蓋已追蹤與未追蹤檔案；本 Story 明確豁免規則檔案清單限制。
9. `make verify` 在最終工作樹 exit code 0。若受環境或既有問題阻擋，保留實際失敗證據並回報 partial，不以個別檢查替代；不得為取得通過而修改驗證標準或擴大範圍。
