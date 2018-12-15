import ax from '../axios';

//班级圈信息查询
export function communityQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/community/communityQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//发布班级圈
export function communityAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/community/communityAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//班级圈删除
export function communityDelete(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/community/communityDelete.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//班级圈点赞
export function communityPraise(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/community/communityPraise.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//班级圈评论
export function communityComment(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/community/communityComment.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
