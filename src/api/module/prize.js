import ax from '../axios';

//奖励添加接口
export function prizeAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/prize/prizeAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//奖励列表查询
export function prizeListQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/prize/prizeListQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//奖励删除接口
export function prizeDelete(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/prize/prizeDelete.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//奖励兑换
export function prizeExchange(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/prize/prizeExchange.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//兑奖记录查询
export function prizeExchangeLog(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/prize/prizeExchangeLog.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//获取可兑换星星数
export function queryTotalCountStar(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/prize/queryTotalCountStar.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
