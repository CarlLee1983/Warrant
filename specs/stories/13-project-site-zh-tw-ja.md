# 13 Project site: Traditional Chinese and Japanese pages

依賴：12。

## Goal

為推廣站加上繁體中文（`/zh-tw/`）與日文（`/ja/`）頁面，讓非英語讀者讀到與英文版結構相同的內容。三個語系頁共用 Story 12 的模板與圖片，只多出兩份語系字典。頁首加上語言切換器，各頁以 `hreflang` 互相宣告，不依瀏覽器語言自動導向。術語沿用既有的譯法：繁中依 `CONTEXT.md`，日文依 `README.ja.md`，讓同一個專案不出現兩套譯名。

## Out of Scope

- 修改三份 README。
- 新增或替換圖片；三個語系共用 Story 12 的七張圖。
- 第四種語言。
- 依 `Accept-Language` 或 `navigator.language` 自動導向或提示。
- 修改頁面段落結構或英文文案。
- 修改 `plugin/`、`Makefile`、`.github/`、`CONTEXT.md` 或 `docs/adr/`。

## Acceptance Criteria

1. `site/src/i18n/` 下有繁中與日文字典，型別與英文字典相同；`npm --prefix site run check` 通過。拿掉任一字典中的任一 key 後，check 會失敗。
2. `site/dist/zh-tw/index.html` 的 `<html>` 帶有 `lang="zh-Hant-TW"`，`site/dist/ja/index.html` 帶有 `lang="ja"`。
3. 這兩頁與 `site/dist/index.html` 的段落 id 序列相同：以 Story 12 第 4 條的 `grep` 分別抽出後兩兩 `diff`，無輸出。
4. 這兩頁顯示的安裝指令與 `README.md` 第 19–20 行完全相同。
5. 三個語系頁各有四個 `<link rel="alternate">`，`hreflang` 分別為 `en`、`zh-Hant-TW`、`ja`、`x-default`，指向對應頁的絕對網址；`x-default` 指向 `https://carllee1983.github.io/Warrant/`。
6. 三個語系頁的頁首都有語言切換器，連到三個語系頁；目前所在的語系帶有 `aria-current="page"`。
7. `grep -rEn 'navigator\.language|Accept-Language' site/src site/dist` 無輸出。
8. 繁中頁使用 `驗收條件`、`驗證指令`、`完成回報`、`部分完成`：以 `grep -c` 檢查，四個詞在 `site/dist/zh-tw/index.html` 中都出現至少一次。
9. 日文頁使用 `受け入れ条件`、`検証コマンド`、`完了報告`、`一部完了`：以 `grep -c` 檢查，四個詞在 `site/dist/ja/index.html` 中都出現至少一次。
10. 日文頁含平假名或片假名：`grep -cP '[\p{Hiragana}\p{Katakana}]' site/dist/ja/index.html` 大於 0。
11. 三個語系頁的 `og:image` 指向同一個網址，`og:locale` 分別為 `en_US`、`zh_TW`、`ja_JP`。
12. 以 375px 寬的視窗開啟繁中與日文頁，`document.documentElement.scrollWidth` 都不大於 375（以 Playwright 觀察）。
13. 合併到 `main` 且 `pages.yml` 執行完畢後，`https://carllee1983.github.io/Warrant/zh-tw/` 與 `https://carllee1983.github.io/Warrant/ja/` 以 `curl -s -o /dev/null -w '%{http_code}'` 都輸出 `200`。
14. `git diff --name-only main...HEAD` 只列出 `site/src/` 下的檔案，以及本 Story 檔 `specs/stories/13-project-site-zh-tw-ja.md`。
15. `make verify` 通過（exit code 0）。
