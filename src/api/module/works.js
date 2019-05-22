import ax from '../axios';

//上传作品
export function uploadWorks(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/works/uploadWorks.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询审核通过上传作品
export function queryOnLineList(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/works/queryOnLineList.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询我的上传作品
export function queryMyUpload(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/works/queryMyUpload.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除作品
export function deleteImage(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/works/deleteImage.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//上传接口
export function uploadFile(params, config) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/works/uploadFile.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
