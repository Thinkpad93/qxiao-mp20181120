import service from "@/api";

// actions
const actions = {
  //用户名登录
  async userTeleLogin({
    dispatch
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
        //写入cookie
        await dispatch('user/set', res.data, {
          root: true
        });
        //这里首次不会执行 roleType 为 4
        //提交班级查询 obj = { id, roleType }
        if (obj.roleType === 1 || obj.roleType === 2 || obj.roleType === 3) {
          await dispatch('user/queryClassId', obj, {
            root: true
          });
        }
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
