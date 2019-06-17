import ax from '../axios';

//查询学校模板
<<<<<<< HEAD
export function querySchoolName(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/process/querySchoolName.do', params)
=======
export function querySchoolName(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/process/querySchoolName.do', params, config)
>>>>>>> open-dev
    .then(res => res.data)
    .catch(e => console.log(e));
}
//创建班级
<<<<<<< HEAD
export function addPlaySchoolWithTemplate(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/process/addPlaySchoolWithTemplate.do', params)
=======
export function addPlaySchoolWithTemplate(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/process/addPlaySchoolWithTemplate.do', params, config)
>>>>>>> open-dev
    .then(res => res.data)
    .catch(e => console.log(e));
}
//体验接口
<<<<<<< HEAD
export function experience(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/experience/experience.do', params)
=======
export function experience(params, config = {
  showLoading: false
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/experience/experience.do', params, config)
>>>>>>> open-dev
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生加入班级
<<<<<<< HEAD
export function studentJoinClass(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/process/studentJoinClass.do', params)
=======
export function studentJoinClass(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/process/studentJoinClass.do', params, config)
>>>>>>> open-dev
    .then(res => res.data)
    .catch(e => console.log(e));
}
//版本跳转
<<<<<<< HEAD
export function myExperience(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/experience/myExperience.do', params)
=======
export function myExperience(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/experience/myExperience.do', params, config)
>>>>>>> open-dev
    .then(res => res.data)
    .catch(e => console.log(e));
}
//二维码链接
<<<<<<< HEAD
export function getRQcode(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/upload/getRQcode.do', params)
=======
export function getRQcode(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/upload/getRQcode.do', params, config)
>>>>>>> open-dev
    .then(res => res.data)
    .catch(e => console.log(e));
}
