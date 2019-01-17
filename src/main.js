import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from 'js-cookie';
import role from './directive'; //注册全局指令

import weui from 'weui.js';

Vue.prototype.$weui = weui; //weUI

Vue.config.productionTip = false;

import './assets/iconfont/iconfont.css';

const whiteList = ['/login'] // no redirect whitelist
const WXloginUrl = "http://23ti245684.imwork.net/qxiao-mp/action/mod-xiaojiao/manage/registerUser.do";

// 登录后跳转方法
// Vue.prototype.goBeforeLoginUrl = () => {
//   let url = Cookies.get('beforeLoginUrl');
//   if (!url || url.indexOf('/author') != -1) {
//     router.push('/login');
//   } else {
//     if (url == '/') {
//       url = '/login'
//     }
//     router.push(url);
//     Cookies.set('beforeLoginUrl', '');
//   }
// }

// router.beforeEach((to, from, next) => {
//   if (!Cookies.get('openId') && to.path != '/author') {
//     // 第一次进入项目
//     Cookies.set('beforeLoginUrl', to.fullPath) // 保存用户进入的url
//     next('/author');
//     return false;
//   }
//   if (to.path == '/author' && Cookies.get('openId')) {
//     if (Cookies.get('roleType')) {
//       next('/home');
//     } else {
//       next('/login');
//     }
//     return false;
//   }
//   if (!store.getters.openId && Cookies.get('openId')) {
//     store.dispatch('user/get');
//     next();
//   }
//   next();
// });


router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  const openId = Cookies.get('openId');
  const roleType = Cookies.get('roleType');
  if (!openId && to.path != '/login') {
    console.log('授权登录');
    next({
      name: 'login'
    });
    // 跳转到微信授权页面，微信授权地址通过服务端获得
    //window.location.href = WXloginUrl;
  } else if (openId && roleType) {
    store.dispatch('user/get');
    next()
  } else {
    alert("安卓机");
    next();
  }
});

router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
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
  mounted() {}
}).$mount('#app');
