import ax from '../axios';

//查询在家表现
export function queryActionWithHome(params, config = {
  showLoading: false
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/teacher/queryActionWithHome.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生作品
export function queryWorkStudent(params, config = {
  showLoading: false
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/teacher/queryWorkStudent.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
