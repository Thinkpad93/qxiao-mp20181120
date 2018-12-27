import Cookies from 'js-cookie';
import service from "@/api";

export default {
  namespaced: true,
  state: {
    classList: [], //相关班级
    className: "", //默认显示第一个班级名称
    classId: null, //默认显示第一个班级ID
    tel: "", //用户输入的手机号
    roleType: null, //角色类型
    openId: null, //微信 openId
    schoolCode: null, //学校ID码
    schoolId: null, //学校ID
    teacherId: null, //老师ID
    patroarchId: null //家长ID
  },
  mutations: {
    SET_CLASSLIST: (state, classList) => {
      state.classList = classList;
    },
    SET_CLASSNAME: (state, className) => {
      console.log(className);
      state.className = className;
    },
    SET_CLASSID: (state, classId) => {
      state.classId = classId;
    },
    SET_TEL: (state, tel) => {
      state.tel = tel;
    },
    SET_ROLETYPE: (state, roleType) => {
      state.roleType = roleType;
    },
    SET_OPENID: (state, openId) => {
      state.openId = openId;
    },
    SET_SCHOOLCODE: (state, schoolCode) => {
      state.schoolCode = schoolCode;
    },
    SET_SCHOOLID: (state, schoolId) => {
      state.schoolId = schoolId;
    },
    SET_TEACHERID: (state, teacherId) => {
      state.teacherId = teacherId;
    },
    SET_PATROARCHID: (state, patroarchId) => {
      state.patroarchId = patroarchId;
    }
  },
  actions: {
    set({
      commit,
      dispatch
    }, params) {
      return new Promise((resolve, reject) => {
        let {
          roleType,
          openId,
          tel,
          ...args
        } = params;
        if (roleType !== 0) {
          Cookies.set('qx', params);
          commit('SET_ROLETYPE', roleType);
          commit('SET_OPENID', openId);
          commit('SET_TEL', tel);
          //如果是园长登陆成功
          if ('schoolId' in args) {
            commit('SET_SCHOOLID', args.schoolId);
          }
          //如果是老师登陆成功
          if ('teacherId' in args) {
            commit('SET_SCHOOLID', args.teacherId);
          }
          //如果是家长登陆成功
          if ('patroarchId' in args) {
            commit('SET_PATROARCHID', args.patroarchId);
          }
          resolve();
        } else {
          resolve();
        }
      })
    },
    get({
      commit,
      dispatch
    }) {
      return new Promise(async resolve => {
        console.log("重新load");
        let qx = Cookies.getJSON('qx');
        let obj = {
          id: null,
          roleType: qx.roleType
        }
        switch (qx.roleType) {
          case 1:
            commit('SET_SCHOOLID', qx.schoolId);
            obj.id = qx.schoolId;
            break;
          case 2:
            commit('SET_TEACHERID', qx.teacherId);
            obj.id = qx.teacherId;
            break;
          case 4:
            commit('SET_SCHOOLID', qx.schoolId);
            obj.id = qx.schoolId;
            break;
          case 5:
            commit('SET_TEACHERID', qx.teacherId);
            obj.id = qx.teacherId;
            break;
        }
        commit('SET_ROLETYPE', qx.roleType);
        commit('SET_OPENID', qx.openId);
        await dispatch('queryClassId', obj);
        resolve();
      });
    },
    //根据类型查询相关班级
    queryClassId({
      commit
    }, params) {
      return new Promise(async resolve => {
        service.queryClassId(params).then(async res => {
          if (res.errorCode === 0) {
            let classMap = res.data.map(item => {
              return {
                label: item.className,
                value: item.classId
              };
            });
            let copy = classMap.slice(0, 1);
            console.log(copy);
            commit('SET_CLASSNAME', copy[0].label);
            commit('SET_CLASSID', copy[0].value);
            commit('SET_CLASSLIST', classMap);
            resolve();
          }
        });
      });
    },
    load({
      dispatch
    }) {
      return dispatch('get');
    }
  }
}
