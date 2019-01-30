import ax from '../axios';

//查询相册所属班级
export function albumClassQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/album/albumClassQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询班级所属的相册栏目
export function albumChannelQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/album/albumChannelQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询相册栏目详情
export function albumChannelDetail(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/album/albumChannelDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//相册照片或视频删除
export function imageDelete(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/album/imageDelete.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//相册图片或视频上传
export function albumImageAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/album/albumImageAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增栏目
export function addChannel(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/album/addChannel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
