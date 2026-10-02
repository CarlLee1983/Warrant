# 07 Multilingual README

依賴：06。

## Goal

讓 `README.md` 以英文為主檔，另提供繁體中文與日文版本，使非中文讀者也能理解並採用 Warrant。三個版本內容對等：同樣的段落、同樣的連結與指令，彼此以語言切換列互相連結。`AGENTS.md` 的本地限制同步改寫，使 README 的語言規則與實際檔案一致。

## Out of Scope

- 翻譯或改寫 `CONTEXT.md`、`docs/adr/` 下的檔案；它們維持繁體中文。
- 修改 `plugin/` 下任何檔案，或變更 `plugin/.claude-plugin/plugin.json` 的 `version`。
- 修改 `.claude-plugin/marketplace.json` 的描述文字。
- 修改 `specs/stories/` 下既有的 Story（01–06）。
- 為多語版本新增同步檢查腳本或 CI 步驟。
- 改變 README 的內容本身（規則、安裝指令、採用步驟、eval 說明）；只做翻譯與語言切換列。

## Acceptance Criteria

1. `README.md` 以英文寫成：`grep -P '[\p{Han}\p{Hiragana}\p{Katakana}]' README.md` 只輸出一行，即第 6 條的語言切換列（其中的「繁體中文」「日本語」標籤）。
2. 存在 `README.zh-TW.md`（繁體中文）與 `README.ja.md`（日文）。`README.ja.md` 含平假名或片假名：`grep -cP '[\p{Hiragana}\p{Katakana}]' README.ja.md` 大於 0。
3. 三個檔案的 `##` 標題數量相同：`grep -c '^## ' README.md README.zh-TW.md README.ja.md` 三者數值相等。
4. 三個檔案的程式碼區塊內容完全相同：分別以 `awk '/^```/{f=!f;next} f' <file>` 抽出後兩兩 `diff` 無輸出。
5. 三個檔案的相對連結目標集合相同：分別以 `grep -oE '\]\([^)#]+\)' <file> | sort -u` 抽出，排除彼此互指的 README 連結後兩兩 `diff` 無輸出，且每個目標路徑都存在於 repo 中。
6. 三個檔案頂部（第一個 `#` 標題後、第一段正文前）各有一行語言切換列，連結到 `README.md`、`README.zh-TW.md`、`README.ja.md`。
7. `AGENTS.md` 的 Local constraints 寫明：`README.md` 為英文，`README.zh-TW.md` 與 `README.ja.md` 為其翻譯且須同步更新；`CONTEXT.md` 與 `docs/adr/` 仍為繁體中文。
8. `git diff --name-only main...HEAD` 只列出 `README.md`、`README.zh-TW.md`、`README.ja.md`、`AGENTS.md`，以及本 Story 檔 `specs/stories/07-multilingual-readme.md`。
9. `make verify` 通過（exit code 0）。
