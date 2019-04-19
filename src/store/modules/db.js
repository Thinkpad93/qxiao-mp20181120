import db from '@/utils/db';
import {
  cloneDeep
} from 'lodash';

const actions = {
  get(context) {
    return new Promise(resolve => {
      resolve(db.get('wx').write());
    });
  },
  set(context, params) {
    let {
      openId,
      photo,
      tel
    } = params;
    db.set('wx.openId', openId).write();
    db.set('wx.photo', photo).write();
    db.set('wx.tel', tel).write();
  }
};



export default {
  namespaced: true,
  actions
}
