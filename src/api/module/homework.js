//作业列表查询
export function homeworkQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/homework/homeworkQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//作业详情查询
export function homeworkDetail(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/homework/homeworkDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//作业阅读人员查询
export function homeworkReaders(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/homework/homeworkReaders.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//作业发布
export function homeworkAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/homework/homeworkAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//作业删除
export function homeworkDelete(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/homework/homeworkDelete.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
