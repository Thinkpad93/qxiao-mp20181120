import ax from '../axios';

//食谱列表查询
export function recipeQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/recipe/recipeQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//食谱详情查询
export function recipeDetail(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/recipe/recipeDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//食谱发布
export function recipeAdd(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/recipe/recipeAdd.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
