import ax from '../axios';

//用户注册
//首页1 公告2 速报3
export function registerUser() {
  //http://zc.qxiao.net/qxiao-mp/action/mod-xiaojiao/manage/registerUser.do?type=1
  return ax.get('http://qxiao.natapp1.cc/qxiao-mp/action/mod-xiaojiao/manage/registerUser.do?type=1')
    .then(res => res.data)
    .catch(e => console.log(e));
}
//手机验证码
export function telVeriftCode(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/telVeriftCode.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//用户登录
export function userTeleLogin(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/userTeleLogin.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
