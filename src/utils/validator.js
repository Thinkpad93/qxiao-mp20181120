//手机号
export function isPhone(value) {
  let regExp = new RegExp(/^1[3|4|5|7|8|9][0-9]\d{8}$/); // {4,8}$/
  return !regExp.test(value) ? false : true;
}

//邮箱
export function isEmail(email) {
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

//大于0, 小于150, 支持小数位出现5, 如145.5, 用于判断考卷分数
// /^150$|^(?:\d|[1-9]\d|1[0-4]\d)(?:.5)?$/

//视频链接地址（视频格式可按需增删）
// /^https?:\/\/.*?(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i

//图片链接地址（图片格式可按需增删）
// /^https?:\/\/.*?(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/i

// 银行卡号（16或19位）
// /^([1-9]{1})(\d{15}|\d{18})$/

//中文姓名
// /^([\u4e00-\u9fa5·]{2,16})$/

//中国手机号(严谨), 根据工信部2019年最新公布的手机号段
// /^((\+|00)86)?1[3-9]\d{9}$/

//是否小数
// /^\d+\.\d+$/

//是否qq号格式正确
// /^[1-9][0-9]{4,10}$/

//是否由数字和字母组成
// /^[A-Za-z0-9]+$/

//不能包含字母
// /^[^A-Za-z]*$/
