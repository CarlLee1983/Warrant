# Warrant

[English](README.md) | [繁體中文](README.zh-TW.md) | **日本語**

Warrant は、AI エージェントの作業を人間が承認した意図の範囲内に収め、リポジトリ自身の検証結果によって完了を証明し、最後に人間のレビューへ引き渡します。提供するのはルールだけです。Claude Code の skill が一つ、どのエージェントにも貼り付けられる `AGENTS.md` 用ブロックが一つ、Story テンプレートが一つ。スクリプト、CLI、パッケージはありません。ウェブサイト：[carllee1983.github.io/Warrant](https://carllee1983.github.io/Warrant/)。

## 三つのルール

1. **意図は人間が承認する**：作業は `specs/stories/<slug>.md` の Story から始まります。Story は Goal（目標）、Out of Scope（対象外）、Acceptance Criteria（受け入れ条件）の 3 つのセクションだけで構成されます。人間がデフォルトブランチに commit したとき、または現在のセッションで明示的に割り当てたときにのみ承認済みとみなされます。
2. **完了は証拠で証明する**：完了を決めるのは、リポジトリが `AGENTS.md` で宣言した唯一の検証コマンドだけです。すべての受け入れ条件は実際の観察に対応していなければなりません。
3. **エージェントは基準を書き換えない**：要件を変えない、受け入れ条件を緩めない、スコープを広げない。Story の範囲外の作業が必要になったら、エージェントは止まって報告します。

エージェントは最後に 3 つのセクションからなる完了報告を提出します。受け入れ条件ごとの証拠、スキップまたはブロックされたチェック、残存リスクです。合格を示す証拠のない条件が一つでもあれば、結論は「一部完了」です。

Warrant は「どの作業をするか」を決めず、人間のレビュー方法も規定しません。強制力は導入側の CI と人間のレビューから生まれます。理由は [ADR-0001](docs/adr/0001-enforcement-delegated-to-adopters.md) を参照してください。

## インストール（Claude Code）

```text
/plugin marketplace add CarlLee1983/Warrant
/plugin install warrant@warrant
```

## インストール（Codex）

```text
codex plugin marketplace add CarlLee1983/Warrant
codex plugin add warrant@warrant
```

## 導入

1. [`plugin/skills/warrant/agents-block.md`](plugin/skills/warrant/agents-block.md) をリポジトリの `AGENTS.md` に貼り付け、唯一の検証コマンドを記入します。
2. その検証コマンドを CI ですべての PR に対して実行します。Warrant はこれを強制しませんが、ルール 2 の強制力はこれに依存します。
3. [`plugin/skills/warrant/story-template.md`](plugin/skills/warrant/story-template.md) の形に沿って、`specs/stories/` の下に Story を書きます。

その他のエージェント（Cursor、Copilot、Gemini CLI など）：[docs/agents.md](docs/agents.md) を参照してください。

エージェント自身に Warrant をインストールさせるには、次のプロンプトを貼り付け、プレースホルダーを検証コマンドに置き換えてください。エージェントはこのリポジトリの最新リリースに添付された手順に従うので、コミットする前に、エージェントが一覧にしたファイルを確認してください。

```text
Install Warrant (https://github.com/CarlLee1983/Warrant) in this repository.
Read https://github.com/CarlLee1983/Warrant/releases/latest/download/agents.md
and follow its "Instructions for agents" section exactly.
Verification command: <verification command>
```

PraxisBound からの移行：PraxisBound がインストールしたプロトコルファイルとマーカーファイルを削除し、代わりに Warrant のブロックを貼り付けます。既存のディレクトリ形式の Story はそのまま残し、過去の記録として扱います。

## ドキュメント

- [CONTEXT.md](CONTEXT.md)：用語集
- [docs/adr/](docs/adr/)：アーキテクチャ決定記録
- [specs/stories/](specs/stories/)：Warrant 自身の Story

## 検証

```sh
make verify
```

`claude plugin validate --strict` で marketplace、plugin 設定、skills を順に検証し、続いて Markdown の lint を実行します。その前に、`README.zh-TW.md` と `README.ja.md` が `README.md` と同じ構造を保っているかを確認します。`##` 見出しの数、コードブロックの内容、リンク先、段落の数、リスト項目の数がすべて一致している必要があります。訳文の意味は確認しません。

plugin 本体は `plugin/` にあり、marketplace はそこだけを指しているため、インストール内容に `evals/` は含まれません。

## 振る舞いの評価（eval）

```sh
make eval
```

`claude plugin eval` で `evals/cases/` の各シナリオを実行します。このディレクトリの各サブディレクトリが一つのシナリオです。各シナリオは複数回実行され、合格した回数がしきい値に達すれば、そのシナリオは合格です。各シナリオの実行回数、合格のしきい値、費用上限、並列数は [Makefile](Makefile) の `eval` target で定義されています。Claude Code の認証情報を使い、実行のたびにモデル費用が発生するため、CI では実行せず、`make verify` にも含まれません。費用上限は `make eval` の実行全体（全シナリオと繰り返し回数の合計）に適用されます。上限は各 run の開始前に確認されるため、実際の費用は実行中の run の分だけ上限を超えることがあります。上限に達すると中止して途中までの結果を報告し、exit code 2 で終了します。結果は git が無視する `evals/results/` に書き出されます。

各シナリオの fixture は、テスト対象 plugin の `skills/warrant/agents-block.md` から `AGENTS.md` を生成し、検証コマンドだけを記入します。`evals/mutant/` は指示を反転させた plugin のコピーです。その skill とブロックは「止まって承認を待つ」「スコープの衝突では止まる」「推論は観察ではない」の 3 つのルールを正反対の明示的な指示に書き換えており、それ以外は `plugin/` と同一です。grader が正誤を区別できることを示すために使います。次のように実行します。

```sh
make eval EVAL_PLUGIN=evals/mutant
```

このとき、シナリオ 03、05、09 はしきい値を下回るはずです。

## ライセンス

[MIT](LICENSE)
