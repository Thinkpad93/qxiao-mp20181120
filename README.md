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
    - acion 行为管理页面
    - album 班级相册
    - baby 学生
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
let praiseList = [
  { openId: "oUQwt1e9wv4_CbA6YcI-pefbcQdo", studentId: 8 },
  { openId: "oUQwt1XVT1Y0ohyXWNwrchLSYLa8", studentId: 18 },
  { openId: "oUQwt1XVT1Y0ohyXWNwrchLSYLa8", studentId: 0 }
];
let studentId = 7;
let openId = "oUQwt1e9wv4_CbA6YcI-pefbcQdo";
let n = [];
```

## git 分支命名

- Develop
- Release
- Hotfix
- Master

## natapp -authtoken=a6260d5585826691

> 大家好，我是梁朝伟，我曾经在东成西就电影里扮演过西毒欧阳锋，请多多指教
