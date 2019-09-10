import ax from '../axios';

//设备查询接口
export function queryData(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/data/queryData.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//设备查询接口
export function getDeviceStatus(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/device/getDeviceStatus.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//设备授权
export function deviceAuth(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/device/deviceAuth.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//绑定设备
export function bindDevice(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/device/bindDevice.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//解绑设备
export function unBindDevice(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/device/unBindDevice.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//获取设备电量
export function getElectric(params, config = {
  showLoading: true
}) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/device/getElectric.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
