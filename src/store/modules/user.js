import service from "@/api";

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
    //用户名登录
    userTeleLogin({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        service.userTeleLogin(params).then(res => {
          if (res.errorCode === 0) {
            let {
              roleType,
              openId
            } = res.data;
            commit('SET_ROLETYPE', roleType);
            commit('SET_OPENID', openId);
            switch (roleType) {
              case 1:
                commit('SET_SCHOOLID', res.data.schoolId);
              case 2:
                commit('SET_TEACHERID', res.data.teacherId);
                break;
              case 3:
                commit('SET_PATROARCHID', res.data.patroarchId);
            }
            resolve(res);
          } else if (res.errorCode === -1) {
            resolve(res);
          }
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}
