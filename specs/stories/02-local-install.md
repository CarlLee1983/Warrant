# 02 Local install

上層規格：CarlLee1983/Warrant#1。依賴：01。

## Goal

讓擁有者的 Claude Code 在使用者層級從 GitHub 安裝 Warrant plugin，且「實作一個 Story」只剩 Warrant 一個入口。

## Out of Scope

- 修改任何採用端 repo 的 AGENTS.md 或 Story。
- loop-apidoc 中與 `story-development` 無關的任何變更。
- 發佈版本號或 tag。

## Acceptance Criteria

1. `/plugin marketplace add CarlLee1983/Warrant` 與 `/plugin install` 成功，Warrant 以使用者層級安裝。
2. 在任一目錄開新 session，skill 清單包含 Warrant skill。
3. 同一份 skill 清單不再包含 `loop-apidoc:story-development`。
4. 移除 `loop-apidoc:story-development` 的變更在 loop-apidoc repo 內，經擁有者另行核准後完成，且 loop-apidoc 自己的驗證指令通過。
