import Cookies from 'js-cookie';
import service from "@/api";

export default {
  namespaced: true,
  state: {
    classList: [], //相关班级
    id: null,
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
    SET_ID: (state, id) => {
      state.id = id;
    },
    SET_CLASSNAME: (state, className) => {
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
      console.log("林林要");
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
    async set({
      commit
    }, params) {
      return new Promise(async resolve => {
        let {
          roleType,
          openId,
          tel,
          ...args
        } = params;
        //如果后端返回 roleType 为 0 则不写入Cookie
        if (roleType !== 0) {
          Cookies.set('qx', params);
          commit('SET_ROLETYPE', roleType);
          commit('SET_OPENID', openId);
          commit('SET_TEL', tel);
          //如果是园长登陆成功
          if ('schoolId' in args) {
            Cookies.set('id', args.schoolId);
            commit('SET_ID', args.schoolId);
          }
          //如果是老师登陆成功
          if ('teacherId' in args) {
            Cookies.set('id', args.teacherId);
            commit('SET_ID', args.teacherId);
          }
          //如果是家长登陆成功
          if ('patroarchId' in args) {
            Cookies.set('id', args.patroarchId);
            commit('SET_ID', args.patroarchId);
          }
          resolve();
        } else {
          resolve();
        }
      })
    },
    async get({
      commit
    }) {
      return new Promise(async resolve => {
        let qx = Cookies.getJSON('qx');
        let classId = Cookies.get('classId');
        let className = Cookies.get('className');
        let id = Cookies.get('id');
        commit('SET_ROLETYPE', qx.roleType);
        commit('SET_TEL', qx.tel);
        commit('SET_OPENID', qx.openId);
        commit('SET_ID', parseInt(id));
        commit('SET_CLASSID', parseInt(classId));
        commit('SET_CLASSNAME', className);
        resolve();
      });
    },
    //根据类型查询相关班级
    async queryClassId({
      commit
    }, params) {
      return new Promise(async resolve => {
        let res = await service.queryClassId(params);
        if (res.errorCode === 0) {
          if (res.data.length) {
            let classMap = res.data.map(item => {
              return {
                label: item.className,
                value: item.classId
              }
            });
            let copy = classMap.slice(0, 1);
            commit('SET_CLASSLIST', classMap);
            commit('SET_CLASSNAME', copy[0].label);
            commit('SET_CLASSID', copy[0].value);
            Cookies.set('id', params.id);
            Cookies.set('classId', copy[0].value);
            Cookies.set('className', copy[0].label);
          }
          resolve();
        }
      });
    },
    load({
      dispatch
    }) {
      return dispatch('get');
    }
  }
}
