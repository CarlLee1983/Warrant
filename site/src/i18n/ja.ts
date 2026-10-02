import type { Dictionary } from './types';
import { installCommands } from './readmeInstall';

const repo = 'https://github.com/CarlLee1983/Warrant';

export const ja: Dictionary = {
  localeName: '日本語',
  languageSwitcher: { label: '言語' },
  meta: {
    title: 'Warrant — 人間が承認した意図、証拠で証明された完了',
    description:
      'AI コーディングエージェントのためのルール。作業は人間が承認した Story から始まり、リポジトリ自身の検証コマンドが証明したときだけ完了とみなされます。',
    ogImageAlt: 'Warrant：人間が承認した意図、証拠で証明された完了。',
  },
  hero: {
    title: 'エージェントは「完了」と言う。証拠を見せてもらおう。',
    subtitle: '人間が承認した意図、証拠で証明された完了。',
    lede: 'Warrant は AI コーディングエージェントのためのルールです。作業は人間が承認した Story から始まり、リポジトリ自身の検証コマンドが通ったときだけ完了となります。すべての受け入れ条件は証拠に対応していなければなりません。',
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
        body: '完了を決めるのは AGENTS.md が宣言した唯一の検証コマンドだけ。すべての受け入れ条件は観察に対応します：コマンドとその出力、または file:line。',
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
      { title: 'Story', body: '目標、対象外、受け入れ条件――人間が commit する。' },
      { title: 'エージェントの作業', body: 'Story の範囲内だけ。それ以上はしない。' },
      { title: '検証コマンド', body: 'AGENTS.md が宣言した唯一のコマンド。' },
      {
        title: '完了報告',
        body: '受け入れ条件ごとの証拠、スキップしたチェック、残存リスク。証明されていないものが一つでもあれば「一部完了」。',
      },
    ],
  },
  adopt: {
    title: '2 ステップで導入',
    steps: [
      { title: 'プラグインをインストール', body: 'Claude Code で 2 つのコマンドを実行（上記）。' },
      {
        title: 'ブロックを貼り、検証コマンドを宣言する',
        body: 'agents-block.md を AGENTS.md に貼り付け、唯一の検証コマンドを記入します。そのコマンドをすべての pull request の CI で実行してください。',
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
    body: 'Warrant はスクリプトも CLI もチェッカーも提供しません。skill は助言にすぎず、エージェントは無視できます。悪い変更を実際に止めるのは、検証コマンドを実行する CI と、完了報告を読む人間です。Warrant はそのレビューに決まった形を与えます。すべての受け入れ条件を観察に対応させる。できなければ、報告は「一部完了」になります。',
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
