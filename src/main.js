// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from 'js-cookie';

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
    } else if (to.path === '/schoolJoin' && store.getters.roleType === 1) {
      next(`${from.path}`);
    } else if (to.path === '/schoolCreate' && store.getters.schoolId) {
      next(`${from.path}`);
    } else {
      if (!store.getters.roleType && !store.getters.openId) {
        store.dispatch('user/get').then(res => {
          console.log(res);
        });
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
