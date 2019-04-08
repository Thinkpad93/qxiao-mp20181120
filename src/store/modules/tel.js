import Cookies from 'js-cookie';

const state = {
  tel: "", //用户输入的手机号
};

const mutations = {
  SET_TEL: (state, tel) => {
    state.tel = tel;
    Cookies.set('tel', tel);
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
