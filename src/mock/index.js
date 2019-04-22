import Mock from 'mockjs';

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

export function scoreList(num = 10) {
  let data = [];
  for (let i = 0; i < num; i++) {
    let template = {
      'stageId': Random.integer(1, 100),
      'stageTitle': Random.cparagraph(1),
      'score': Random.integer(1, 100),
      'scoreRank': Random.integer(1, 100),
      'day': Random.date()
    }
    data.push(template)
  }

  return Mock.mock(data);
}

export function examPaperList() {
  let data = [];
  for (let i = 0; i < 20; i++) {
    let template = {
      'paperId': Random.integer(1, 100),
      'stageTitle': Random.csentence(5, 10),
      'title': Random.ctitle(5, 10),
      'image': Random.image('200x100'),
      'schoolName': Random.ctitle(5, 10),
    }
    data.push(template)
  }

  return Mock.mock(data);
}
