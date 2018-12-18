// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store';
import router from './router'


import weui from 'weui.js';

//import MintUI from 'mint-ui';
//import 'mint-ui/lib/style.css';

//Vue.use(MintUI);

Vue.prototype.$weui = weui;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
