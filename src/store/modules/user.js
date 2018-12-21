import service from "@/api";
import router from '@/router';

export default {
  namespaced: true,
  state: {
    tel: "", //用户输入的手机号
    id: null, //有可能是家长ID 老师ID  园长ID
    roleType: null, //角色类型
    openId: null, //微信 openId
    schoolCode: null, //学校ID码
    schoolId: null //学校ID
  },
  mutations: {
    SET_TEL: (state, tel) => {
      state.tel = tel;
    },
    SET_ID: (state, id) => {
      state.id = id;
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
              id,
              openId
            } = res.data;
            commit('SET_ID', id);
            commit('SET_ROLETYPE', roleType);
            commit('SET_OPENID', openId);
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
