import Cookies from 'js-cookie';

const state = {
    info: {}
};


const actions = {
    setInfo({ state, dispatch  }, info) {
        let { roleType, classId } = info;
        if (roleType || classId) {
            state.info = info;
            //设置Cookie
            Cookies.set('info', info);
        }else {
            console.log("不用重复设置")
        }
    },
    getInfo({ state, dispatch }) {
        //Cookies.getJSON
        let info =  Cookies.getJSON('info');
        console.log(info);
        if (Object.keys(info).length) {
            state.info = info;
        }
    }
}


export default {
    namespaced: true,
    state,
    actions
  }