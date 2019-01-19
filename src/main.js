import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import role from './directive'; //注册全局指令
import Cookies from "js-cookie";


import weui from 'weui.js';

Vue.prototype.$weui = weui; //weUI

Vue.config.productionTip = false;

import './assets/iconfont/iconfont.css';

const whiteList = ['/login'] // no redirect whitelist


router.beforeEach((to, from, next) => {
  if (!store.getters.openId && Cookies.get('openId')) {
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
  mounted() {}
}).$mount('#app');
