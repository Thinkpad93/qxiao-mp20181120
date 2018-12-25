import service from "@/api";

export default {
  namespaced: true,
  actions: {
    //用户名登录
    userTeleLogin({
      commit,
      dispatch
    }, params) {
      return new Promise((resolve, reject) => {
        service.userTeleLogin(params).then(async res => {
          if (res.errorCode === 0) {
            await dispatch('user/set', res.data, {
              root: true
            });
          }
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      });
    },
    //用户退出
    logout() {

    },
    load({
      commit,
      dispatch
    }) {
      return new Promise(async resolve => {
        await dispatch('user/load', null, {
          root: true
        });
      })
    }
  }
}
