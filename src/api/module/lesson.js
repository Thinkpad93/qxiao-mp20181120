import ax from '../axios';

//学生课程列表查询
export function lessonQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/lessonQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//课程成绩查询列表
export function lessonScoreQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/lessonScoreQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//试卷列表查询
export function examPaperQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/examPaperQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//试卷详情查询
export function examPaperDetail(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/examPaperDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//试卷评论查询
export function examPaperCommentQuery(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/examPaperCommentQuery.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//试卷评论提交
export function examPaperComment(params) {
  return ax.post('/qxiao-mp/action/mod-xiaojiao/expression/examPaperComment.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
