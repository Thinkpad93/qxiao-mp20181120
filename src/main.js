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
  let qx = Cookies.getJSON('qx');
  if (qx) {
    if (to.path === '/login') {
      next(`${from.path}`);
    } else {
      if (!store.getters.roleType && !store.getters.openId) {
        store.dispatch('account/load');
        next();
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect`);
    }
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
  mounted() {
    //this.$store.dispatch('account/load');
  }
}).$mount('#app');
