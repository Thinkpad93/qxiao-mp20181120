import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from "js-cookie";
import {
  urlSearch
} from './utils/urlSearch';

import wxSdk from '@/config/wxsdk'; //微信sdk

import '@/vantUI'; //vant UI


Vue.config.productionTip = false;

Vue.prototype.wxSdk = wxSdk;


router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let {
    roleType
  } = store.state.user.info;
  let _cookie = Cookies.getJSON('info') || {};
  //获取地址栏参数
  let params = urlSearch();
  if (to.meta.cookie) {
    //第二次进来
    if (Object.keys(_cookie).length && !roleType) {
      //微信分享
      wxSdk.wxShare();
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
  }
  next();
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
