import ax from '../axios';

//学生课程列表查询
export function queryScheduleList(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/schedule/queryScheduleList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
