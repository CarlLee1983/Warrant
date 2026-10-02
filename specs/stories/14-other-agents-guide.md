# 14 Guide for adopting Warrant with other agents

依賴：13。

## Goal

讓使用 Claude Code 以外 agent 的採用者知道怎麼採用 Warrant，並修正目前的錯誤說法。三份 README 第 30 行與推廣站三語的 `#adopt` 都寫著「Claude 以外的 agent 只需要區塊」，但對 Gemini CLI、Aider、Zed、JetBrains Junie 並不成立：前兩者預設不讀 `AGENTS.md`，後兩者會讓其他指令檔無聲蓋掉 `AGENTS.md`。

新增英文文件 `docs/agents.md`，內容分三部分：

- 一張 12 個 agent 的總表。只要貼區塊的 agent 合併成一句；需要額外步驟或有陷阱的 agent 各自說明。
- 實測只涵蓋 Claude Code 與 Codex，兩者標為 `tested`；其餘十個依官方文件標為 `documented`。
- 一段「Instructions for agents」，供 agent 自行安裝時遵循。

三份 README 加入一段簡短的安裝 Prompt。使用者把 Prompt 貼給自己的 agent，agent 就會讀取 `docs/agents.md` 並照著安裝；步驟只寫在文件裡，Prompt 本身只負責指路。驗證指令一律由人在 Prompt 中提供，agent 不得自行選擇，因為選擇驗證指令等於由 agent 定義何謂完成。區塊一律放在 `AGENTS.md`，因此 `CONTEXT.md` 對採用端的定義不變。

## Out of Scope

- 修改 `plugin/` 下任何檔案，或變更 `plugin/.claude-plugin/plugin.json` 的 `version`。
- 新增其他 agent 的 plugin manifest（例如 `.cursor-plugin/`），或修改 `.claude-plugin/marketplace.json`。
- 對 Claude Code 與 Codex 以外的 agent 做實測。
- 把實測用的 fixture 或測試腳本 commit 進 repo。
- 翻譯 `docs/agents.md`，或為它新增同步檢查。
- 推廣站新增段落、頁面或安裝 Prompt；推廣站只改 `#adopt` 第二步的那句說法與連結。
- 修改 `CONTEXT.md`、`docs/adr/`、`Makefile`、`.github/`。
- 涵蓋本 Story 列出的 12 個 agent 以外的 agent。

## Acceptance Criteria

1. `docs/agents.md` 存在，以英文寫成：`python3 -c "import re,sys;print(len(re.findall('[぀-ヿ一-鿿]',open('docs/agents.md').read())))"` 輸出 `0`。
2. `docs/agents.md` 有一張總表，剛好 12 列，各對應一個 agent：Claude Code、OpenAI Codex CLI、Cursor、GitHub Copilot、Gemini CLI、Windsurf、Cline、Aider、Amp、opencode、Zed、JetBrains Junie。每列都含以下三項：
   - 證據等級，為 `tested` 或 `documented` 其一。
   - `YYYY-MM-DD` 格式的驗證日期。
   - 至少一個指向該 agent 官方文件的 `https://` 連結，且每個連結以 `curl -sL -o /dev/null -w '%{http_code}'` 檢查都回 `200`。
3. 證據等級為 `tested` 的剛好是 Claude Code 與 OpenAI Codex CLI 兩列，其餘十列為 `documented`；文件中不出現 `PENDING`。
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
8. 文件為 Claude Code 與 Codex 寫出可重跑的實測指令。實測方式為：在一個暫時 repo 中，把區塊的驗證指令填成唯一字串 `make verify-warrant-7f3a`，再以非互動方式問 agent：「What is this repository's verification command? Reply with the command only.」。
9. 完成回報為 Claude Code 與 Codex 各附上第 8 條實測的實際指令與輸出，每個輸出都含 `make verify-warrant-7f3a`。實測用的暫時 repo 不在本 repo 內，`git status` 不出現任何相關檔案。
10. 在獨立的 `CODEX_HOME` 中，從 GitHub 來源完整跑一次 Codex 安裝：
    - `codex plugin marketplace add CarlLee1983/Warrant` 與 `codex plugin add warrant@warrant` 都成功，後者輸出含 `Installed plugin root`。
    - 之後 `codex debug prompt-input` 的輸出列出 `warrant:warrant` skill。
    - 完成回報附上這三條指令的輸出，並說明使用者 `~/.codex` 下的設定與 plugin 目錄沒有被修改。
