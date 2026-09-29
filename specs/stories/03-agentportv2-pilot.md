# 03 AgentPortV2 pilot

上層規格：CarlLee1983/Warrant#1。依賴：02。

## Goal

把 AgentPortV2 從 PraxisBound 遷移到 Warrant，並在它身上跑一次完整的「起草 → 核准 → 實作 → 完成回報」，以真實 session 驗證 Warrant 的規則可用。

## Out of Scope

- 遷移 CMGMcp、loop-apidoc、Dbcli。
- 把 AgentPortV2 既有的目錄形式 Story 轉成新格式。
- 修改 AgentPortV2 AGENTS.md 中「選擇工作」的段落（目前第 10–19 行）。
- 修改 Warrant 本身；試點暴露的問題記錄下來，交給 04 處理。

## Acceptance Criteria

1. AgentPortV2 的 AGENTS.md 中 PraxisBound 流程段落（目前第 26–132 行）已換成 Warrant 區塊，並宣告驗證指令 `make verify`。
2. `specs/.praxisbound-adoption` 與 `specs/stories/_template/` 已移除。
3. `guidance/` 下每份檔案的去留都經擁有者逐份決定，結果記錄在試點 PR 描述中。
4. AgentPortV2 有一個在 PR 上執行 `make verify` 的 workflow，且在試點 PR 上通過。
5. 既有 Story `APV2-001-praxisbound-adoption/` 保持原樣。
6. 在裝好 Warrant 的真實 session 中依序執行規格的八個行為情境，每個情境的預期結果都成立；每個情境的操作與觀察記錄在試點 PR 描述中。
7. 試點中至少一個 Story 走完整個流程，其完成回報具備三段格式並放在 PR 描述。
8. 試點中發現的規則不清之處列成清單，附在 PR 描述中；沒有發現則明寫「無」。
