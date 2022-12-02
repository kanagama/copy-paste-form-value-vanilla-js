# copy-paste-form-value-js

## 使い方

### js/copy-paste-form-value.min.js を読み込む

```html
<script type="text/javascript" src="copy-paste-form-value.min.js"></script>
```

<br><br>

### form の値を記録開始

function 実行後、form の change イベント発火時 localStorage に form の値が記録されます。

```js
formChangeEvent();
```

<br>

### form の値を読み込み

function 実行時、localStorage から記録していた form の値を呼び出してセットします。

```js
loadForm();
```

<br>

### 記録していた form の値を削除

※localStorage の値が全て消えます

```js
clearStorage();
```

<br><br>

基本的にはフォームの値を記録したいページで js を読み込んで

```js
loadForm();
formChangeEvent();
```

を実行するだけ。

また、記録を削除したいページで js を読み込んで

```js
clearStorage();
```

すればいいかなと思います。（予約完了画面とか）


# その他

## 圧縮・難読化

```bash
npm run uglifyjs
# js/copy-paste-form-value.min.js が生成される
```

## jest

```bash
npm run test
```
