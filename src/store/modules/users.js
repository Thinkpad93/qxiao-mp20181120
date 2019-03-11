import Cookies from 'js-cookie';

const state = {
  id: null,
  tel: "", //用户输入的手机号
  roleType: null, //角色类型
  type: null, //0 幼儿园  1 小学
  isOpen: true, //老师是否可以发班级圈
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id;
  },
  SET_TEL: (state, tel) => {
    state.tel = tel;
  },
  SET_ROLETYPE: (state, roleType) => {
    state.roleType = roleType;
  },
  SET_TYPE: (state, type) => {
    state.type = type;
  },
  SET_ISOPEN: (state, isOpen) => {
    state.isOpen = isOpen === 'false' ? false : true;
  },
}

const actions = {
  //设置用户cookies
  saveUserInfo({
    commit
  }, params) {
    Object.keys(params).forEach(key => {
      Cookies.set(key, params[key]);
    });
    commit('SET_ID', params.id);
    commit('SET_ROLETYPE', params.roleType);
    commit('SET_TYPE', params.type);
    commit('SET_ISOPEN', params.isOpen);
  },
  //vuex刷新处理
  async getUserInfo({
    commit
  }) {
    commit('SET_ID', Cookies.get('id'));
    commit('SET_ROLETYPE', Cookies.get('roleType'));
    commit('SET_TYPE', Cookies.get('type'));
    commit('SET_ISOPEN', Cookies.get('isOpen'));
    commit('wx/SET_OPENID', Cookies.get('openId'), {
      root: true
    });
    commit('wx/SET_PHOTO', Cookies.get('photo'), {
      root: true
    });
    await dispatch('queryClass/queryClassId', {
      id: Cookies.get('id'),
      roleType: Cookies.get('roleType')
    }, {
      root: true
    })
  },
  //第二次登陆处理
  async reloadUserInfo({
    commit,
    dispatch
  }, params) {
    console.log("reloadUserInfo");
    dispatch('saveUserInfo', params);
    commit('wx/SET_OPENID', Cookies.get('openId'), {
      root: true
    });
    await dispatch('queryClass/queryClassId', {
      id: Cookies.get('id'),
      roleType: Cookies.get('roleType')
    }, {
      root: true
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
