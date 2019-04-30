import Vue from 'vue';
import Router from 'vue-router';

import albumRouterConfig from './album';
import babyRouterConfig from './baby';
import classRouterConfig from './class';
import clockRouterConfig from './clock';
import communityRouterConfig from './community';
import freshRouterConfig from './fresh';
import homeRouterConfig from './home';
import loginRouterConfig from './login';
import homeworkRouterConfig from './homework';
import myRouterConfig from './my';
import noticeRouterConfig from './notice';
import recipeRouterConfig from './recipe';
import schoolRouterConfig from './school';
import shareRouterConfig from './share';
import shuttleRouterConfig from './shuttle';
import studentRouterConfig from './student';
import teacherRouterConfig from './teacher';

//2019-04-17
import singleRouterConfig from './single';
import actionRouterConfig from './action';
import prizeRouterConfig from './prize';
import wisdomRouterConfig from './wisdom';
import userRouterConfig from './user';
import childRouterConfig from './child';
import examPaperRouterConfig from './examPaper';
import scoreRouterConfig from './score';
import remarkRouterConfig from './remark';
import courseRouterConfig from './course';
import personalRouterConfig from './personal';
import worksRounterConfig from './works';

Vue.use(Router);

export const constantRouterMap = [
  ...albumRouterConfig,
  ...babyRouterConfig,
  ...classRouterConfig,
  ...clockRouterConfig,
  ...communityRouterConfig,
  ...freshRouterConfig,
  ...homeRouterConfig,
  ...loginRouterConfig,
  ...homeworkRouterConfig,
  ...myRouterConfig,
  ...noticeRouterConfig,
  ...recipeRouterConfig,
  ...schoolRouterConfig,
  ...shareRouterConfig,
  ...shuttleRouterConfig,
  ...studentRouterConfig,
  ...teacherRouterConfig,

  ...singleRouterConfig,
  ...actionRouterConfig,
  ...prizeRouterConfig,
  ...wisdomRouterConfig,
  ...userRouterConfig,
  ...childRouterConfig,
  ...examPaperRouterConfig,
  ...scoreRouterConfig,
  ...remarkRouterConfig,
  ...courseRouterConfig,

  ...personalRouterConfig,
  ...worksRounterConfig
]



export default new Router({
  routes: constantRouterMap,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
});
