# Warrant

Warrant 讓 AI agent 的工作以人核准的意圖為界線，以 repo 自己的驗證結果證明完成，最後交給人審查。它只有規則：一份 Claude Code skill、一段可貼進任何 agent 的 `AGENTS.md` 區塊、一份 Story 模板。沒有腳本、CLI 或套件。

## 三條規則

1. **意圖由人核准**：工作從 `specs/stories/<slug>.md` 的 Story 開始。Story 只有目標（Goal）、範圍外（Out of Scope）、驗收條件（Acceptance Criteria）三段；只有在人把它 commit 進主分支，或在當次對話中明確指派時才算核准。
2. **完成由證據證明**：完成只由 repo 在 `AGENTS.md` 宣告的唯一驗證指令決定，每條驗收條件都要對應到一次實際觀察。
3. **agent 不得改寫標準**：不改需求、不放寬驗收條件、不擴大範圍；需要做範圍外的事就停下回報。

agent 最後交出三段式完成回報：驗收條件對應證據、跳過或被擋的檢查、殘餘風險。任何一條缺少通過的證據，結論就是「部分完成」。

Warrant 不決定「做哪件工作」，也不規範人如何審查。強制力來自採用端的 CI 與人工審查，理由見 [ADR-0001](docs/adr/0001-enforcement-delegated-to-adopters.md)。

## 安裝（Claude Code）

```text
/plugin marketplace add CarlLee1983/Warrant
/plugin install warrant@warrant
```

## 採用

1. 把 [`skills/warrant/agents-block.md`](skills/warrant/agents-block.md) 貼進 repo 的 `AGENTS.md`，填入唯一的驗證指令。
2. 讓該驗證指令在 CI 的每個 PR 上執行。Warrant 不強制這一點，但規則二的強制力靠它。
3. 以 [`skills/warrant/story-template.md`](skills/warrant/story-template.md) 為形狀，在 `specs/stories/` 下寫 Story。

非 Claude 的 agent 只需要第 1 步的區塊。

從 PraxisBound 遷移：刪除 PraxisBound 安裝的協定檔案與標記檔，改貼 Warrant 區塊。既有的目錄形式 Story 原樣保留，視為歷史紀錄。

## 文件

- [CONTEXT.md](CONTEXT.md)：詞彙表
- [docs/adr/](docs/adr/)：架構決策
- [specs/stories/](specs/stories/)：Warrant 自己的 Story

## 驗證

```sh
make verify
```

依序以 `claude plugin validate --strict` 驗證 marketplace、plugin 設定與 skills，再執行 Markdown lint。

## 授權

[MIT](LICENSE)
