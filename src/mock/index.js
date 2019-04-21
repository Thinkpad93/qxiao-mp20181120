import Mock from 'mockjs';

const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

export function scoreList(num = 10) {
    let data = [];
    for (let i = 0; i < num; i++) {
        let template = {
            'integer': Random.integer(1, 100), // 生成1到100之间的整数
            'paragraph': Random.cparagraph(1), //生成2至5个句子的文本
            'address': Random.province() // 生成地址
        }
        data.push(template)
    }

    return Mock.mock(data);
}

export function examPaperList() {
    let data = [];
    for (let i = 0; i < 20; i++) {
        let template = {
            'integer': Random.integer(1, 100),
            'csentence': Random.csentence(5, 10),
            'ctitle': Random.ctitle(5, 10),
            'image': Random.image('200x100'),
        }
        data.push(template)
    }

    return Mock.mock(data);
}