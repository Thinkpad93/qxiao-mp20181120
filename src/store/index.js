import Vue from 'vue';
import Vuex from 'vuex';

import account from './modules/account';
import users from './modules/users';
import queryClass from './modules/queryClass';
import wx from './modules/wx';

//import getters from './getters';
import state from './state';

Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    account,
    queryClass,
    wx,
    users
  },
  state
  //getters
});

export default store;
