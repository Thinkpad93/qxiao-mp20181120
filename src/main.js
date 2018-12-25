// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router'


import weui from 'weui.js';
Vue.prototype.$weui = weui;

//import MintUI from 'mint-ui';
//import 'mint-ui/lib/style.css';

//Vue.use(MintUI);



Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
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
    this.$store.dispatch('account/load');
  }
}).$mount('#app');
