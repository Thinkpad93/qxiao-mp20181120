import ax from '../axios';

//查询学校模板
export function querySchoolName(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/process/querySchoolName.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//创建班级
export function addPlaySchoolWithTemplate(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/process/addPlaySchoolWithTemplate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//体验接口
export function experience(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/experience/experience.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生加入班级
export function studentJoinClass(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/process/studentJoinClass.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//版本跳转
export function myExperience(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/experience/myExperience.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
