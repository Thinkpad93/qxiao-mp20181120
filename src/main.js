import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from "js-cookie";

import wxSdk from '@/config/wxsdk'; //微信sdk

import '@/vantUI'; //vant UI


Vue.config.productionTip = false;

Vue.prototype.wxSdk = wxSdk;


router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let {
    roleType,
    openId
  } = store.state.user.info;
  console.log("路由");
  let _cookie = Cookies.getJSON('info') || {};
  //获取地址栏参数
  function getUrl() {
    let href = decodeURIComponent(location.href);
    let num = href.indexOf('?');
    if (num != -1) {
      let paramsArr = href.match(/\?\S+/)[0].replace('?', '').split('&');
      let params = {};
      for (let i = 0; i < paramsArr.length; i++) {
        let tmp = paramsArr[i].split('=');
        params[tmp[0]] = tmp[1];
      }
      if (Object.keys(params).length) {
        return params || {};
      }
    } else {
      return -1;
    }
  }

  if (to.meta.cookie) {
    //第二次进来
    if (Object.keys(_cookie).length && !roleType) {
      console.log("有cookie");
      let pms = getUrl();
      if (pms != -1) {
        if (pms.openId || pms.roleType) {
          console.log(pms);
          console.log("pms");
          store.dispatch("user/setInfo", pms);
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
        let params = getUrl();
        if (params != -1) {
          store.dispatch("user/setInfo", params);
        }
      }
    }
    if (roleType == 9 && to.path === '/home') {
      next(`/login?redirect`);
      // next({
      //   path: '/login',
      //   query: {
      //     openId
      //   }
      // })
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
