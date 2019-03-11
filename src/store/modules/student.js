import Cookies from 'js-cookie';

const state = {
  studentId: null //学生Id 
}

const mutations = {
  SET_STUDENTID: (state, studentId) => {
    state.studentId = studentId;
  },
}

const actions = {
  saveStudnetId({
    commit
  }, studentId) {
    if (studentId) {
      Cookies.set('studentId', studentId);
      commit('SET_STUDENTID', studentId);
    }
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
