import Vue from 'vue';
import Vuex from 'vuex';


import queryClass from './modules/queryClass';
import user from './modules/user';


Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    queryClass,
    user
  }
});

export default store;
