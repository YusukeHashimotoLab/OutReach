# テンプレート使用ガイド

## base.html の使い方

`base.html` は、すべてのページの基本となるテンプレートです。

### プレースホルダー一覧

以下のプレースホルダーを実際の値に置き換えて使用してください：

#### メタ情報
- `<!-- PAGE_TITLE -->` - ページのタイトル
- `<!-- PAGE_DESCRIPTION -->` - ページの説明（meta description）
- `<!-- PAGE_KEYWORDS -->` - ページのキーワード（カンマ区切り）
- `<!-- PAGE_URL -->` - ページの完全なURL

#### 言語リンク
- `<!-- JA_URL -->` - 日本語版のURL
- `<!-- EN_URL -->` - 英語版のURL

#### ナビゲーション
現在のページに対応する箇所を `aria-current="page"` に置き換える：
- `<!-- HOME_ACTIVE -->` - ホームページの場合
- `<!-- RESEARCH_ACTIVE -->` - 研究ページの場合
- `<!-- RESEARCH_DX_ACTIVE -->` - Research DXページの場合
- `<!-- PUBLICATIONS_ACTIVE -->` - 出版物ページの場合
- `<!-- TALKS_ACTIVE -->` - 講演ページの場合
- `<!-- CONTACT_ACTIVE -->` - 連絡先ページの場合

#### コンテンツ
- `<!-- PAGE_CONTENT -->` - メインコンテンツ
- `<!-- PAGE_SPECIFIC_STYLES -->` - ページ固有のCSS
- `<!-- PAGE_SPECIFIC_SCRIPTS -->` - ページ固有のJavaScript

### 使用例

```html
<!-- publications.html の例 -->

<!-- プレースホルダーを置き換える -->
<title>Publications | Yusuke Hashimoto</title>
<meta name="description" content="材料科学とスピントロニクス分野における研究成果">

<!-- ナビゲーションの現在ページ -->
<a href="publications.html" aria-current="page">Publications</a>

<!-- メインコンテンツ -->
<main id="main-content">
  <section class="page-intro">
    <h1 class="page-intro__title">Publications</h1>
    <p class="page-intro__description">
      材料科学とスピントロニクス分野における研究成果です。
    </p>
  </section>
  
  <!-- その他のコンテンツ -->
</main>
```

### 新しいページを作成する手順

1. `base.html` をコピー
2. プレースホルダーを実際の値に置き換え
3. `<!-- PAGE_CONTENT -->` にページ固有のコンテンツを追加
4. 必要に応じてページ固有のスタイルとスクリプトを追加

### 注意事項

- すべてのページで同じヘッダーとフッターを使用
- 共通コンポーネント（`.page-intro`, `.card`, `.btn` など）を活用
- CSS変数を使用して一貫性を保つ
- レスポンシブデザインを考慮