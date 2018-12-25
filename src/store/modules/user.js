import Cookies from 'js-cookie';


export default {
  namespaced: true,
  state: {
    tel: "", //用户输入的手机号
    roleType: null, //角色类型
    openId: null, //微信 openId
    schoolCode: null, //学校ID码
    schoolId: null, //学校ID
    teacherId: null, //老师ID
    patroarchId: null //家长ID
  },
  mutations: {
    SET_TEL: (state, tel) => {
      state.tel = tel;
    },
    SET_ROLETYPE: (state, roleType) => {
      state.roleType = roleType;
    },
    SET_OPENID: (state, openId) => {
      state.openId = openId;
    },
    SET_SCHOOLCODE: (state, schoolCode) => {
      state.schoolCode = schoolCode;
    },
    SET_SCHOOLID: (state, schoolId) => {
      state.schoolId = schoolId;
    },
    SET_TEACHERID: (state, teacherId) => {
      state.teacherId = teacherId;
    },
    SET_PATROARCHID: (state, patroarchId) => {
      state.patroarchId = patroarchId;
    }
  },
  actions: {
    set({
      commit,
      dispatch
    }, info) {
      return new Promise((resolve, reject) => {
        let {
          roleType,
          openId,
          tel,
          ...args
        } = info;
        Cookies.set('qx', info);
        commit('SET_ROLETYPE', roleType);
        commit('SET_OPENID', openId);
        commit('SET_TEL', tel);
        resolve();
      })
    },
    get({
      commit
    }) {
      return new Promise(resolve => {
        let qx = Cookies.getJSON('qx');
        commit('SET_ROLETYPE', qx.roleType);
        commit('SET_OPENID', qx.openId);
        commit('SET_SCHOOLID', qx.schoolId);
        resolve();
      });
    },
    load({
      state,
      dispatch
    }) {
      return dispatch('get');
    }
  }
}
