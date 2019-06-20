import ax from '../axios';

//查询在家表现
export function queryActionWithHome(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/teacher/queryActionWithHome.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询在校表现
export function queryLessonWithSchool(params, config = {
  showLoading: false
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/teacher/queryLessonWithSchool.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询在家表现详细学生
export function queryStudentActionUsers(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/teacher/queryStudentActionUsers.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询在校表现详细学生
export function queryLessonStudent(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/teacher/queryLessonStudent.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生作品
export function queryWorkStudent(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/teacher/queryWorkStudent.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
