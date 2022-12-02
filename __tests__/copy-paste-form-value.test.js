const js = require('../js/copy-paste-form-value.js');

const fs = require('fs')
const bodyHtml = fs.readFileSync('./html/index.html', {encoding: "utf-8"});

/**
 *
 */
test('existForm() - form が存在しする場合true', () => {

  document.body.innerHTML = bodyHtml;

  expect(js.existForm()).toBe(true);
});

/**
 *
 */
test('existForm() - form が存在しない場合false', () => {

  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '</div>';

  expect(js.existForm()).toBe(false);
});

/**
 *
 */
test('getUrlHash() - hash値が正常に取得できる', () => {
  // window.location.href に値を格納
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      href: 'https://098m.com/'
    }
  });

  expect(js.getUrlHash()).not.toEqual('');
});

/**
 *
 */
test('getFormData() - inputデータが1件以上取得できる', () => {

  document.body.innerHTML = bodyHtml;

  expect((Object.keys(js.getFormData()).length > 0)).toBe(true);
});

/**
 *
 */
test('saveForm() - 取得した情報がlocalStorageに保持される', () => {

  document.body.innerHTML = bodyHtml;

  expect(js.saveForm()).toBe(true);

  let storage = localStorage.getItem(js.getUrlHash());
  if (storage === null) {
    expect('localStorageに保存できていない').toBe(false);
    return;
  }

  let json = JSON.parse(storage);
  Object.keys(json).forEach(function (key) {
    if (key === 'firstName') {
      expect(json[key]).toBe('kazumacchi');
      return;
    }
    if (key === 'phone') {
      expect(json[key]).toBe('09099999999');
      return;
    }
    if (key === 'sex') {
      expect(json[key]).toBe('male');
      return;
    }

    expect('localStorageに保存できていない').toBe(false);
  });
});

/**
 *
 */
test('setValue(key, value) - input,radio要素に値を代入できる', () => {
  document.body.innerHTML = bodyHtml;

  js.setValue('firstName', 'newKazumacchi');
  js.setValue('sex', 'female');

  expect(document.getElementsByName('firstName')[0].value).toBe('newKazumacchi');
  expect(document.getElementsByName('sex')[1].checked).toBe(true);
});

/**
 *
 */
test('loadForm() - input,radio要素に値を代入できる', () => {
  document.body.innerHTML = bodyHtml;

  js.setValue('firstName', 'newKazumacchi');
  js.setValue('sex', 'female');

  expect(document.getElementsByName('firstName')[0].value).toBe('newKazumacchi');
  expect(document.getElementsByName('sex')[1].checked).toBe(true);
});

/**
 *
 */
test('formChangeEvent() - changeイベント発火時、localStorageに値が保存される', () => {

  document.body.innerHTML = bodyHtml;

  let input = document.getElementsByName('firstName')[0];
  input.addEventListener('click', () => {});

  let storage = localStorage.getItem(js.getUrlHash());
  expect((storage === null)).toBe(false);
});

/**
 *
 */
test('clearStorage() - localStorageの値がクリアされる', () => {

  document.body.innerHTML = bodyHtml;

  js.saveForm();
  js.clearStorage();

  expect((js.loadForm())).toBe(false);
});
