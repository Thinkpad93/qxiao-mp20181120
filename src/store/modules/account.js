import service from "@/api";
import {
  clearAllCookie
} from "@/utils/cookies";
import Cookies from 'js-cookie';

export default {
  namespaced: true,
  actions: {
    //用户名登录
    async userTeleLogin({
      dispatch
    }, params) {
      return new Promise(async resolve => {
        let res = await service.userTeleLogin(params);
        if (res.errorCode === 0) {
          let {
            roleType
          } = res.data;
          let obj = {
            id: null,
            roleType
          };
          switch (roleType) {
            case 1:
              obj.id = res.data.schoolId;
              break;
            case 2:
              obj.id = res.data.teacherId;
              break;
            case 3:
              obj.id = res.data.patroarchId;
              break;
            case 4:
              obj.id = res.data.schoolId;
              break;
            case 5:
              obj.id = res.data.teacherId;
              break;
            default:
              console.log("default");
          }
          await dispatch('user/set', res.data, {
            root: true
          });
          await dispatch('user/queryClassId', obj, {
            root: true
          });
          resolve(res);
        } else if (res.errorCode === -1) {
          resolve(res);
        }
      });
      // return new Promise((resolve, reject) => {
      //   service.userTeleLogin(params).then(async res => {
      //     if (res.errorCode === 0) {
      //       let {
      //         roleType
      //       } = res.data;
      //       let obj = {
      //         id: null,
      //         roleType
      //       }
      //       switch (roleType) {
      //         case 1:
      //           obj.id = res.data.schoolId;
      //           break;
      //         case 2:
      //           obj.id = res.data.teacherId;
      //         case 4:
      //           obj.id = res.data.schoolId;
      //           break;
      //         case 5:
      //           obj.id = res.data.teacherId;
      //           break;
      //         default:
      //           console.log("default");
      //       }
      //       await dispatch('user/set', res.data, {
      //         root: true
      //       });
      //       await dispatch('user/queryClassId', obj, {
      //         root: true
      //       });
      //       console.log("101010");
      //       resolve(res);
      //     }
      //   }).catch(error => {
      //     reject(error);
      //   })
      // });
    },
    //用户退出
    logout() {
      return new Promise(resolve => {
        clearAllCookie(); //清队Cookie 
        resolve();
      })
    },
    load({
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
