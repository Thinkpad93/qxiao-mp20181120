//手机号
export const isPhone = (value) => {
  let regExp = new RegExp(/^1[3|4|5|7|8][0-9]\d{8}$/); // {4,8}$/
  return !regExp.test(value) ? false : true;
}
