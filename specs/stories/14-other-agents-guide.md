# 14 Guide for adopting Warrant with other agents

依賴：13。

## Goal

讓使用 Claude Code 以外 agent 的採用者知道怎麼採用 Warrant，並修正目前的錯誤說法。三份 README 第 30 行與推廣站三語的 `#adopt` 都寫著「Claude 以外的 agent 只需要區塊」，但對 Gemini CLI、Aider、Zed、JetBrains Junie 並不成立：前兩者預設不讀 `AGENTS.md`，後兩者會讓其他指令檔無聲蓋掉 `AGENTS.md`。新增英文文件 `docs/agents.md`，列出 12 個 agent 的採用方式。只要貼區塊的 agent 合併成一句；需要額外步驟或有陷阱的 agent 各自說明。Codex 可直接安裝現有 plugin，列為它的主要路線。每個 agent 標示官方文件來源、驗證日期，以及證據等級：`tested`（在本機實際執行過）或 `documented`（只依官方文件）。區塊一律放在 `AGENTS.md`，需要時設定 agent 去讀它，不另放到其他指令檔，因此 `CONTEXT.md` 對採用端的定義不變。

## Out of Scope

- 修改 `plugin/` 下任何檔案，或變更 `plugin/.claude-plugin/plugin.json` 的 `version`。
- 新增其他 agent 的 plugin manifest（例如 `.cursor-plugin/`），或修改 `.claude-plugin/marketplace.json`。
- 把實測用的 fixture 或測試腳本 commit 進 repo。
- 翻譯 `docs/agents.md`，或為它新增同步檢查。
- 推廣站新增段落或頁面；只改 `#adopt` 第二步的那句說法與連結。
- 修改 `CONTEXT.md`、`docs/adr/`、`Makefile`、`.github/`。
- 涵蓋本 Story 列出的 12 個 agent 以外的 agent。

## Acceptance Criteria

1. `docs/agents.md` 存在，以英文寫成：`python3 -c "import re,sys;print(len(re.findall('[぀-ヿ一-鿿]',open('docs/agents.md').read())))"` 輸出 `0`。
2. `docs/agents.md` 有一張總表，剛好 12 列，各對應一個 agent：Claude Code、OpenAI Codex CLI、Cursor、GitHub Copilot、Gemini CLI、Windsurf、Cline、Aider、Amp、opencode、Zed、JetBrains Junie。每列都含證據等級（`tested` 或 `documented` 其一）、`YYYY-MM-DD` 格式的驗證日期，以及至少一個指向該 agent 官方文件的 `https://` 連結。
3. 證據等級為 `tested` 的剛好是 Claude Code、OpenAI Codex CLI、Gemini CLI、Cursor、GitHub Copilot 五列，其餘七列為 `documented`。
4. 文件把 Cursor、GitHub Copilot、Windsurf、Cline、Amp、opencode 歸為「只需把區塊貼進 `AGENTS.md`」的一組，放在同一段或同一個清單中說明。
5. 文件為以下 agent 各寫一段額外步驟或警告：
   - Codex：寫出 `codex plugin marketplace add CarlLee1983/Warrant` 與 `codex plugin add warrant@warrant` 兩條指令。
   - Gemini CLI：寫出把 `AGENTS.md` 加進 `context.fileName` 的 settings.json 設定片段。
   - Aider：寫出 `read: AGENTS.md` 的 `.aider.conf.yml` 設定。
   - Zed：警告 `.rules`、`.cursorrules` 等優先順序較高的檔案存在時，`AGENTS.md` 不會被讀取。
   - JetBrains Junie：警告 `.junie/AGENTS.md` 存在時，根目錄的 `AGENTS.md` 不會被讀取。
6. 文件有一段「選用：安裝 skill」說明，須包含以下各點：
   - 這一步是選用的，只靠區塊就能套用三條規則。
   - 安裝方式是把整個 `plugin/skills/warrant/` 目錄複製成 `.agents/skills/warrant/`。
   - 必須複製整個目錄的原因：skill 會引用同目錄的 `agents-block.md` 與 `story-template.md`。
   - Cline 不讀 `.agents/skills/`，並寫出它會讀的路徑。
7. Claude Code 那列連回 `README.md` 的安裝段落，不重複寫安裝步驟。
8. 每個 `tested` 的 agent，文件都寫出可重跑的實測指令。實測的作法如下：
   - 在一個暫時 repo 中，把區塊的驗證指令填成唯一字串 `make verify-warrant-7f3a`。
   - 以非互動方式問 agent：「What is this repository's verification command? Reply with the command only.」。
   - Gemini CLI 要在文件所寫的 `context.fileName` 設定下執行。
9. 完成回報為第 3 條的五個 agent 各附上第 8 條實測的實際指令與輸出，每個輸出都含 `make verify-warrant-7f3a`。實測用的暫時 repo 不在本 repo 內，`git status` 不出現任何相關檔案。
10. 在獨立的 `CODEX_HOME` 中，從 GitHub 來源完整跑一次 Codex 安裝：
    - `codex plugin marketplace add CarlLee1983/Warrant` 與 `codex plugin add warrant@warrant` 都成功，後者輸出含 `Installed plugin root`。
    - 之後 `codex debug prompt-input` 的輸出列出 `warrant:warrant` skill。
    - 完成回報附上這三條指令的輸出，且使用者的 `~/.codex` 沒有被修改。
11. 三份 README 第 30 行的舊句子被替換：`README.md` 的「Agents other than Claude need only the block from step 1.」、`README.zh-TW.md` 的「非 Claude 的 agent 只需要第 1 步的區塊。」、`README.ja.md` 的「Claude 以外のエージェントに必要なのは、手順 1 のブロックだけです。」都不再出現。三份的同一位置各有一句各自語言的說明，並連到 `[docs/agents.md](docs/agents.md)`；`make readme-sync` 的 exit code 為 0。
12. 推廣站三份字典的 `#adopt` 第二步不再宣稱 Claude 以外的 agent 只需要這一步：`grep -rnE 'other than Claude|Claude 以外' site/src` 無輸出。`site/dist/index.html`、`site/dist/zh-tw/index.html`、`site/dist/ja/index.html` 都含有連到 `https://github.com/CarlLee1983/Warrant/blob/main/docs/agents.md` 的連結。
13. `AGENTS.md` 的 Local constraints 寫明 `docs/agents.md` 只以英文撰寫、不翻譯。
14. `git diff --name-only main...HEAD` 只列出以下檔案：`docs/agents.md`、三份 README、`AGENTS.md`、`site/src/` 下的檔案、本 Story 檔 `specs/stories/14-other-agents-guide.md`。
15. `make verify` 通過（exit code 0）。
