import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from 'js-cookie';
import role from './directive'; //注册全局指令

import weui from 'weui.js';
Vue.prototype.$weui = weui;


Vue.config.productionTip = false;

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  document.title = to.meta.title; //写入标题
  let qx = Cookies.getJSON('qx');
  //是否有Cookie存在
  if (qx) {
    //如果手动输入/login地址，则不跳转
    if (to.path === '/login') {
      next(`${from.path}`);
    } else {
      if (!store.getters.roleType && !store.getters.openId) {
        store.dispatch('user/get');
        next();
      }
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect`);
    }
  }
});

router.afterEach((to, from, next) => {});

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
