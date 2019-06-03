import ax from '../axios';

//jsapi_ticket
export function sign(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/weixin/sign.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//图片上传
export function imgIds(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/upload/imgIds.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//用户支付
export function paySign(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/weixin/paySign.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//用户支付
export function userPay(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/pay/userPay.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//上传头像
export function addImage(params, config) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/upload/addImage.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
