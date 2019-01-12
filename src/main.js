import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from 'js-cookie';
import role from './directive'; //注册全局指令

import weui from 'weui.js';

Vue.prototype.$weui = weui; //weUI

Vue.config.productionTip = false;

const whiteList = ['/login'] // no redirect whitelist


// 登录后跳转方法
Vue.prototype.goBeforeLoginUrl = () => {
  let url = Cookies.get('beforeLoginUrl');
  if (!url || url.indexOf('/author') != -1) {
    router.push('/login');
  } else {
    if (url == '/') {
      url = '/login'
    }
    router.push(url);
    Cookies.set('beforeLoginUrl', '');
  }
}

router.beforeEach((to, from, next) => {
  if (!Cookies.get('openId') && to.path != '/author') {
    // 第一次进入项目
    Cookies.set('beforeLoginUrl', to.fullPath) // 保存用户进入的url
    next('/author');
    return false;
  }
  if (to.path == '/author' && Cookies.get('openId')) {
    if (Cookies.get('roleType')) {
      next('/home');
    } else {
      next('/login');
    }
    return false;
  }
  if (!store.getters.openId && Cookies.get('openId')) {
    store.dispatch('user/get');
    next();
  }
  // if (to.path === '/login' && Cookies.get('openId') && store.getters.openId) {
  //   next(`${from.path}`);
  //   return false;
  // }
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
