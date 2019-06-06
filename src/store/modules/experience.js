import service from "@/api";
const actions = {
  async experience({
    dispatch
  }, params) {
    return new Promise(async resolve => {
      let res = await service.myExperience(params);
      if (res.errorCode === 0) {
        resolve(res.data);
      }
    })
  }
}

export default {
  namespaced: true,
  actions
}
