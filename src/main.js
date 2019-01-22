import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from "js-cookie";
import weui from 'weui.js';

import './assets/iconfont/iconfont.css';

Vue.prototype.$weui = weui; //weUI

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  const roleType = Cookies.get('roleType');
  //这里进行路由权限控制
  if (!store.getters.openId && Cookies.get('openId')) {
    console.log("Vuex");
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
