//获取地址栏参数
export function urlSearch() {
  let href = decodeURIComponent(location.href);
  let num = href.indexOf('?');
  if (num != -1) {
    let paramsArr = href.match(/\?\S+/)[0].replace('?', '').split('&');
    let params = {};
    for (let i = 0; i < paramsArr.length; i++) {
      let tmp = paramsArr[i].split('=');
      params[tmp[0]] = tmp[1];
    }
    if (Object.keys(params).length) {
      return params || {};
    }
  } else {
    return -1;
  }
}
