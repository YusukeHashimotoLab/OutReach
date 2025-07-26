# スタイルガイド - Yusuke Hashimoto Website

このドキュメントは、ウェブサイト全体で統一されたデザインを維持するためのガイドラインです。

## 目次
1. [デザイン原則](#デザイン原則)
2. [カラーシステム](#カラーシステム)
3. [タイポグラフィ](#タイポグラフィ)
4. [スペーシング](#スペーシング)
5. [コンポーネント](#コンポーネント)
6. [レイアウト](#レイアウト)
7. [ベストプラクティス](#ベストプラクティス)

## デザイン原則

### 1. シンプルさ
- 不要な装飾を避け、コンテンツに焦点を当てる
- クリーンで読みやすいレイアウト

### 2. 一貫性
- すべてのページで同じデザインパターンを使用
- 共通コンポーネントの再利用

### 3. アクセシビリティ
- 適切なコントラスト比の維持
- セマンティックなHTML構造
- キーボードナビゲーション対応

### 4. レスポンシブ
- モバイルファーストアプローチ
- フレキシブルなレイアウト

## カラーシステム

### プライマリカラー
- **Dark Navy** (`#1a252f`): ヘッダー、主要なテキスト
- **Navy** (`#2c3e50`): セカンダリヘッダー
- **Light Navy** (`#34495e`): ボーダー、軽いアクセント

### セカンダリカラー
- **Blue Gray** (`#4a5f7a`): アクセント、リンク
- **Light Blue Gray** (`#5d6d7e`): 本文テキスト
- **Lighter Gray** (`#7f8c8d`): 補助テキスト

### ニュートラルカラー
- **White** (`#ffffff`): 背景、カード
- **Background** (`#f8f9fa`): ページ背景
- **Border** (`#e9ecef`): ボーダー

### 使用例
```css
/* ヘッダー */
header {
  background: var(--color-primary);
  color: var(--color-white);
}

/* 本文 */
p {
  color: var(--color-text-secondary);
}
```

## タイポグラフィ

### フォントファミリー
- **見出し**: Georgia, Times New Roman, serif
- **本文**: Georgia, Times New Roman, serif
- **UIテキスト**: -apple-system, BlinkMacSystemFont, sans-serif

### フォントサイズ
| 用途 | サイズ | CSS変数 |
|------|--------|----------|
| h1 | 2.4rem | `--font-size-3xl` |
| h2 | 1.8rem | `--font-size-2xl` |
| h3 | 1.5rem | `--font-size-xl` |
| 本文 | 1.1rem | `--font-size-md` |
| 小テキスト | 0.875rem | `--font-size-sm` |

### 行間
- 見出し: 1.2 (`--line-height-tight`)
- 本文: 1.8 (`--line-height-loose`)

## スペーシング

### スペーシングスケール
| 名前 | 値 | 用途 |
|------|-----|------|
| xs | 0.25rem | 最小の間隔 |
| sm | 0.5rem | 小さな間隔 |
| md | 1rem | 標準的な間隔 |
| lg | 1.5rem | 大きな間隔 |
| xl | 2rem | セクション内の間隔 |
| 2xl | 3rem | セクション間の間隔 |
| 3xl | 4rem | 大きなセクション間隔 |

### 使用例
```css
.section {
  padding: var(--spacing-3xl) var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}
```

## コンポーネント

### ページ導入部 (.page-intro)
すべてのページの冒頭に使用する統一されたセクション。

```html
<section class="page-intro">
  <h1>ページタイトル</h1>
  <p>ページの説明文がここに入ります。</p>
</section>
```

スタイル:
- 白背景
- パディング: 4rem
- ボーダー: 1px solid #e9ecef
- 影: 軽いドロップシャドウ
- テキスト: 中央寄せ

### カード (.card)
情報をグループ化して表示するコンテナ。

```html
<div class="card">
  <div class="card-header">
    <h3>カードタイトル</h3>
  </div>
  <div class="card-body">
    <p>カードの内容</p>
  </div>
</div>
```

### ボタン (.btn)
主要なアクション用のボタン。

```html
<button class="btn btn-primary">プライマリボタン</button>
<button class="btn btn-secondary">セカンダリボタン</button>
```

## レイアウト

### コンテナ
- 最大幅: 1200px
- 左右のパディング: 2rem

```css
.container {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
}
```

### グリッドシステム
- CSS Gridを使用
- レスポンシブ対応
- ギャップ: 2rem

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}
```

## ベストプラクティス

### 1. CSS変数の使用
直接的な値の代わりに、必ずCSS変数を使用する。

```css
/* 良い例 */
color: var(--color-primary);
padding: var(--spacing-lg);

/* 悪い例 */
color: #1a252f;
padding: 1.5rem;
```

### 2. BEMの命名規則
Block-Element-Modifier の命名パターンを使用。

```css
.card {}              /* Block */
.card__header {}      /* Element */
.card--featured {}    /* Modifier */
```

### 3. モバイルファースト
小さい画面から始めて、大きい画面に対応。

```css
/* モバイル（デフォルト） */
.element {
  font-size: 1rem;
}

/* タブレット以上 */
@media (min-width: 768px) {
  .element {
    font-size: 1.1rem;
  }
}
```

### 4. アクセシビリティ
- 適切なaria属性の使用
- キーボードフォーカスの可視化
- 十分なコントラスト比（4.5:1以上）

### 5. パフォーマンス
- 不要なCSSの削除
- CSS変数による重複の削減
- 効率的なセレクタの使用

## 更新履歴
- 2024-01-26: 初版作成