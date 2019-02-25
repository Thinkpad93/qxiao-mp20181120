import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from "js-cookie";

import './assets/iconfont/iconfont.css';
import './assets/iconfonts/iconfont.css';

Vue.config.productionTip = false;

// import FastClick from 'fastclick'; // 引入插件
// FastClick.attach(document.body); // 使用 fastclick

import {
  Checkbox,
  CheckboxGroup,
  Switch,
  Dialog,
  Popup,
  Picker,
  DatetimePicker,
  Tab,
  Tabs,
  Circle
} from 'vant';




Vue.use(CheckboxGroup)
  .use(Checkbox)
  .use(Switch)
  .use(Dialog)
  .use(Tab)
  .use(Tabs)
  .use(Circle)
  .use(Popup)
  .use(Picker)
  .use(DatetimePicker);


router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  //这里进行路由权限控制
  if (!store.getters.openId && Cookies.get('openId')) {
    console.log("这里进行路由权限控制");
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
