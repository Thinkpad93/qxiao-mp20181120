### 技术

vue2.x + vuex + vueRoute + axios + vantUI

## 项目目录介绍

- bulid webpack 编辑打包配置目录
- config 项目配置
- dist 项目打包后的文件
- node_modules npm 包
- src 开发需要的目录

  - api 后端接口地址
    - module api 接口模块文件
      - album.js 班级相册接口地址
    - axios.js axios 配置文件
    - index.js 导出所有接口地址
  - assets 资源目录
  - components 组件目录
  - config 配置
  - router 路由文件
  - directive 全局指令
  - filters 全局过滤
  - mixins 混入
  - mock 模拟数据
  - router vue 路由配置文件
  - store vuex 文件
  - styles less 样式文件
  - vantUI 移动端 UI 组件
  - views 页面
    - about 关于我们
    - acion 行为管理页面
    - album 班级相册
    - baby 学生
    - bracelet 学生手环页面
    - child 添加孩子页面
    - class 班级管理
    - clock 考勤管理
    - collention 我的收藏
    - community 班级圈发布
    - exampaper 试卷列表
    - fresh 新鲜速报
    - home 小 Q 班级页面
    - homework 作业
    - login 登陆页
    - my 我的
    - notice 公告通知
    - prize 奖励兑换页面
    - recipe 营养食谱
    - remark 评语页面
    - school 创建学校和老师加入学校
    - score 学习成绩
    - share 分享页面
    - shuttle 实时接送
    - single 小 Q 表现页面
    - student 学生管理
    - teacher 老师管理
    - user 个人中心
    - wisdom 小 Q 智慧
    - works 作品管理
  - App.vue 根组件
  - main.js 项目启动文件（入口）

- static 静态资源目录
- .babelrc babel 配置文件
- .eslint eslint 配置文件
- .postcssrc webpack 处理 css 插件配置
- .package npm 配置信息

## 开发问题

> 在 keep-alive 作用下，某些钩子函数会失去作用，在 deactivated（）这个钩子函数解绑即可

```javascript
  deactivated() {
    window.removeEventListener("scroll", this.handleLoadingMore);
  },
  activated() {
    window.addEventListener("scroll", this.handleLoadingMore);
  },
```

> iphone 手机遇到 select 选中不了值问题

```html
<select class="select" name="" dir="rtl" v-model="selected" multiple size="1">
  <!-- 兼容性问题修改 -->
  <optgroup disabled hidden></optgroup>
  <option
    :value="option.classId"
    v-for="(option,index) in classList"
    :key="index"
    >{{ option.className }}</option
  >
</select>
```

> 调用微信 SDK 接口 wx.previewImage 出现华手机查看不了问题(黑屏)

```javascript
wx.previewImage({
  current: encodeURI(url), //encodeURI
  urls: imgArray
});

function getTagsMap() {
  return [...document.querySelectorAll("*")].reduce((a, c) => {
    let tagName = c.tagName.toLowerCase();
    if (a[tagName]) {
      a[tagName] += 1;
    } else {
      a[tagName] = 1;
    }
    return a;
  }, {});
}

//模拟数据
jsong = [
  {
    name: "阅读",
    count: 30,
    excellent: 10,
    ordinary: 12,
    good: 23
  },
  {
    name: "书法",
    count: 20,
    excellent: 10,
    ordinary: 12,
    good: 23
  },
  {
    name: "家务",
    count: 50,
    excellent: 33,
    ordinary: 2,
    good: 24
  },
  {
    name: "作息",
    count: 30,
    excellent: 15,
    ordinary: 7,
    good: 2
  },
  {
    name: "做作业",
    count: 40,
    excellent: 30,
    ordinary: 8,
    good: 3
  }
];
//传入的data进行处理
function analysis(data) {
  var end_obj = [];
  for (var i in data) {
    var obj = { name: "", datas: [] };
    obj.name = data[i].name;
    obj.value = data[i]["count"];
    obj.datas[0] = data[i]["excellent"];
    obj.datas[1] = data[i]["ordinary"];
    obj.datas[2] = data[i]["good"];
    end_obj.push(obj);
  }
  return end_obj;
}

option = {
  title: {
    text: "某站点用户访问来源",
    subtext: "纯属虚构",
    x: "center",
    show: false
  },
  tooltip: {
    trigger: "item",
    formatter: function(a) {
      return (
        a["name"] +
        "<br/>优秀: " +
        a["data"].datas[0] +
        "人" +
        "<br/>良好: " +
        a["data"].datas[1] +
        "人" +
        "<br/>一般: " +
        a["data"].datas[2] +
        "人"
      );
    }
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["阅读", "书法", "家务", "作息", "做作业"],
    show: false
  },
  series: [
    {
      name: "在家表现",
      type: "pie",
      radius: "60%",
      center: ["50%", "50%"],
      data: analysis(jsong),
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "insideRight",
            formatter: function(a) {
              return a["name"] + ":" + a["value"] + "人";
            }
          }
        }
      }
    }
  ]
};

let styleList = [
  {
    id: 1,
    name: "日式",
    selected: true
  },
  {
    id: 2,
    name: "写实",
    selected: false
  },
  {
    id: 3,
    name: "人物",
    selected: false
  },
  {
    id: 4,
    name: "场景",
    selected: false
  }
];
```

## git 分支命名

- Develop
- Release
- Hotfix
- Master

## natapp -authtoken=a6260d5585826691
