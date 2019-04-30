import ax from '../axios';

//行为添加
export function actionAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/actionAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//按行为查询规则
export function actionQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/actionQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//行为删除
export function actionDelete(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/actionDelete.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//行为编辑
export function actionUpdate(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/actionUpdate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//行为标准关联
export function ruleConnect(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/ruleConnect.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//行为标准增加
export function ruleAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/ruleAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//行为标准删除
export function ruleDelete(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/ruleDelete.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//行为列表查询
export function actionListQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/actionListQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//行为打星
export function actionStrike(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/actionStrike.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//历史打星查询
export function historyStrikeQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/historyStrikeQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询行为标准列表是否关联
export function queryStudentRule(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/queryStudentRule.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询未选中的自定义行为
export function queryStudentActionList(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/queryStudentActionList.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询未选中的默认行为
export function queryStudentActionDefaultList(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/queryStudentActionDefaultList.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询未选中的默认行为
export function queryMyAction(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/queryMyAction.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//系统默认行为列表
export function queryAllActionDefualt(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/queryAllActionDefualt.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
