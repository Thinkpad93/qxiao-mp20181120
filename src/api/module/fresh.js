import ax from '../axios';

//速报列表查询
export function freshQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/fresh/freshQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//速报详情
export function freshDetail(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/fresh/freshDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//速报评论人员查询
export function freshCommentQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/fresh/freshCommentQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//速报发送
export function freshAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/fresh/freshAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//速报评论发表
export function freshCommentAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/fresh/freshCommentAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除速报留言
export function deleteComment(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/fresh/deleteComment.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除速报
export function deleteFresh(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/fresh/deleteFresh.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
