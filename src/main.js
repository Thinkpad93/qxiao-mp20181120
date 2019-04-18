import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from "js-cookie";

import wxSdk from '@/config/wxsdk';

import '@/vantUI'; //vant UI


import VeLine from 'v-charts/lib/line.common';
Vue.component(VeLine.name, VeLine);


Vue.config.productionTip = false;

Vue.prototype.wxSdk = wxSdk;

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let openId = Cookies.get('openId');
  let roleType = Cookies.get('roleType');
  //这里进行路由权限控制
  if (!store.state.wx.openId && openId && roleType) {
    console.log("这里进行路由权限控制");
    wxSdk.wxShare(roleType);
    store.dispatch('users/getUserInfo');
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
  mounted() {}
}).$mount('#app');
