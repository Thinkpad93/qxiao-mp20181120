import ax from '../axios';

//学生课程列表查询
export function queryScheduleList(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/schedule/queryScheduleList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//自制我的课表
export function addMySchedule(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/schedule/addMySchedule.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑我的课表
export function updateMySchedule(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/schedule/updateMySchedule.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//课程列表
export function queryMySchedule(params, config = {
  showLoading: false
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/schedule/queryMySchedule.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//课程列表
export function queryLessonList(params, config = {
  showLoading: false
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/schedule/queryLessonList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//选中默认课表
export function checkedSchedule(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/schedule/checkedSchedule.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询课表状态
export function queryScheduleCheckedState(params, config = {
  showLoading: false
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/schedule/queryScheduleCheckedState.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
