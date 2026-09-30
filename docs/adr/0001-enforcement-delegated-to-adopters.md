---
status: accepted
---

# 強制力交給採用端的 CI 與人工審查

Warrant 只發佈規則（skill、AGENTS.md 區塊、Story 模板），不發佈任何腳本、CLI、檢查器或 npm 套件給採用端。前身 PraxisBound 以約 37k 行 TypeScript 與 5.6k 行 shell 檢查「agent 有沒有照協定做」，但真正擋下錯誤的一直是採用端的 CI 與人工審查；工具只增加了採用與維護成本。我們接受 skill 只是建議、agent 可能不理會的代價，因為沒有 CI 時工具同樣擋不住 agent。

**Falsified if:** 實際使用中出現一次「完成回報缺少驗收條件對證據的對應、人工審查未發現、事後出了問題」的案例。屆時重新評估是否加入檢查腳本；重新評估不等於必然加入。此決策依賴 `plugin/skills/warrant/SKILL.md` 與 `plugin/skills/warrant/agents-block.md` 中對完成回報的規定。
