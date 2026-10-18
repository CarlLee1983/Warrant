# Warrant

[English](README.md) | [繁體中文](README.zh-TW.md) | **日本語**

Warrant は、AI エージェントの作業を人間が承認した意図の範囲内に収め、リポジトリ自身の検証結果によって完了を証明し、最後に人間のレビューへ引き渡します。提供するのはルールだけです。Claude Code の skill が一つ、どのエージェントにも貼り付けられる `AGENTS.md` 用ブロックが一つ、Story テンプレートが一つ。スクリプト、CLI、パッケージはありません。ウェブサイト：[carllee1983.github.io/Warrant](https://carllee1983.github.io/Warrant/)。

## 三つのルール

1. **意図は人間が承認する**：作業は `specs/stories/<slug>.md` の Story から始まります。Story は Goal（目標）、Out of Scope（対象外）、Acceptance Criteria（受け入れ条件）の 3 つのセクションだけで構成されます。人間がデフォルトブランチに commit したとき、または現在のセッションで明示的に割り当てたときにのみ承認済みとみなされます。
2. **完了は証拠で証明する**：宣言された検証コマンドが最終作業ツリーで成功し、今回の納品条件すべてに合格を示す観察が必要です。起草時から commit 前に検査できる条件にし、staged、unstaged、untracked の変更を含めます。
3. **エージェントは基準を書き換えない**：要件を変えない、受け入れ条件を緩めない、スコープを広げない。Story の範囲外の作業が必要になったら、エージェントは止まって報告します。

エージェントは Evidence、Skipped or blocked、Residual risks の 3 セクションで報告します。Evidence には `Warrant-Result: <result>; reasons=<reasons>; followups=<followups>` をちょうど 1 行含めます。`complete` は今回の作業ツリーの納品が証明されたことだけを意味し、commit、push、CI、merge、deploy の成功を意味しません。今回の条件の証拠不足、検証のブロック、ユーザーによるチェック省略は `partial` です。

Story の Acceptance Criteria 内には、実際に `commit`、`push`、`ci`、`merge`、`deploy` を待たなければ観察できないチェック用に、任意の Follow-up verification 小節を設けられます。各項目に発動段階、検査方法、期待する観察、引き継ぎ手順を記し、実装前に Story とともに承認を受けます。実装要件と未分類の条件は今回の納品条件のままです。承認済みでまだ発動していない後続チェックは、引き継ぎ手順とともに Skipped or blocked に記載し、それだけでは一部完了になりません。発動後の未実行やブロックは `partial`、既知の失敗は `partial` と `verification-failed` です。失敗、ブロック、省略、未観察の条件を事後に後続チェックへ変更したり、宣言された検証コマンドを延期したりしてはいけません。

承認済み Story の範囲では、まず動作を所有する型・インターフェース・モジュールで誤りを防ぎ、次に実行可能なチェックを使い、残る判断には簡潔な文章と人間の決定を用います。再現可能な不具合は、起草時に許可されない動作と許可される動作を観察可能に定義します。承認済みの実装では、保持するチェックが隔離コピーや fixture で既知の誤りを拒否し、宣言された検証経路で正しい動作を受け入れることを実際に観察します。有効な既存チェックは再利用します。この優先順位は、すべての作業にリファクタリングやテスト追加を求めるものではありません。承認済みの範囲や受け入れ基準の変更には人間の承認が必要です。繰り返される指摘が Story 外の改善を示す場合は、証拠を添えた提案として人間の選択に委ね、自動的に次の作業にはしません。

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

## インストールと更新（Skills CLI）

[Skills CLI](https://github.com/vercel-labs/skills) で Warrant スキルをインストールします：

```sh
npx skills add https://github.com/CarlLee1983/Warrant/tree/main/plugin/skills/warrant --skill warrant
```

Skills CLI でインストールした既存のスキルを更新します：

```sh
npx skills update warrant
```

スキルのインストール後、下の「導入」の手順に従ってリポジトリを設定してください。

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

plugin の更新は手動で貼り付けた `AGENTS.md` ブロックを更新せず、古い Story を再承認もしません。既存ブロックを更新するときは Warrant ブロックだけを新版に置き換え、リポジトリの既存の検証コマンドと無関係なルールをすべて維持します。Story の変更は実装前に人間のレビューと承認を受けてください。

## ドキュメント

- [CONTEXT.md](CONTEXT.md)：用語集
- [docs/adr/](docs/adr/)：アーキテクチャ決定記録
- [specs/stories/](specs/stories/)：Warrant 自身の Story

## 検証

```sh
make verify
```

`claude plugin validate --strict` で marketplace、plugin 設定、skills を順に検証し、続いて Markdown の lint を実行します。その前に、`README.zh-TW.md` と `README.ja.md` が `README.md` と同じ構造を保っているかを確認します。明示的な対応表で各言語の `##` 見出しを照合して順序を検査し、各セクションと冒頭部分についてコードブロック、リンク先、段落数、リスト項目数を比較します。また、`make readme-sync-test` で隔離された回帰テストを実行します。訳文の意味や同じセクション内の段落順序は確認せず、構造上の特徴が同じ文字列の置き換えも検出できません。

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

構造化された結果で完了理由を集計できますが、結果の統計や完了率の上昇は品質改善の因果的証拠ではありません。eval ケースの静的チェックはエージェントの実際の振る舞いを証明しません。

## ライセンス

[MIT](LICENSE)
