> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

### 技术

vue2.x + vuex + vueRoute + axios + weuijs

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
  - mock 模拟数据
  - router vue 路由配置文件
  - store vuex 文件
  - style less 样式文件
  - vantUI 移动端 UI 组件
  - views 页面
    - album 班级相册
    - baby 学生
    - class 班级管理
    - clock 考勤管理
    - community 班级圈
    - fresh 新鲜速报
    - home 首页
    - homework 作业
    - login 登陆页
    - my 我的
    - notice 公告通知
    - recipe 营养食谱
    - school 创建学校和老师加入学校
    - student 学生管理
    - teacher 老师管理
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
```

> audio

```javascript
    handlePlayAudio() {
      let ua = window.navigator.userAgent.toLowerCase();
      //ios
      if (/iphone|ipad|mac/i.test(ua)) {
        alert("ios");
        document.addEventListener(
          "WeixinJSBridgeReady",
          function() {
            let audios = document.getElementById("audios");
            WeixinJSBridge.invoke("getNetworkType", {}, function(res) {
              //res这里面就包含了所有的网络类型
              audios.play();
            });
          },
          false
        );
      }
      //android
      if (/android/i.test(ua)) {
        console.log("android");
      }
    },
      document.addEventListener("touchstart", () => {
        document.getElementById("audios").play();
      });
      配置信息, 即使不正确也能使用 wx.ready
      wx.config({
        debug: false,
        appId: "",
        timestamp: 1,
        nonceStr: "",
        signature: "",
        jsApiList: []
      });
      wx.ready(() => {
        let audio = document.getElementById("audios");
        let ua = window.navigator.userAgent.toLowerCase();
        if (/iphone|ipad|mac/i.test(ua)) {
          alert("ios");
          //audio.pause();
          audio.play();
        }
        if (/android/i.test(ua)) {
        }
      });
```

## git 分支命名

- Develop
- Release
- Hotfix
- Master
