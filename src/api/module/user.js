import ax from '../axios';

//用户注册
//首页1 公告2 速报3
export function registerUser(params = {}) {
  //http://23ti245684.imwork.net/qxiao-mp/action/mod-xiaojiao/manage/registerUser.do?type=1
  //http://23ti245684.imwork.net/qxiao-mp/action/mod-xiaojiao/manage/registerUser.do?type=1
  return ax.get('http://23s662016z.imwork.net/qxiao-mp/action/mod-xiaojiao/manage/registerUser.do?type=1')
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
