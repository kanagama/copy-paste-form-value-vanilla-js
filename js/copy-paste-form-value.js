/**
 * @license copy-paste-form-value v1.1.0
 * (c) 2022 k-nagama <k.nagama0632@gmail.com>
 * License: MIT
 */

/**
 * form が変更されたら localstorage に保存する
 *
 * @returns {bool}
 */
function formChangeEvent()
{
  document.querySelector(`form`).addEventListener('change', function() {
    saveForm();
  });

  return true;
}

/**
 * フォームの値を localStorage に保持
 *
 * @returns {bool}
 */
function saveForm()
{
  if (!existForm()) {
    return false;
  }

  localStorage.setItem(getUrlHash(), JSON.stringify(getFormData()));
  return true;
}

/**
 * localStorage からフォームの値を取得
 *
 * @returns {bool}
 */
function loadForm()
{
  if (!existForm()) {
    return false;
  }

  let storage = localStorage.getItem(getUrlHash());
  if (storage === null) {
    return false;
  }

  // 保持していた値を挿入
  let json = JSON.parse(storage);
  Object.keys(json).forEach(function (key) {
    setValue(key, json[key]);
  });

  return true;
}

/**
 * form が存在するかチェック
 */
function existForm()
{
  let form = document.querySelector(`form`);

  return !(form === null || form.length <= 0);
}

/**
 * URLハッシュを取得
 *
 * @return {string}
 */
function getUrlHash()
{
  if (!window.location.href) {
    return '';
  }

  return btoa(window.location.href);
}

/**
 * フォームの値を取得
 *
 * @returns {object}
 */
function getFormData()
{
  if (!existForm()) {
    return {};
  }

  let elements = {};
  document.querySelector(`form`).querySelectorAll(`input, select, textarea`).forEach(function(element) {
    if (
      // hidden 不要（かも）
      (element.getAttribute('type') === 'hidden')
      ||
      // submit は不要
      (element.getAttribute('type') === 'submit')
      ||
      // radio でチェック入ってないのは読み込まない
      (element.getAttribute('type') === 'radio' && element.checked !== true)
    ) {
      // continue の意味
      return;
    }

    elements[element.getAttribute('name')] = element.value;
  });

  return elements;
}

/**
 * localStorage を削除する
 *
 * @returns {bool}
 */
function clearStorage()
{
  localStorage.clear();
  return true;
}

/**
 * input 要素に値を格納する
 *
 * @returns {bool}
 */
function setValue(key, value)
{
  let inputs = document.getElementsByName(key);
  // radio ボタンでなければそのままセット
  if (inputs[0].type !== 'radio') {
    inputs[0].value = value;
    dispatch(inputs[0]);
    return true;
  }

  // radio の場合、value が一致した場合に checked
  for (let input of inputs) {
    if (input.value === value) {
      input.checked = true;
      dispatch(input);
      return true;
    }
  }

  return false;
}

/**
 * イベントを発火させる
 *
 * @param {object} elem
 */
function dispatch(elem)
{
  elem.dispatchEvent(new Event('click'));
  elem.dispatchEvent(new Event('change'));
  setTimeout(()=>{}, 20);
}

/**
 * テスト時にコメントアウト解除
 */
// module.exports = {
//   dispatch,
//   formChangeEvent,
//   saveForm,
//   loadForm,
//   existForm,
//   getUrlHash,
//   getFormData,
//   setValue,
//   clearStorage
// }
