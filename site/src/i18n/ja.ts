import type { Dictionary } from './types';
import { installCommands } from './readmeInstall';

const repo = 'https://github.com/CarlLee1983/Warrant';

export const ja: Dictionary = {
  localeName: '日本語',
  languageSwitcher: { label: '言語' },
  meta: {
    title: 'Warrant — 人間が承認した意図、証拠で証明された完了',
    description:
      'AI コーディングエージェントのためのルール。人間が承認した意図に基づき、宣言された検証と受け入れ条件の証拠で今回の作業ツリーの納品完了を証明します。',
    ogImageAlt: 'Warrant：人間が承認した意図、証拠で証明された完了。',
  },
  hero: {
    title: 'エージェントは「完了」と言う。証拠を見せてもらおう。',
    subtitle: '人間が承認した意図、証拠で証明された完了。',
    lede: "Warrant は人間が承認した Story の範囲内で作業します。complete は今回の作業ツリーの納品のみを意味します。宣言された検証、今回の条件、発動済みの後続検査がすべて合格し、後続検査に既知の失敗がないことが必要です。",
    primaryCta: { label: 'GitHub で見る', href: repo },
    secondaryCta: { label: 'GitHub でスターを付ける', href: repo },
    installLabel: 'Claude Code でインストール',
    installCommands,
    copy: 'コピー',
    copied: 'コピーしました',
    imageAlt:
      '赤い封蝋で封印された承認文書。その行がターミナルウィンドウへ流れ込み、チェックマークで終わる。',
  },
  problem: {
    title: 'エージェントは自信満々。でも自信は証拠ではない。',
    items: [
      {
        title: '早すぎる勝利宣言',
        body: '「テストはすべて通りました」――実際には実行していない、あるいは失敗した一つを黙ってスキップしている。',
      },
      {
        title: 'スコープを広げる',
        body: '一行で済む修正に、誰も頼んでいないリファクタリングが付いてくる。',
      },
      {
        title: 'ゴールを動かす',
        body: '要件が難しいと、書き換えられるのはコードではなく要件のほう。',
      },
    ],
    imageAlt:
      'ロボットの手が自分の文書に判を押し、中が空でひび割れた印影を残す。紙は床の境界線を越えて散らばっている。',
  },
  rules: {
    title: '3 つのルール',
    items: [
      {
        title: '意図は人間が承認する',
        body: '作業は Story から始まります。Story は目標、対象外、受け入れ条件の 3 セクションだけ。人間が commit するか、セッション内で明示的に割り当てたときだけ有効です。',
        imageAlt: '人間の手が、3 つのセクションに分かれた文書に封蝋の印を押している。',
      },
      {
        title: '完了は証拠で証明する',
        body: '最終作業ツリーで AGENTS.md の検証コマンドを実行します。今回の納品条件すべてに commit 前の合格を示す観察が必要で、staged、unstaged、untracked の変更を含めます。',
        imageAlt: '台帳の各行が糸でターミナルから出てくるレシートとつながり、虫眼鏡が重なっている。',
      },
      {
        title: 'エージェントは基準を書き換えない',
        body: '要件を変えない、受け入れ条件を緩めない、スコープを広げない。Story の範囲外の作業が必要なら、エージェントは止まって報告します。',
        imageAlt:
          '封印された文書と定規がガラスのベルジャーの中にあり、鉛筆を持つロボットの手は外から届かない。',
      },
    ],
  },
  flow: {
    title: 'Story の流れ',
    diagramLabel: 'Story、エージェントの作業、検証コマンド、完了報告へと続く流れ。',
    nodes: [
      { title: 'Story', body: "目標、対象外、受け入れ条件。作業ツリーの検査と本当に後の段階が必要な検証の分類を、実装前に人間が承認します。事後の再分類は禁止です。" },
      { title: 'エージェントの作業', body: 'Story の範囲内だけ。それ以上はしない。' },
      { title: '検証コマンド', body: 'AGENTS.md が宣言した唯一のコマンド。' },
      {
        title: '完了報告',
        body: "証拠、省略・ブロックされた検査、残存リスクと Warrant-Result の 1 行。承認済みで未発動の後続検査は pending にできます。発動後の証拠不足は partial、既知の失敗には verification-failed が必要です。complete は commit、push、CI、merge、deploy の成功を意味しません。",
      },
    ],
  },
  adopt: {
    title: '2 ステップで導入',
    steps: [
      { title: 'プラグインをインストール', body: 'Claude Code で 2 つのコマンドを実行（上記）。' },
      {
        title: 'ブロックを貼り、検証コマンドを宣言する',
        body: 'agents-block.md を AGENTS.md に貼り付け、検証コマンドを記入して PR の CI で実行します。任意の skill がなくても、ブロックに基本の起草・報告チェックが含まれます。plugin 更新は貼り付けたブロックの更新や古い Story の再承認をしません。更新時は Warrant ブロックのみ置き換え、既存コマンドと無関係なルールを維持します。',
        link: {
          label: 'agents-block.md',
          href: `${repo}/blob/main/plugin/skills/warrant/agents-block.md`,
        },
        otherAgents: {
          label: '他のエージェントを使う場合はガイドへ（英語）',
          href: `${repo}/blob/main/docs/agents.md`,
        },
      },
    ],
    guide: { label: 'ガイドを読む', href: `${repo}/blob/main/README.ja.md` },
  },
  why: {
    title: 'ツールではなく、ルール',
    body: "Warrant が提供するのはルールだけで、スクリプト、CLI、チェッカーではありません。強制力は CI と人間のレビューにあります。今回の納品の証拠不足、検証のブロック、ユーザーによるチェック省略は partial です。構造化された結果で理由を集計できますが、品質改善の因果的証拠にはなりません。",
    link: {
      label: 'この判断の理由（ADR-0001）',
      href: `${repo}/blob/main/docs/adr/0001-enforcement-delegated-to-adopters.md`,
    },
    imageAlt:
      '封印されたルールブックの奥にチェックポイントのゲートが並び、最後のゲートで人が文書を確認している。',
  },
  footer: {
    links: [
      { label: 'GitHub', href: repo },
      { label: 'Releases', href: `${repo}/releases` },
      { label: 'MIT ライセンス', href: `${repo}/blob/main/LICENSE` },
    ],
  },
};
