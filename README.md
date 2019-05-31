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

data: {
  day: ['周一','周二','周三','周四','周五','周六','周日'],
  homeStat: [
    {
      type: 'line',
      data: [5, 5, 5, 5, 5, 5, 5]
    },
    {
      type: 'line',
      data: [5, 5, 5, 5, 5, 5, 5]
    }
  ]
}

let url = "http://qxiao.natapp1.cc/qxiao-mp/#/single?openId=oUQwt1e9wv4_CbA6YcI-pefbcQdo&roleType=1&studentId=0&photo=http%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2FCttmTaYSYkTkAsiccYYzMeAc9YmB2h30Du9tGgNicmnPLkZI1ibvehb90GRn9zJYF5oObNvcjUvjjGibZcqeNvk7Dg%2F132&id=1&classId=1&className=%E7%B3%AF%E7%B1%B3%E7%8F%AD&type=0&isOpen=true&openStudentId=1&openStudentName=%E5%BC%A0%E5%B0%8F%E5%87%A1&name=%E9%97%A8%E5%89%8D%E6%B8%85%E5%B0%8F%E9%A3%8E%28%E5%9B%AD%E9%95%BF%29&totalStarCount=376&openPhoto=http%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2FCttmTaYSYkTkAsiccYYzMeAc9YmB2h30Du9tGgNicmnPLkZI1ibvehb90GRn9zJYF5oObNvcjUvjjGibZcqeNvk7Dg%2F132";

let uurl = "http://ax.qxiao.net/qxiao-mp/?scene=0&clicktime=1559265109#/single?openId=ohkYoxOlCh_krYE5DEsVo5H25wRo&photo=http://thirdwx.qlogo.cn/mmopen/Jr7rTHcwniaFC2gupt7uGYHYicX7tnCfvxYLItOLFS1ENx4O1DuXmPzq30KdpXCkyda3fd0t7uwZtmV5cpjZicj1LJ33Up9Aqgz/132&roleType=9&openStudentId=58&openStudentName=%E9%BB%84%E5%BE%B7%E5%8D%8E";


```

## git 分支命名

- Develop
- Release
- Hotfix
- Master

## natapp -authtoken=a6260d5585826691

> 1.班级圈查看图片时，按返回键返回的上一页，正常应该是退出图片查看模式

> 2.重新设计打卡流程功能？

> 3.当开放版孩子删除后，从微信推送里面进去应该是失效的

> 4.在校表现是需要带上手环才能检测出数据表现的
