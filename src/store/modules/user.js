import Cookies from 'js-cookie';

const state = {
  info: {}
};


const actions = {
  async setInfo({
    state,
    dispatch
  }, info) {
    if (Object.keys(info).length) {
      state.info = Object.assign({}, info);
      //设置Cookie
      Cookies.set('info', info);
      console.log("setInfo");
      await dispatch("queryClass/queryClassId", info, {
        root: true
      });
    } else {
      console.log("不用重复设置");
    }
  },
  async getInfo({
    state,
    dispatch
  }) {
    //Cookies.getJSON
    let info = Cookies.getJSON('info') || {};
    console.log("getInfo");
    if (Object.keys(info).length) {
      state.info = info;
      await dispatch("queryClass/queryClassId", info, {
        root: true
      });
    }
  }
}


export default {
  namespaced: true,
  state,
  actions
}
