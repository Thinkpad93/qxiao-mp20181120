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
//学校老师列表
export function queryTeacher(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryTeacher.do', params)
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
//老师信息完善
export function teacherJoin(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/teacherJoin.do', params)
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
//查询学生信息--我的
export function studentQueryMe(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/studentQueryMe.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学生列表--我的--切换
export function queryAllStudent(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryAllStudent.do', params)
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
//学生列表
export function queryStudentList(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryStudentList.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询对应学校的所有班级
export function queryClass(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryClass.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询园长信息
export function queryInfo(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryInfo.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//根据学校Id码查询信息
export function queryBySchoolCode(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryBySchoolCode.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//根据学校Id码查询信息
export function querySchoolInfo(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/querySchoolInfo.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//根据类型查询相关班级
export function queryClassId(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryClassId.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//根据家长手机号查询相关班级
export function queryClassByTel(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryClassByTel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//老师信息查询-我的
export function queryTeacherInfo(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryTeacherInfo.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询园长预先录入老师的信息
export function queryTeacherInfoByTel(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryTeacherInfoByTel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//老师信息修改-我的
export function teacherInfoUpdate(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/updateMe.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生修改-我的
export function studentInfoUpdate(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/updateStudent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//园长修改-我的
export function updateSchool(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/updateSchool.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学生详细信息
export function studentInfoQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/studentInfoQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//控制家长端发布班级圈权限
export function updateIsOpen(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/updateIsOpen.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学生相关班级
export function queryStudentClass(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryStudentClass.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增孩子
export function addStudentWithOpen(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/addStudentWithOpen.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学生列表--开放版--切换
export function queryOpenStudentList(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryOpenStudentList.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//老师录入学生（查询存在的学生）
export function queryStudentOpen(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/manage/queryStudentOpen.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
