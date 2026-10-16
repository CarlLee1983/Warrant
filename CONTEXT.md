# Warrant

Warrant 是一套讓 AI agent 的工作以人核准的意圖為界線、以 repo 自己的驗證結果證明完成的規則。決定「做哪件工作」不屬於本領域，那歸人或採用端自己的 tracker。

## Language

**Story**：
人核准的意圖，存成單一檔案，只有目標、範圍外、驗收條件三段。
_Avoid_: ticket、task、需求單

**驗收條件**（Acceptance Criterion）：
Story 中一句可被檢查的陳述。當次交付條件須能在未 commit 工作樹觀察，涵蓋 staged、unstaged 與 untracked 變更；未標記的條件仍屬當次交付。
_Avoid_: AC 規格、測試案例

**核准**（Approval）：
Story 已被人 commit 進主分支，或人在當次對話中對它目前的內容明確表示核准；只是要求實作一份未 commit 的 Story 不算，agent 須先問一次確認。
_Avoid_: approved 狀態、status

**採用端**（Adopter）：
在 AGENTS.md 放入 Warrant 區塊並宣告驗證指令的 repo。
_Avoid_: 安裝、installation

**驗證指令**（Verification Command）：
採用端在 AGENTS.md 宣告的唯一一條指令；最終工作樹必須實際通過，不得延後或豁免，也不能以替代檢查充當通過。
_Avoid_: make verify、gate、checker

**證據**（Evidence）：
某條驗收條件所對應的一次實際觀察：執行了什麼、看到什麼結果。
_Avoid_: 測試通過、log

**完成回報**（Completion Report）：
agent 交給人審查的三段式回報：Evidence、Skipped or blocked、Residual risks。Evidence 中恰有一行 `Warrant-Result: <result>; reasons=<reasons>; followups=<followups>`。結果統計只描述回報原因，不是品質改善的因果證據。
_Avoid_: 摘要、handoff

**部分完成**（Partial）：
當次交付條件缺少通過觀察、宣告指令未通過、環境受阻、使用者略過或 Story 矛盾時必須採用的結論。後續檢查已觸發卻未執行或受阻也為 `partial`；已知失敗須標記 `verification-failed`，不得藏成預期等待。
_Avoid_: 大致完成、基本完成

**工作樹交付完成**（Complete）：
最終工作樹的宣告驗證指令通過、所有當次交付條件及已觸發的後續檢查都有通過觀察，且無已知失敗的後續檢查。`complete` 不代表 commit、push、CI、合併或部署成功；reasons 必為 `none`。
_Avoid_: 已上線、已合併

**後續驗證**（Follow-up verification）：
Acceptance Criteria 內可選的子段落，只放真正依賴 `commit`、`push`、`ci`、`merge` 或 `deploy` 的觀察，每項須明列觸發階段、檢查方式、預期觀察與交接步驟，並隨 Story 事先經人核准。實作要求仍須在當次完成，不得事後改分類。已核准、未觸發且無已知失敗的檢查列在 Skipped or blocked，不單獨導致 `partial`；仍未完成時 followups 為 `pending`，不是通過證據。
_Avoid_: 事後豁免、先當作通過

**區塊升級**（Block upgrade）：
plugin 更新不會更新手貼的 AGENTS.md 區塊，也不會重新核准舊 Story。更新時只替換 Warrant 區塊，保留原有驗證指令及其他 repo 規則。
_Avoid_: 自動升級所有規則

**歷史 Story**（Legacy Story）：
PraxisBound 留下的目錄形式 Story，只作紀錄，不是待辦工作。
_Avoid_: 舊工作、未完成 Story

**推廣站**（Project Site）：
以英、繁中、日三種語言向開發者介紹 Warrant 的公開網頁；它是專案的行銷資產，不是採用端會取得的規則，因此不受「只發佈規則」的限制。
_Avoid_: 官網、文件站、docs
