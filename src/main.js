import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from 'js-cookie';
import role from './directive'; //注册全局指令

import weui from 'weui.js';

Vue.prototype.$weui = weui; //weUI

Vue.config.productionTip = false;

// 登录后跳转方法
Vue.prototype.goBeforeLoginUrl = () => {
  let url = Cookies.get('beforeLoginUrl')
  if (!url || url.indexOf('/author') != -1) {
    router.push('/login')
  } else {
    if (url == '/') {
      url = '/login';
    }
    router.push(url)
    Cookies.set('beforeLoginUrl', '')
  }
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (!Cookies.get('openId') && to.path != '/author') {
    // 保存用户进入的url
    //Cookies.set('beforeLoginUrl', to.fullPath);
    next('/author');
  } else if (!store.getters.openId && Cookies.get('openId')) {
    // 刷新页面获取数据存入vuex
    store.dispatch('user/get');
    next();
  } else if (to.path == '/author' && store.getters.openId) {
    next('/login');
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
