# 09 README sync covers paragraphs and list items

依賴：08。

## Goal

讓 `make readme-sync` 在翻譯漏掉或多出一整段正文、或一個清單項目時失敗。Story 08 的檢查只比 `##` 標題數、程式碼區塊與連結；整段漏譯在這三種訊號下都看不出來。這個 Story 在同一個 target 裡加入兩種計數：程式碼區塊以外的正文段落數，以及清單項目數。

## Out of Scope

- 檢查譯文語意或品質；段落數相同不代表翻譯正確，語意仍靠人工審閱。
- 比對句子數或字數；不同語言的斷句與長度本來就不同。
- 檢查 `CONTEXT.md`、`docs/adr/` 或其他 Markdown 檔。
- 修改 `plugin/`、`.github/workflows/verify.yml`，或新增任何套件依賴與獨立腳本檔；檢查仍只用 POSIX shell 工具並寫在 `Makefile` 內。
- 修改三份 README 中「驗證」段落那一句以外的內容。

## Acceptance Criteria

1. 清單項目數定義為符合擴充正規表示式 `^([0-9]+\.|-)[[:space:]]` 的行數。正文段落數定義為：程式碼區塊以外，由非空行組成的連續區塊，且區塊的第一行不是標題（`#` 開頭）、不是清單項目，也不是第 3 行的語言切換列。`Makefile` 的 `readme-sync` 上方註解寫明這兩個定義。
2. 在目前的 working tree 上，`make readme-sync` 的 exit code 為 0。
3. 刪除 `README.ja.md` 中「## ライセンス」標題之前的最後一個正文段落（含其後的空行）後，`make readme-sync` 的 exit code 非 0，且輸出指出 `README.ja.md` 與 `paragraphs`；還原後恢復為 0。
4. 刪除 `README.zh-TW.md` 中任一清單項目行後，`make readme-sync` 的 exit code 非 0，且輸出指出 `README.zh-TW.md`；還原後恢復為 0。
5. 三份 README「驗證」段落中描述結構檢查的那一句（Story 08 所加），補上段落數與清單項目數；修改後第 2 條仍成立。
6. 在 `ubuntu:24.04` 容器中（CI 的 `ubuntu-latest`），第 2–4 條的結果相同。
7. `git diff --name-only ac0190b..HEAD`（`ac0190b` 為 Story 08 的實作 commit）只列出 `Makefile`、`README.md`、`README.zh-TW.md`、`README.ja.md`，以及本 Story 檔 `specs/stories/09-readme-sync-paragraphs-and-lists.md`。
8. `make verify` 通過（exit code 0）。
