# Warrant

Warrant 是一套讓 AI agent 的工作以人核准的意圖為界線、以 repo 自己的驗證結果證明完成的規則。決定「做哪件工作」不屬於本領域，那歸人或採用端自己的 tracker。

## Language

**Story**：
人核准的意圖，存成單一檔案，只有目標、範圍外、驗收條件三段。
_Avoid_: ticket、task、需求單

**驗收條件**（Acceptance Criterion）：
Story 中一句可被檢查的陳述，說明完成時必須成立的事。
_Avoid_: AC 規格、測試案例

**核准**（Approval）：
Story 已被人 commit 進主分支，或人在當次對話中對它目前的內容明確表示核准；只是要求實作一份未 commit 的 Story 不算，agent 須先問一次確認。
_Avoid_: approved 狀態、status

**採用端**（Adopter）：
在 AGENTS.md 放入 Warrant 區塊並宣告驗證指令的 repo。
_Avoid_: 安裝、installation

**驗證指令**（Verification Command）：
採用端在 AGENTS.md 宣告的唯一一條指令，其結果是完成與否的依據。
_Avoid_: make verify、gate、checker

**證據**（Evidence）：
某條驗收條件所對應的一次實際觀察：執行了什麼、看到什麼結果。
_Avoid_: 測試通過、log

**完成回報**（Completion Report）：
agent 交給人審查的三段式回報：驗收條件對應證據、跳過或被擋的檢查、殘餘風險。
_Avoid_: 摘要、handoff

**部分完成**（Partial）：
任一驗收條件缺少通過的證據時，完成回報必須採用的結論。
_Avoid_: 大致完成、基本完成

**歷史 Story**（Legacy Story）：
PraxisBound 留下的目錄形式 Story，只作紀錄，不是待辦工作。
_Avoid_: 舊工作、未完成 Story

**推廣站**（Project Site）：
以英、繁中、日三種語言向開發者介紹 Warrant 的公開網頁；它是專案的行銷資產，不是採用端會取得的規則，因此不受「只發佈規則」的限制。
_Avoid_: 官網、文件站、docs
