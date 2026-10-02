import type { Dictionary } from './types';
import { installCommands } from './readmeInstall';

const repo = 'https://github.com/CarlLee1983/Warrant';

export const zhTw: Dictionary = {
  localeName: '繁體中文',
  languageSwitcher: { label: '語言' },
  meta: {
    title: 'Warrant — 人核准的意圖，以證據證明的完成',
    description:
      '給 AI coding agent 的規則：工作從人核准的 Story 開始，只有 repo 自己的驗證指令證明了，才算完成。',
    ogImageAlt: 'Warrant：人核准的意圖，以證據證明的完成。',
  },
  hero: {
    title: '你的 agent 說做完了。拿出證據。',
    subtitle: '人核准的意圖，以證據證明的完成。',
    lede: 'Warrant 是給 AI coding agent 的一套規則。工作從人核准的 Story 開始；只有 repo 自己的驗證指令說通過了才算完成，而且每條驗收條件都要對應到證據。',
    primaryCta: { label: '前往 GitHub', href: repo },
    secondaryCta: { label: '在 GitHub 加星', href: repo },
    installLabel: '在 Claude Code 安裝',
    installCommands,
    copy: '複製',
    copied: '已複製',
    imageAlt: '一份以紅色封蠟封印的核准文件，文件的行延伸進一個終端機視窗，最後以勾號作結。',
  },
  problem: {
    title: 'Agent 很有自信。自信不是證據。',
    items: [
      {
        title: '提早宣告勝利',
        body: '「測試全部通過」——其實沒跑，或是悄悄跳過了失敗的那一個。',
      },
      {
        title: '擴大範圍',
        body: '一行就能修好的問題，附上一整包沒人要求的重構。',
      },
      {
        title: '臨時改標準',
        body: '需求做不到時，被改寫的是需求，而不是程式碼。',
      },
    ],
    imageAlt: '一隻機械手替自己的文件蓋章，留下中空而碎裂的印痕，紙張越過地上的界線飄散。',
  },
  rules: {
    title: '三條規則',
    items: [
      {
        title: '意圖由人核准',
        body: '工作從 Story 開始，它只有三段：目標、範圍外、驗收條件。只有在人把它 commit 進主分支，或在當次對話中明確指派時才算數。',
        imageAlt: '一隻人的手把封蠟印章蓋在分成三段的文件上。',
      },
      {
        title: '完成由證據證明',
        body: '完成與否只由 AGENTS.md 宣告的唯一驗證指令決定。每條驗收條件都要對應到一次觀察：一條指令和它的輸出，或一個 file:line。',
        imageAlt: '帳簿上的每一行以細線連到從終端機吐出的收據，上方有一支放大鏡。',
      },
      {
        title: 'agent 不得改寫標準',
        body: '不改需求、不放寬驗收條件、不擴大範圍。需要做 Story 範圍外的事，agent 就停下來回報。',
        imageAlt: '封印的文件與尺放在玻璃鐘罩內，拿著鉛筆的機械手在罩外碰不到。',
      },
    ],
  },
  flow: {
    title: '一份 Story 怎麼走完',
    diagramLabel: '流程：Story、agent 工作、驗證指令、完成回報。',
    nodes: [
      { title: 'Story', body: '目標、範圍外、驗收條件——由人 commit。' },
      { title: 'agent 工作', body: '只在 Story 的範圍內，不多做。' },
      { title: '驗證指令', body: 'AGENTS.md 宣告的那唯一一條指令。' },
      {
        title: '完成回報',
        body: '每條驗收條件的證據、跳過的檢查、殘餘風險。任何一條沒證明，結論就是「部分完成」。',
      },
    ],
  },
  adopt: {
    title: '兩步驟導入',
    steps: [
      { title: '安裝 plugin', body: '在 Claude Code 輸入兩條指令（見上方）。' },
      {
        title: '貼上區塊，宣告你的驗證指令',
        body: '把 agents-block.md 貼進你的 AGENTS.md，填入唯一的驗證指令，並在每個 pull request 的 CI 執行它。Claude 以外的 agent 只需要這一步。',
        link: {
          label: 'agents-block.md',
          href: `${repo}/blob/main/plugin/skills/warrant/agents-block.md`,
        },
      },
    ],
    guide: { label: '閱讀完整說明', href: `${repo}/blob/main/README.zh-TW.md` },
  },
  why: {
    title: '是規則，不是工具',
    body: 'Warrant 不發佈腳本、CLI 或檢查器。skill 只是建議，agent 可以不理會。真正擋下錯誤變更的，是你的 CI 執行驗證指令，以及讀完成回報的人。Warrant 讓這份審查有固定的形狀：每條驗收條件都對應到觀察，否則回報就寫「部分完成」。',
    link: {
      label: '為什麼這樣決定（ADR-0001）',
      href: `${repo}/blob/main/docs/adr/0001-enforcement-delegated-to-adopters.md`,
    },
    imageAlt: '封印的規則書擺在一排檢查關卡前，最後一道關卡有人在審閱文件。',
  },
  footer: {
    links: [
      { label: 'GitHub', href: repo },
      { label: 'Releases', href: `${repo}/releases` },
      { label: 'MIT 授權', href: `${repo}/blob/main/LICENSE` },
    ],
  },
};
