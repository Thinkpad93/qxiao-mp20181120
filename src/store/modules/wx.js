const state = {
  openId: "oUQwt1XVT1Y0ohyXWNwrchLSYLa8", //微信openId
  photo: "", //微信头像
  tel: "" //用户手机号
}

const mutations = {
  SET_PHOTO: (state, photo) => {
    state.photo = photo;
  },
  SET_OPENID: (state, openId) => {
    state.openId = openId;
  },
  SET_TEL: (state, tel) => {
    state.tel = tel;
  },
}

export default {
  namespaced: true,
  state,
  mutations
}
