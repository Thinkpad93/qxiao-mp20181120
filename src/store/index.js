import Vue from 'vue';
import Vuex from 'vuex';

import account from './modules/account';
import users from './modules/users';
import queryClass from './modules/queryClass';
import wx from './modules/wx';
import student from './modules/student';
import tel from './modules/tel';

Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    account,
    queryClass,
    wx,
    users,
    student,
    tel
  }
});

export default store;
