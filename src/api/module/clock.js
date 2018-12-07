//考勤打卡
export function punchClock(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/clock/punchClock.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//月考勤记录查询
export function clockQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/clock/clockQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//考勤统计查询
export function clockStat(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/clock/clockStat.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//实时接送接口
export function realShuttle(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/clock/realShuttle.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询班级当天打卡记录
export function classClockQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/clock/classClockQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
