import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from "js-cookie";

import './assets/iconfont/iconfont.css';
import './assets/iconfonts/iconfont.css';

import wxSdk from '@/config/wxsdk';

import '@/vant'; //vant UI



Vue.config.productionTip = false;

Vue.prototype.wxSdk = wxSdk;




router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let roleType = Cookies.get('roleType');
  let openId = Cookies.get('openId');
  if (!store.getters.openId && openId) {
    console.log("这里进行路由权限控制");
    wxSdk.wxShare(roleType);
    store.dispatch('user/get');
    next();
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
  mounted() {

  }
}).$mount('#app');
