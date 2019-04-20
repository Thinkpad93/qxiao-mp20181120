import service from "@/api";

const state = {
  classList: [], //班级列表
}

const mutations = {
  SET_CLASSLIST: (state, classList) => {
    state.classList = classList;
  }
}

const actions = {
  //根据类型查询相关班级
  async queryClassId({
    commit
  }, params) {
    return new Promise(async resolve => {
      let {
        id,
        studentId,
        roleType
      } = params;
      let res = await service.queryClassId({
        id,
        studentId,
        roleType
      });
      if (res.errorCode === 0) {
        commit('SET_CLASSLIST', res.data);
        resolve();
      }
    });
  },
  //查询学生相关班级
  async queryStudentClass({
    commit
  }, params) {
    return new Promise(async resolve => {
      let res = await service.queryStudentClass(params);
      if (res.errorCode === 0) {
        commit('SET_CLASSLIST', res.data);
        resolve();
      }
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
