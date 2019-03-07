import service from "@/api";
import Cookies from 'js-cookie';

const state = {
  classList: [], //班级列表
  className: "", //班级名称
  classId: null, //班级ID
}

const mutations = {
  SET_CLASSLIST: (state, classList) => {
    state.classList = classList;
  },
  SET_CLASSNAME: (state, className) => {
    state.className = className;
  },
  SET_CLASSID: (state, classId) => {
    state.classId = classId;
  }
}

const actions = {
  async queryClassId({
    commit
  }, params) {
    return new Promise(async resolve => {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        let sliceClass = res.data.slice(0, 1); //原始数组不会被改变
        commit('SET_CLASSLIST', res.data);
        commit('SET_CLASSNAME', sliceClass[0].className);
        commit('SET_CLASSID', sliceClass[0].classId);
        Cookies.set('className', sliceClass[0].className);
        Cookies.set('classId', sliceClass[0].classId);
        resolve()
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
