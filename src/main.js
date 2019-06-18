import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from "js-cookie";
import {
  urlSearch
} from './utils/urlSearch';
import wxapi from "@/config/wxapi";
import {
  API_ROOT
} from "@/config/isdev";


import '@/vantUI'; //vant UI


Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let {
    roleType,
    experience
  } = store.state.user.info;
  let _cookie = Cookies.getJSON('info') || {};
  //获取地址栏参数
  let params = urlSearch();
<<<<<<< HEAD
  if (to.meta.cookie) {
    //游客模式
    if (to.path === '/single' || to.path === '/user') {
      if (experience == 1 || _cookie.experience == 1) {
        console.log("游客模式");
        store.dispatch('experience/experience', {
          tel: _cookie.tel
        }).then(res => {
          if (res) {
            let params = Object.assign({}, _cookie, res);
            store.dispatch("user/setInfo", params);
          }
        });
      }
    }
    if (Object.keys(_cookie).length && !roleType) {
<<<<<<< HEAD
      //微信分享
      //wxSdk.wxShare();
=======
>>>>>>> open-dev
      if (params != -1) {
        if (params.openId || params.roleType) {
          console.log(params);
=======
  //if (to.meta.cookie) {
  //游客模式
  if (to.path === '/single' || to.path === '/user') {
    if (experience == 1 || _cookie.experience == 1) {
      console.log("游客模式");
      store.dispatch('experience/experience', {
        tel: _cookie.tel
      }).then(res => {
        if (res) {
          let params = Object.assign({}, _cookie, res);
>>>>>>> open-dev
          store.dispatch("user/setInfo", params);
        }
      });
    }
  }
  if (Object.keys(_cookie).length && !roleType) {
    if (params != -1) {
      if (params.openId || params.roleType) {
        console.log(params);
        store.dispatch("user/setInfo", params);
      } else {
        store.dispatch("user/getInfo");
      }
    } else {
      store.dispatch("user/getInfo");
    }
  } else if (!Object.keys(_cookie).length && !roleType) {
    console.log("没有Cookie");
    if (to.path !== '/login') {
      //第一次进来
      if (params != -1) {
        store.dispatch("user/setInfo", params);
      }
    }
  }
  if (roleType == 9 && to.path === '/home') {
    next(`/login?redirect`);
    return false;
  }
  //}
  next();
});


//全局后置钩子
router.afterEach((to, from) => {
  // 非ios设备，切换路由时候进行重新签名
  //if (window.__wxjs_is_wkwebview !== true) {}
  //if (window.__wxjs_is_wkwebview === true) {}
  //在不需要分享的页面统一处理
  if (to.meta.isShare === false) {
    function wxShareAppMessage() {
      let option = {
        title: "亲爱的用户您好", // 分享标题
        desc: "小Q智慧欢迎您的加入~", // 分享描述
        link: API_ROOT + "#/share", // 分享链接
        success: () => {},
        error: () => {}
      }
      wxapi.wxShareAppMessage(option);
    }
    wxapi.wxRegister(wxShareAppMessage);
  }

});

/* eslint-disable no-new */
new Vue({
  store,
  router,
  components: {
    App
  },
  template: '<App/>',
  mounted() {}
}).$mount('#app');
