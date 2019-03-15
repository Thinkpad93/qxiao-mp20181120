//手机号
export function isPhone(value) {
  let regExp = new RegExp(/^1[3|4|5|7|8][0-9]\d{8}$/); // {4,8}$/
  return !regExp.test(value) ? false : true;
}

//邮箱
export function isEmail(email) {
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}
