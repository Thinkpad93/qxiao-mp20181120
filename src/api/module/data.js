import ax from '../axios';

//设备查询接口
export function queryData(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/data/queryData.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
