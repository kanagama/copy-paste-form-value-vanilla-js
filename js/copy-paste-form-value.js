/**
 * form が変更されたら localstorage に保存する
 */
function formChangeEvent()
{
  document.querySelector(`form`).addEventListener('change', function() {
    saveForm();
  });
}

/**
 * フォームの値を localStorage に保持
 */
function saveForm()
{
  if (!existForm()) {
    return false;
  }

  // フォームデータを取得する
  let formDatas = {};
  for (let [key, value,] of getFormData()) {
    // token、hidden パラメータは含まない
    if (key.indexOf('token') < 0 || document.getElementsByName(key)[0].type !== 'hidden') {
      formDatas[key] = value;
    }
  }

  localStorage.setItem(getUrlHash(), JSON.stringify(formDatas));

  return true;
}

/**
 * localStorage からフォームの値を取得
 */
function loadForm()
{
  if (!existForm()) {
    return false;
  }

  let storage = localStorage.getItem(getUrlHash());
  if (storage === null) {
    return;
  }

  // 保持していた値を挿入
  let json = JSON.parse(storage);
  Object.keys(json).forEach(function (key) {
    setValue(key, json[key]);
  });
}

/**
 * form が存在するかチェック
 */
function existForm()
{
  if (document.querySelector(`form`).length <= 0) {
    console.log("The form doesn't exist.");
    return false;
  }

  return true;
}

/**
 * URLハッシュを取得
 */
function getUrlHash()
{
  return btoa(window.location.href);
}

/**
 * フォームの値を取得
 */
function getFormData()
{
  let form = document.querySelector(`form`);
  return new FormData(form);
}

/**
 * localStorage を削除する
 */
function clearStorage()
{
  localStorage.clear();
}

/**
 * input 要素に値を格納する
 */
function setValue(key, value)
{
  let inputs = document.getElementsByName(key);
  // radio ボタンでなければそのままセット
  if (inputs[0].type !== 'radio') {
    inputs[0].value = value;
    return;
  }

  // radio の場合、value が一致した場合に checked
  for (let input of inputs) {
    if (input.value === value) {
      input.checked = true;
      return;
    }
  }
}
