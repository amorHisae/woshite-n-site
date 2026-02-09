# プロジェクト設定

## 基本設定
```yaml
プロジェクト名: ヲシテ文字キャラクター ブランドサイト
開始日: 2026-01-17
技術スタック:
  frontend: HTML5, CSS3, JavaScript (ES6+)
  backend: 不要（静的サイト）
  database: 不要（JSONファイル管理）
```

## 開発環境
```yaml
ポート設定:
  # 開発サーバー（ローカルプレビュー用）
  frontend: 3247

環境変数:
  設定ファイル: なし（静的サイトのため不要）
  Web3Forms APIキー: index.html内に直接記載
```

## テスト認証情報
```yaml
開発用アカウント: 不要（認証機能なし）

外部サービス:
  Web3Forms: アクセスキーを取得して設定
  Vercel: GitHubリポジトリ連携でデプロイ
```

## コーディング規約

### 命名規則
```yaml
ファイル名:
  - HTML: kebab-case.html (例: index.html)
  - CSS: kebab-case.css (例: style.css)
  - JavaScript: camelCase.js (例: main.js)
  - 画像: kebab-case.jpg/png/gif (例: header-image.jpg)

変数・関数:
  - 変数: camelCase
  - 関数: camelCase
  - 定数: UPPER_SNAKE_CASE
  - CSSクラス: kebab-case
  - CSS ID: kebab-case
```

### コード品質
```yaml
必須ルール:
  - 未使用の変数/import禁止
  - console.log本番環境禁止
  - 関数行数: 100行以下
  - ファイル行数: 700行以下
  - 複雑度: 10以下
  - 行長: 120文字

フォーマット:
  - インデント: スペース2つ
  - セミコロン: あり
  - クォート: シングル（JavaScript）
  - クォート: ダブル（HTML属性）
```

## プロジェクト固有ルール

### ファイル構成
```yaml
構成:
  project/
  ├── index.html          # メインページ
  ├── css/
  │   └── style.css       # スタイル
  ├── js/
  │   └── main.js         # JavaScript
  ├── images/
  │   ├── header/         # ヘッダー画像
  │   ├── gallery/        # ギャラリー1面目画像
  │   │   ├── back/       # ギャラリー2面目画像（タイトル+説明）
  │   │   └── woshite/    # ギャラリー3面目画像（ヲシテ文字）
  │   └── profile/        # プロフィール画像
  └── data/
      └── gallery.json    # ギャラリーデータ
```

### ギャラリー画像管理
```yaml
追加方法:
  1. images/gallery/ に1面目画像を配置
  2. images/gallery/back/ に2面目画像を配置（タイトル＋説明の画像）
  3. images/gallery/woshite/ に3面目画像を配置（ヲシテ文字タイトル画像）
  4. data/gallery.json に情報を追記

JSONフォーマット:
  {
    "items": [
      {
        "imagePath": "images/gallery/arigatou.jpg",
        "backImagePath": "images/gallery/back/arigatou.jpg",
        "woshiteImagePath": "images/gallery/woshite/arigatou.jpg",
        "title": "ありがとう",
        "description": "感謝の気持ちを込めたキャラクター"
      }
    ]
  }

注意:
  - backImagePath, woshiteImagePath は省略可（テキスト表示にフォールバック）
  - 3面フリップ: 1面=キャラ画像 → 2面=タイトル+説明 → 3面=ヲシテ文字
```

### セクション構成
```yaml
セクション:
  - header: ヘッダー画像
  - concept: コンセプトテキスト
  - gallery: ギャラリー（3×2、ランダム、裏返し）
  - profile: プロフィール
  - contact: お問い合わせフォーム
```

## 外部サービス設定

### Web3Forms
```yaml
用途: お問い合わせフォーム送信
設定方法:
  1. https://web3forms.com でアカウント作成
  2. アクセスキーを取得
  3. フォームのhidden inputに設定
制限: 月250件まで無料
```

### Vercel
```yaml
用途: ホスティング
設定方法:
  1. https://vercel.com でアカウント作成
  2. GitHubリポジトリを連携（または直接アップロード）
  3. 自動デプロイ
ドメイン: xxx.vercel.app（xxxは指定可能）
```

## 開発コマンド

### ローカルプレビュー
```bash
# Python 3がインストールされている場合
python3 -m http.server 3247

# または npx
npx serve -p 3247

# ブラウザで http://localhost:3247 を開く
```

### デプロイ
```bash
# Vercel CLIを使用する場合
npx vercel

# または GitHubにpushして自動デプロイ
git push origin main
```

## 将来の拡張予定
```yaml
Phase 11で追加予定:
  - 名前診断機能: 名前入力→ヲシテ文字の意味を表示
  - ヘッダーアニメーション: 紙が破れて文字が現れる動画

注意: 現時点ではこれらの機能は実装しない
```

---

## 現在の進捗状況（2026-01-17 更新）

### 完了済み
```yaml
実装完了:
  - index.html: 5セクション構成（日英対応）
  - css/style.css: レスポンシブ対応、スクロールフェードイン
  - js/main.js: ギャラリー機能、リフレッシュボタン、フォーム送信
  - data/gallery.json: 19作品登録済み（タイトル・説明は仮）

機能:
  - ヘッダー画像表示
  - コンセプト（日本語）
  - ギャラリー（3×2ランダム、裏返し、ホバー、リフレッシュボタン）
  - プロフィール（日英、SNSアイコン4つ）
  - お問い合わせフォーム（日英ラベル）
  - スクロールフェードインアニメーション
  - ファビコン
  - SEO対策（タイトル・説明文）
```

### 次のステップ
```yaml
えみちゃん対応待ち:
  1. gallery.jsonの各作品タイトル・説明を更新
     - タイトル: 2〜8文字（ヲシテ文字の言葉）
     - 説明: 15〜30文字

  2. Web3Formsアカウント作成
     - https://web3forms.com
     - アクセスキーをindex.htmlに設定

  3. Vercelアカウント作成
     - https://vercel.com
     - デプロイして公開

  4. PinterestアカウントURL
     - 作成後、index.htmlの#を実際のURLに変更
```

### ローカル確認方法
```bash
cd "/Users/hisae/Desktop/BlueLamp/Woshite-n Site"
python3 -m http.server 3247
# ブラウザで http://localhost:3247 を開く
```
