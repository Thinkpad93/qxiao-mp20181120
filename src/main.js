import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from 'js-cookie';
import role from './directive'; //注册全局指令
import service from "@/api";

import weui from 'weui.js';
Vue.prototype.$weui = weui;


Vue.config.productionTip = false;

const whiteList = ['/login'] // no redirect whitelist



// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title; //写入标题
//   let qx = Cookies.getJSON('qx');
//   //是否有Cookie存在
//   if (qx) {
//     //如果手动输入/login地址，则不跳转
//     if (to.path === '/login') {
//       next(`${from.path}`);
//     } else {
//       // 刷新页面，从cookie中获取数据存入vuex
//       if (!store.getters.roleType && !store.getters.openId) {
//         store.dispatch('user/get');
//         next();
//       }
//       next();
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next(`/login?redirect`);
//     }
//   }
// });

// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title; //写入标题
//   // 第一次访问
//   let qx = Cookies.getJSON('qx');
//   if (!store.getters.openId && !qx) {
//     console.log('授权登录');
//     service.registerUser({}).then(res => {
//       console.log(res);
//     });
//   } else {
//     if (to.path === '/login') {
//       next(`${from.path}`);
//     }
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   //写入标题
//   document.title = to.meta.title;
//   let openId = Cookies.get('openId');
//   if (openId && store.getters.openId) {
//     if (to.path === '/login') {
//       next(`${from.path}`);
//     } else {
//       //从cookie中获取数据存入vuex
//       if (!store.getters.roleType && !store.getters.openId) {
//         store.dispatch('user/get');
//         next();
//       }
//       next();
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next();
//     } else {
//       next(`/login?redirect`);
//     }
//   }
// });
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title;
//   let openId = Cookies.get('openId');
//   if (!store.getters.openId && to.path != '/author') {
//     next("/author");
//     return false;
//   } else if (!openId && !store.getters.openId) {
//     store.dispatch('user/get');
//     next();
//     return false;
//   }
//   next();
// });

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let openId = Cookies.get('openId');
  if (!openId && !store.getters.openId) {
    // 第一次访问
    service.registerUser().then(res => {
      if (res.errorCode === 0) {
        Cookies.set('openId', res.data.openId);
        next(`/login?redirect`);
      }
    }).catch(error => {
      console.log("error");
      console.log(error);
    })
    //next(`/login?redirect`);
  } else if (!store.getters.openId) {
    store.dispatch('user/get');
    next();
  } else {
    next(`/login?redirect`);
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
