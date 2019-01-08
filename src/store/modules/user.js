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
    photo: "", //微信头像
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
    SET_PHOTO: (state, photo) => {
      state.photo = photo;
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
    async set({
      commit
    }, params) {
      return new Promise(async resolve => {
        let {
          roleType,
          ...args
        } = params;
        if (roleType !== 0) {
          //如果是园长登陆成功
          if ('schoolId' in args) {
            Cookies.set('id', args.schoolId);
            commit('SET_ID', args.schoolId);
            //如果是老师登陆成功
          } else if ('teacherId' in args) {
            Cookies.set('id', args.teacherId);
            commit('SET_ID', args.teacherId);
            //如果是家长登陆成功
          } else if ('patroarchId' in args) {
            Cookies.set('id', args.patroarchId);
            commit('SET_ID', args.patroarchId);
          }
          //写入Cookie
          Cookies.set('roleType', roleType);
          //Cookies.set('openId', args.openId);
          Cookies.set('tel', args.tel);
          //提交commit
          commit('SET_ROLETYPE', roleType);
          //commit('SET_OPENID', args.openId);
          commit('SET_TEL', args.tel);
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
        let roleType = parseInt(Cookies.get('roleType'));
        let openId = Cookies.get('openId');
        let photo = Cookies.get('photo');
        let tel = Cookies.get('tel');
        let classId = parseInt(Cookies.get('classId'));
        let className = Cookies.get('className');
        let id = parseInt(Cookies.get('id'));
        commit('SET_ROLETYPE', roleType);
        commit('SET_TEL', tel);
        commit('SET_PHOTO', photo);
        commit('SET_OPENID', openId);
        commit('SET_ID', id);
        commit('SET_CLASSID', classId);
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
