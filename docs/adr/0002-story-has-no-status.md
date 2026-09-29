---
status: accepted
---

# Story 不設狀態欄位

Story 沒有 `status` 或任何生命週期欄位。核准只看兩件事：Story 已被人 commit 進主分支，或人在當次對話中明確指派。加上 `status: approved` 看似合理，但它是 agent 可以自己改寫的可變狀態，會讓「人核准」退化成「檔案裡寫著核准」；前身 PraxisBound 曾花整個 Story（P0-001）移除這類狀態。

**Falsified if:** 出現一次 agent 把未核准的 Story 當成已核准並動手實作的案例。此決策依賴 `skills/warrant/story-template.md` 的欄位，以及 `skills/warrant/SKILL.md` 與 `skills/warrant/agents-block.md` 的核准規則。
