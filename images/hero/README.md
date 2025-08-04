# Hero Images

このフォルダには、ホームページのヒーローセクションで使用する画像を格納します。

## 画像仕様
- 推奨サイズ: 1920x1080px (Full HD)
- フォーマット: PNG, WebP
- 最適化: Web用に圧縮

## Canvaからのエクスポート画像
- materials-properties-map.png - AIによる材料特性マップ（Canva ID: DAGLQjlNFKQ）

## 画像の使用方法
HTMLのヒーローセクションに背景画像として設定するか、img要素として配置します。

```css
#hero {
  background-image: url('../images/hero/materials-properties-map.png');
  background-size: cover;
  background-position: center;
}
```