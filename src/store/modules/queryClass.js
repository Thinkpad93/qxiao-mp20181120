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
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        commit('SET_CLASSLIST', res.data);
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
