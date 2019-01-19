import ax from '../axios';

//用户注册
export function registerUser(params = {}) {
  return ax.get('http://23ti245684.imwork.net/qxiao-mp/action/mod-xiaojiao/manage/registerUser.do')
    .then(res => res.data)
    .catch(e => console.log(e));
}
//用户注册
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
