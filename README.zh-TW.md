# Warrant

[English](README.md) | **繁體中文** | [日本語](README.ja.md)

Warrant 讓 AI agent 的工作以人核准的意圖為界線，以 repo 自己的驗證結果證明完成，最後交給人審查。它只有規則：一份 Claude Code skill、一段可貼進任何 agent 的 `AGENTS.md` 區塊、一份 Story 模板。沒有腳本、CLI 或套件。網站：[carllee1983.github.io/Warrant](https://carllee1983.github.io/Warrant/)。

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

1. 把 [`plugin/skills/warrant/agents-block.md`](plugin/skills/warrant/agents-block.md) 貼進 repo 的 `AGENTS.md`，填入唯一的驗證指令。
2. 讓該驗證指令在 CI 的每個 PR 上執行。Warrant 不強制這一點，但規則二的強制力靠它。
3. 以 [`plugin/skills/warrant/story-template.md`](plugin/skills/warrant/story-template.md) 為形狀，在 `specs/stories/` 下寫 Story。

其他 agent（Codex、Cursor、Copilot、Gemini CLI 等）：見 [docs/agents.md](docs/agents.md)。

想讓 agent 自行安裝 Warrant，就把下面這段 Prompt 貼給它，並把佔位字換成你的驗證指令。agent 會遵循從本 repo `main` 分支即時取得的指示；commit 前請審查它列出的檔案。

```text
Install Warrant (https://github.com/CarlLee1983/Warrant) in this repository.
Read https://raw.githubusercontent.com/CarlLee1983/Warrant/main/docs/agents.md
and follow its "Instructions for agents" section exactly.
Verification command: <verification command>
```

從 PraxisBound 遷移：刪除 PraxisBound 安裝的協定檔案與標記檔，改貼 Warrant 區塊。既有的目錄形式 Story 原樣保留，視為歷史紀錄。

## 文件

- [CONTEXT.md](CONTEXT.md)：詞彙表
- [docs/adr/](docs/adr/)：架構決策
- [specs/stories/](specs/stories/)：Warrant 自己的 Story

## 驗證

```sh
make verify
```

依序以 `claude plugin validate --strict` 驗證 marketplace、plugin 設定與 skills，再執行 Markdown lint。在這之前，它會先檢查 `README.zh-TW.md` 與 `README.ja.md` 是否和 `README.md` 結構一致：`##` 標題數相同、程式碼區塊完全相同、連結目標相同、段落數與清單項目數相同。它不檢查譯文的意思。

plugin 本體放在 `plugin/`，marketplace 只指向它，所以安裝內容不含 `evals/`。

## 行為驗收（eval）

```sh
make eval
```

以 `claude plugin eval` 執行 `evals/cases/` 下的每個情境，該目錄下的每個子目錄就是一個情境。每個情境會重複執行多次，通過的次數達到門檻才算過。每個情境的執行次數、通過門檻、費用上限與並行數，都定義在 [Makefile](Makefile) 的 `eval` target。它使用你的 Claude Code 憑證，每次執行都會產生模型費用，因此不在 CI 執行，也不屬於 `make verify`。費用上限涵蓋整次 `make eval`（全部情境與重複次數合計）；上限在每個 run 啟動前檢查，所以實際費用可能多出當下執行中的 run；觸及上限時會中止並回報部分結果，以 exit code 2 結束。結果寫在 `evals/results/`，已被 git 忽略。

每個情境的 fixture 都以受測 plugin 的 `skills/warrant/agents-block.md` 產生 `AGENTS.md`，只填入驗證指令。`evals/mutant/` 是反向指示的 plugin 副本：它的 skill 與區塊把「停下等核准」「範圍衝突要停」「推論不算觀察」三條規則改寫成相反的明確指示，其餘與 `plugin/` 相同，用來證明 grader 能分辨對錯：

```sh
make eval EVAL_PLUGIN=evals/mutant
```

此時情境 03、05、09 應低於門檻。

## 授權

[MIT](LICENSE)
