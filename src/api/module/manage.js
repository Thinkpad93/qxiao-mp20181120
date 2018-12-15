import ax from '../axios';

//用户注册
export function registerUser(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/registerUser.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//用户登录
export function userTeleLogin(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/userTeleLogin.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//园所（学校）创建
export function schoolAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/schoolAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//园所（学校）修改
export function schoolUpdate(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/schoolUpdate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//班级创建
export function classAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/classAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//班级删除
export function classDelete(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/classDelete.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//移除班级对应的老师
export function classMoveTeacher(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/classMoveTeacher.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询班级对应的老师
export function classQueryTeacher(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/classQueryTeacher.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//移除班级对应的学生
export function classMoveStudent(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/classMoveStudent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询班级对应的学生
export function classQueryStudent(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/classQueryStudent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//老师新增
export function teacherAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/teacherAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//批量老师新增
export function teacherBatchAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/teacherBatchAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//老师修改
export function teacherUpdate(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/teacherUpdate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//老师信息查询
export function teacherQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/teacherQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//老师删除
export function teacherDelete(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/teacherDelete.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生信息完善
export function studentSupply(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/studentSupply.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生信息查询
export function studentQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/studentQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生新增
export function studentAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/studentAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//批量学生新增
export function studentBatchAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/studentBatchAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生修改
export function studentUpdate(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/studentUpdate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生删除
export function studentDelete(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/studentDelete.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
