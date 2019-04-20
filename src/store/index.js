import Vue from 'vue';
import Vuex from 'vuex';

import account from './modules/account';
import users from './modules/users';
import queryClass from './modules/queryClass';
import wx from './modules/wx';
import student from './modules/student';
import tel from './modules/tel';

import user from './modules/user';


Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    account,
    queryClass,
    wx,
    users,
    student,
    tel,
    user
  }
});

export default store;
