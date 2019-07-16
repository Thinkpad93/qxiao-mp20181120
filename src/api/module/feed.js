import ax from '../axios';

//反馈意见列表（老师）
export function queryTeacherFeedList(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/feed/queryTeacherFeedList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//反馈意见列表（家长）
export function queryStudentFeedList(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/feed/queryStudentFeedList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询孩子所在班级的老师
export function queryTeacherWithStudentId(params, config = {
  showLoading: false
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/feed/queryTeacherWithStudentId.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增意见反馈
export function addFeedWithStudent(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/feed/addFeedWithStudent.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//老师回复意见反馈
export function teacherBack(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/feed/teacherBack.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}