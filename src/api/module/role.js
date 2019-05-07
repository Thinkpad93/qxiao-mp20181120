import ax from '../axios';

//多角色列表
export function queryRole(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/role/queryRole.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
