import Cookies from 'js-cookie';

const state = {
  id: null,
  tel: "", //用户输入的手机号
  roleType: null, //角色类型
  type: null, //0 幼儿园  1 小学
  isOpen: true, //老师是否可以发班级圈
  className: "", //班级名称
  classId: null, //班级ID
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
  SET_CLASSNAME: (state, className) => {
    state.className = className;
  },
  SET_CLASSID: (state, classId) => {
    state.classId = classId;
  }
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
    commit('SET_CLASSNAME', params.className);
    commit('SET_CLASSID', params.classId);
  },
  //vuex刷新处理
  async getUserInfo({
    commit,
    dispatch
  }) {
    let roleType = Cookies.get('roleType');
    commit('SET_ID', Cookies.get('id'));
    commit('SET_ROLETYPE', roleType);
    commit('SET_TYPE', Cookies.get('type'));
    commit('SET_ISOPEN', Cookies.get('isOpen'));
    commit('SET_CLASSNAME', Cookies.get('className'));
    commit('SET_CLASSID', Cookies.get('classId'));
    commit('wx/SET_OPENID', Cookies.get('openId'), {
      root: true
    });
    commit('wx/SET_PHOTO', Cookies.get('photo'), {
      root: true
    });
    commit('student/SET_STUDENTID', Cookies.get('studentId'), {
      root: true
    });
    //
    if (roleType == 3) {
      await dispatch('queryClass/queryStudentClass', {
        id: Cookies.get('id'),
        studentId: Cookies.get('studentId')
      }, {
        root: true
      })
    } else {
      await dispatch('queryClass/queryClassId', {
        id: Cookies.get('id'),
        roleType: Cookies.get('roleType')
      }, {
        root: true
      })
    }
  },
  //第二次登陆处理
  async reloadUserInfo({
    commit,
    dispatch
  }, params) {
    let {
      roleType
    } = params;
    console.log("第二次登陆处理");
    dispatch('saveUserInfo', params);
    commit('wx/SET_OPENID', Cookies.get('openId'), {
      root: true
    });
    commit('wx/SET_PHOTO', Cookies.get('photo'), {
      root: true
    });
    commit('student/SET_STUDENTID', Cookies.get('studentId'), {
      root: true
    });
    if (roleType == 3) {
      await dispatch('queryClass/queryStudentClass', {
        id: Cookies.get('id'),
        studentId: Cookies.get('studentId')
      }, {
        root: true
      })
    } else {
      await dispatch('queryClass/queryClassId', {
        id: Cookies.get('id'),
        roleType: Cookies.get('roleType')
      }, {
        root: true
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
