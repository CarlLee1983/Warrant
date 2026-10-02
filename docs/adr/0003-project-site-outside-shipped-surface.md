---
status: accepted
---

# 推廣站以 Astro 建置，不屬於發佈給採用端的表面

推廣站放在 `site/`，以 Astro 加 npm 依賴建置，並納入驗證指令。這看似違反 ADR 0001「只發佈規則、不發佈套件」，但 ADR 0001 約束的是採用端取得的東西，而 marketplace 只把 `./plugin` 安裝給採用端，`site/` 從不會到達採用端。曾考慮不經建置的三份手寫 HTML：零依賴，但三語結構會各自漂移，需另寫一支結構比對檢查；Astro 以單一模板加型別化字典從寫法上保證三語結構一致，總複雜度較低。

**Falsified if:** `.claude-plugin/marketplace.json` 的 plugin `source` 涵蓋到 `site/`，或 `plugin/` 下任何檔案引用 `site/` 的內容。屆時推廣站已成為採用端表面的一部分，須回到 ADR 0001 重新判斷。
