//公告通知列表查询
export function noticeQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/notice/noticeQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//公告通知详情
export function noticeDetail(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/notice/noticeDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//公告阅读人员查询
export function noticeReaders(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/notice/noticeReaders.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//公告发送
export function noticeAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/notice/noticeAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
