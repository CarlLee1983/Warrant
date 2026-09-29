# 04 Release v0.1.0

上層規格：CarlLee1983/Warrant#1。依賴：03。

## Goal

依試點結果修正 skill 後發佈 Warrant v0.1.0，並同步讓 PraxisBound 明確退場。

## Out of Scope

- 遷移 CMGMcp、loop-apidoc、Dbcli。
- 刪除 PraxisBound repo 或 unpublish npm 套件（只做 deprecate 與 archive）。
- 任何 0.x 以外的相容性承諾。

## Acceptance Criteria

1. 03 列出的每一條規則不清之處，都有對應的 skill 修改，或寫明不修改的理由。
2. 修改後重跑受影響的行為情境，預期結果成立。
3. plugin 版本為 `0.1.0`，GitHub 上有 `v0.1.0` tag 與 release，發佈動作經擁有者核准。
4. PraxisBound 進行中的 TST-042 已收尾並 commit，早於下列任何退場動作。
5. PraxisBound README 頂端指向 Warrant。
6. `npm view @praxisbound/cli deprecated` 與 `npm view @praxisbound/core deprecated` 都回傳指向 Warrant 的訊息。
7. `gh repo view CarlLee1983/PraxisBound --json isArchived` 回傳 `true`。
8. 條件 5–7 的每個對外動作，執行前都取得擁有者核准。
