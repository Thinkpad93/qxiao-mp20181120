import ax from '../axios';

//根据OpenId获取学校的班级信息
export function classInfo(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/classInfo.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//根据OpneId获取所有老师列表
export function classTeacher(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/teacher.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
