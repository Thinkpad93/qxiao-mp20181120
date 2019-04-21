import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from "js-cookie";

import wxSdk from '@/config/wxsdk';

import '@/vantUI'; //vant UI


import VeLine from 'v-charts/lib/line.common';
Vue.component(VeLine.name, VeLine);


Vue.config.productionTip = false;

Vue.prototype.wxSdk = wxSdk;

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  console.log("路由");
  let _cookie = Cookies.getJSON('info') || {};
  //如果有cookie，刷新页面重新取出数据
  if (Object.keys(_cookie).length && !store.state.user.info) {
    store.dispatch("user/getInfo");
  }
  //如果没有Cookie
  // if (!Object.keys(_cookie).length && store.state.user.info) {
  //   //从地址栏获取后端返回的参数
  //   if (to.path !== '/login') {
  //     let paramsArr = location.href.match(/\?\S+/)[0].replace('?', '').split('&');
  //     let params = {};
  //     for (let i = 0; i < paramsArr.length; i++) {
  //       let tmp = paramsArr[i].split('=');
  //       params[tmp[0]] = tmp[1];	
  //     }
  //     //所有参数已经截取到
  //     if (Object.keys(params).length) {
  //       //重新设置值
  //       store.dispatch("user/setInfo", params);
  //     }
  //   }
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
  mounted() {
    // let paramsArr = location.href.split('&');
    // let params = {};
    // for (let i = 0; i < paramsArr.length; i++) {
    //   let tmp = paramsArr[i].split('=');
    //   params[tmp[0]] = tmp[1];
    // }
    // //第一次进入应用，判断是否有cookie存在
    // if (Cookies.getJSON("info")) {
    //   console.log("有cookie");
    // }
    // if (!Cookies.getJSON("info")) {
    //   console.log(params);
    // }
    // let paramsArr = location.href.split('&').length == 1 ? 1 : location.href.match(/\?\S+/)[0].replace('?', '').split('&');  
    // if (Cookies.getJSON('info')) {

    // }
    // let paramsArr = location.href.split('&').length == 1 ? 1 : location.href.match(/\?\S+/)[0].replace('?', '').split('&');
    // let params = {};
    // if (paramsArr == 1) {
    //   if (Cookies.get("info")) {
    //     console.log("10");
    //     this.$store.dispatch("user/getInfo");
    //   }
    // } else {
    //   if (!Cookies.get("info")) {
    //     for (let i = 0; i < paramsArr.length; i++) {
    //       let tmp = paramsArr[i].split('=');
    //       params[tmp[0]] = tmp[1];
    //     }
    //     console.log("20");
    //     this.$store.dispatch("user/setInfo", params);
    //   }
    // }
    // if (paramsArr.length) {
    //   for (let i = 0; i < paramsArr.length; i++) {
    //     let tmp = paramsArr[i].split('=');
    //     params[tmp[0]] = tmp[1];
    //   }
    //   if (params && Cookies.get("info")) {
    //     console.log("10");
    //     this.$store.dispatch("user/getInfo");
    //   }
    //   if (params && !Cookies.get("info")) {
    //     console.log("20");
    //     this.$store.dispatch("user/setInfo", params);
    //   }
    // }

  }
}).$mount('#app');
