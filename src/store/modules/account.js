import service from "@/api";

const actions = {
  //用户登录
  //roleType 1-园长 2-老师 3-学生 
  async userTeleLogin({
    commit
  }, params) {
    return new Promise(async resolve => {
      let res = await service.userTeleLogin(params);
      if (res.errorCode === 0) {
        let obj = {
          roleType: res.data.roleType
        };
        if (obj.roleType === 0) {
          obj.id = res.data.id;
        } else if (obj.roleType === 1 || obj.roleType === 4) {
          obj.id = res.data.schoolId;
        } else if (obj.roleType === 2 || obj.roleType === 5) {
          obj.id = res.data.teacherId;
        } else if (obj.roleType === 3) {
          obj.id = res.data.patroarchId;
        }

        commit('users/SET_ID', obj.id, {
          root: true
        });

        resolve(res);
      } else if (res.errorCode === -1) {
        resolve(res);
      }
    })
  }
}

export default {
  namespaced: true,
  actions
}
