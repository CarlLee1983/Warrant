# 12 Project site: English landing page

依賴：11。

## Goal

建立推廣站的英文版並部署到 GitHub Pages，讓正在使用 coding agent 的開發者讀完一頁就能理解 Warrant 解決什麼問題，並照著指令安裝、採用。推廣站以 Astro 建置，放在 `site/`。它不屬於採用端會取得的表面，見 `docs/adr/0003-project-site-outside-shipped-surface.md`。頁面文案來自型別化的語系字典，i18n 路由在這個 Story 就配置好，讓 Story 13 只需補繁中與日文字典。頁面視覺使用 Codex 生成的無文字插圖；流程圖用 inline SVG。推廣站納入 `make verify`，使它的建置結果成為完成證據。

## Out of Scope

- 繁體中文與日文頁面、`hreflang`、語言切換器（Story 13）。
- 自訂網域、`CNAME`。
- 任何分析或追蹤程式碼、cookie。
- 文件頁、比較頁、FAQ 等第二個頁面。
- 手動深淺色切換。
- Dependabot 或其他依賴更新自動化。
- 修改 `plugin/` 下任何檔案，或變更 `plugin/.claude-plugin/plugin.json` 的 `version`。
- 修改 `.claude-plugin/marketplace.json`。
- 修改三份 README 中推廣站連結以外的內容。
- 修改 `.github/workflows/verify.yml`。

## Acceptance Criteria

1. `site/package.json` 以精確版本（不含 `^` 或 `~`）宣告 `astro`，且 `site/package-lock.json` 存在並被 git 追蹤。
2. Astro 設定檔中，`site` 為 `https://carllee1983.github.io`，`base` 為 `/Warrant`，i18n 的 `locales` 為 `en`、`zh-tw`、`ja`，`defaultLocale` 為 `en`，英文不加路徑前綴。
3. 頁面上所有給讀者看的文字（含圖片 `alt` 與流程圖節點標籤）都來自 `site/src/i18n/` 下的英文字典，字典的型別由一個共用型別定義。拿掉英文字典中任一 key 後，`npm --prefix site run check` 會失敗；把 key 放回去後則通過。
4. `site/dist/index.html` 的 `<html>` 帶有 `lang="en"`；其主要段落依序帶有以下 id：`hero`、`problem`、`rules`、`flow`、`adopt`、`why`、`footer`。檢查方式：`grep -oE 'id="(hero|problem|rules|flow|adopt|why|footer)"' site/dist/index.html` 依序輸出這七個。
5. `#hero` 的 `<h1>` 文字為 `Your agent says it's done. Prove it.`，副標為 `Human-approved intent, evidence-proven completion.`。
6. `#hero` 顯示的安裝指令與 `README.md` 中 `## Install (Claude Code)` 下方程式碼區塊內的兩行完全相同。旁邊有一個按鈕，在瀏覽器中點擊後，剪貼簿內容即為這兩行（以 Playwright 觀察）。
7. `#hero` 有一個連到 `https://github.com/CarlLee1983/Warrant` 的主要 CTA。`#footer` 有連到該 repo、其 Releases 頁、其 `LICENSE` 的連結。
8. `#rules` 列出與 `README.md` 第 9–11 行同名的三條規則。`#adopt` 列出兩步：安裝 plugin；把 `agents-block.md` 貼進 `AGENTS.md` 並宣告驗證指令。
9. `#why` 明確寫出 skill 只是建議、agent 可能不理會，強制力來自採用端的 CI 與人工審查，並連到 GitHub 上的 `docs/adr/0001-enforcement-delegated-to-adopters.md`。
10. `#flow` 內含一個 inline `<svg>`，依序呈現四個節點：Story、agent 工作、驗證指令、完成回報。
11. Codex 生成的插圖共七張，每張各一個圖位：hero、problem、rules 三條各一張、why、OG 分享卡。每張圖的原圖都在 `site/src/assets/images/` 下並被 git 追蹤。`git ls-files site/src/assets/images` 剛好列出這七個檔案，落選的候選圖沒有 commit。
12. `site/src/assets/PROMPTS.md` 對第 11 條的每張圖都記錄了圖位、檔名、完整提示詞與生成日期。
13. 除 OG 圖外，第 11 條的六張圖都透過 `astro:assets` 引用，`site/dist/` 內有它們轉出的 `.avif` 或 `.webp` 檔；`site/dist/index.html` 中每個 `<img>` 都有非空的 `alt`。
14. 第 11 條的七張圖都不含可辨識的文字、字母或數字。實作者逐張檢視，並把每張圖的檢視結果寫進完成回報。
15. 送到 `site/dist/` 的 OG 圖尺寸為 1200×630（以 `sips -g pixelWidth -g pixelHeight` 觀察）。`site/dist/index.html` 含有 `og:title`、`og:description`、`og:image`（絕對網址）、`twitter:card` 值為 `summary_large_image`。
16. 樣式含 `@media (prefers-color-scheme: dark)`；`grep -rn localStorage site/src` 無輸出。
17. `site/dist/` 下的 HTML 不引用任何外部 `<script src>`：`grep -rEn '<script[^>]*src="https?://' site/dist` 無輸出。
18. 以 375px 寬的視窗開啟建置後的頁面，`document.documentElement.scrollWidth` 不大於 375（以 Playwright 觀察）。
19. `Makefile` 的 `verify` 目標依賴一個 `site` 目標，該目標依序執行 `npm --prefix site ci`、`npm --prefix site run check`、`npm --prefix site run build`。
20. `.github/workflows/pages.yml` 在 `main` 的 push 觸發，`paths` 限定為 `site/**` 與它自己，另有 `workflow_dispatch`。它使用 `actions/upload-pages-artifact` 與 `actions/deploy-pages`，`permissions` 含 `pages: write` 與 `id-token: write`。
21. `.gitignore` 忽略 `site/node_modules/`、`site/dist/`、`site/.astro/`。`.markdownlint-cli2.jsonc` 的 `ignores` 涵蓋 `site/node_modules`。
22. 三份 README 在第一個 `##` 標題之前都含有連結 `https://carllee1983.github.io/Warrant/`，且 `make readme-sync` 的 exit code 為 0。
23. 合併到 `main` 且 `pages.yml` 執行完畢後，`curl -s -o /dev/null -w '%{http_code}' https://carllee1983.github.io/Warrant/` 輸出 `200`；`gh api repos/CarlLee1983/Warrant --jq .homepage` 輸出 `https://carllee1983.github.io/Warrant/`。
24. `git diff --name-only main...HEAD` 只列出 `site/` 下的檔案、`Makefile`、`.github/workflows/pages.yml`、`.gitignore`、`.markdownlint-cli2.jsonc`、三份 README，以及本 Story 檔 `specs/stories/12-project-site-english.md`。
25. `make verify` 通過（exit code 0）。
