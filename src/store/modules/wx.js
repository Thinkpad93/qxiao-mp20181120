import Cookies from 'js-cookie';

const state = {
  openId: "oUQwt1e9wv4_CbA6YcI-pefbcQdo", //微信 openId
  photo: "", //微信头像
}

const mutations = {
  SET_PHOTO: (state, photo) => {
    state.photo = photo;
    Cookies.set('photo', photo);
  },
  SET_OPENID: (state, openId) => {
    state.openId = openId;
    Cookies.set('openId', openId);
  },
}

export default {
  namespaced: true,
  state,
  mutations
}
