import ax from '../axios';

//最新评语查询
export function newRemarkQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/remark/newRemarkQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//评语列表查询
export function remarkListQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/remark/remarkListQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
