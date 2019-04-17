import ax from '../axios';

//在家表现一周查询
export function homeStatQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/homeStatQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//课堂表现一周查询
export function lessonStatQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/lessonStatQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
