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
    type: null //0 幼儿园  1 小学
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
    SET_TYPE: (state, type) => {
      state.type = type;
    },
  },
  actions: {
    async reload({
      dispatch
    }, params) {
      console.log("进来reload");
      if (Object.keys(params).length) {
        Cookies.set("openId", params.openId);
        Cookies.set("roleType", params.roleType);
        Cookies.set("photo", params.photo);
        Cookies.set("id", params.id);
        Cookies.set("classId", params.classId);
        Cookies.set("type", params.type);
        dispatch('get');
      }
    },
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
      commit,
      dispatch
    }) {
      return new Promise(async resolve => {
        commit('SET_ROLETYPE', Cookies.get('roleType'));
        commit('SET_TEL', Cookies.get('tel'));
        commit('SET_PHOTO', Cookies.get('photo'));
        commit('SET_OPENID', Cookies.get('openId'));
        commit('SET_ID', Cookies.get('id'));
        commit('SET_CLASSID', Cookies.get('classId'));
        commit('SET_CLASSNAME', Cookies.get('className'));
        commit('SET_TYPE', Cookies.get('type'));

        //提交班级查询
        dispatch('queryClassId', {
          id: Cookies.get('id'),
          roleType: Cookies.get('roleType')
        });

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
          commit('SET_CLASSLIST', res.data);
          commit('SET_CLASSNAME', res.data[0].className);
          commit('SET_CLASSID', res.data[0].classId);
          Cookies.set('className', res.data[0].className);
          Cookies.set('classId', res.data[0].classId);
          resolve();
        }
      });
    }
  }
}