11. `docs/agents.md` 有一個標題為「Instructions for agents」的段落，供 agent 依序執行，內容須含以下各點：
    - 驗證指令未提供、或仍是佔位字 `<verification command>` 時，停下來問人，不得自行選擇。
    - 從區塊來源 `plugin/skills/warrant/agents-block.md` 取得區塊，並填入人提供的驗證指令。
    - `AGENTS.md` 已存在時，只把區塊附加到檔尾，不改動既有內容；已含 Warrant 區塊時，停下來回報，不重複加入。
    - 依自身是哪個 agent，完成第 5 條對應的設定或檢查。
    - 會改動使用者全域設定的指令（例如安裝 plugin）只列給人執行，不自行執行。
    - 不 commit，最後列出改動的檔案交給人審查。
12. 三份 README 在 `## Adopt` 段落內、第 30 行之後，各有同一個程式碼區塊，內含同一段英文安裝 Prompt。Prompt 要求 agent 讀取 `https://raw.githubusercontent.com/CarlLee1983/Warrant/main/docs/agents.md` 並遵循其「Instructions for agents」，並含一行 `Verification command: <verification command>` 供人填寫。三份 README 的第 1–30 行除第 30 行外，內容與 `main` 相同。
13. 在一個暫時 repo 中，以 Claude Code 與 Codex 各跑兩種情境的安裝 Prompt 實測。實測時，Prompt 的 raw 網址指向本分支版本的 `docs/agents.md`。暫時 repo 一開始就有一個非空的 `AGENTS.md`。
    - **已填驗證指令**（填 `make verify-warrant-7f3a`）：`AGENTS.md` 含 Warrant 區塊與 `make verify-warrant-7f3a`，且原有內容逐字保留。
    - **未填驗證指令**（保留 `<verification command>`）：`AGENTS.md` 與實測前逐位元組相同，且 agent 的回覆提出問題、要求人提供驗證指令。
    - 完成回報附上四次實測的指令、agent 輸出，以及實測前後的 `AGENTS.md` 比對結果。
14. 三份 README 第 30 行的舊句子被替換：`README.md` 的「Agents other than Claude need only the block from step 1.」、`README.zh-TW.md` 的「非 Claude 的 agent 只需要第 1 步的區塊。」、`README.ja.md` 的「Claude 以外のエージェントに必要なのは、手順 1 のブロックだけです。」都不再出現。三份的第 30 行各有一句各自語言的說明，並連到 `[docs/agents.md](docs/agents.md)`；`make readme-sync` 的 exit code 為 0。
15. 推廣站三份字典的 `#adopt` 第二步不再宣稱 Claude 以外的 agent 只需要這一步：`grep -rnE 'other than Claude|Claude 以外' site/src` 無輸出。`site/dist/index.html`、`site/dist/zh-tw/index.html`、`site/dist/ja/index.html` 都含有連到 `https://github.com/CarlLee1983/Warrant/blob/main/docs/agents.md` 的連結。
16. `AGENTS.md` 的 Local constraints 寫明 `docs/agents.md` 只以英文撰寫、不翻譯。
17. `git diff --name-only main...HEAD` 只列出以下檔案：`docs/agents.md`、三份 README、`AGENTS.md`、`site/src/` 下的檔案、本 Story 檔 `specs/stories/14-other-agents-guide.md`。
18. `make verify` 通過（exit code 0）。
