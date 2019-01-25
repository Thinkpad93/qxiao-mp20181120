import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from "js-cookie";
import weui from 'weui.js';

import {
  Popup,
  DatetimePicker,
  Tab,
  Tabs,
  Circle
} from 'vant';

import './assets/iconfont/iconfont.css';

Vue.prototype.$weui = weui; //weUI

Vue.config.productionTip = false;

Vue.use(Tab).use(Tabs).use(Circle).use(Popup).use(DatetimePicker);


router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  const roleType = Cookies.get('roleType');
  //这里进行路由权限控制
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
