//获取地址栏参数
// export function urlSearch() {
//   let href = decodeURIComponent(location.href);
//   let num = href.indexOf('?');
//   if (num != -1) {
//     let paramsArr = href.match(/\?\S+/)[0].replace('?', '').split('&');
//     let params = {};
//     for (let i = 0; i < paramsArr.length; i++) {
//       let tmp = paramsArr[i].split('=');
//       params[tmp[0]] = tmp[1];
//     }
//     if (Object.keys(params).length) {
//       return params || {};
//     }
//   } else {
//     return -1;
//   }
// }

//获取地址栏参数
//这里处理一下链接地址有可能是从微信推送点击进来的
export function urlSearch() {
  let url = decodeURIComponent(location.href).split('?');
  let pars = url[url.length - 1].split('&');
  if (pars.length) {
    let data = {};
    for (let i = 0; i < pars.length; i++) {
      let tmp = pars[i].split('=');
      data[tmp[0]] = tmp[1];
    }
    if (Object.keys(data).length) {
      return data || {};
    }
  } else {
    return -1;
  }
}
