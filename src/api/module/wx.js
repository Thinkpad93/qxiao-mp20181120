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
