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
import homeworkRouterConfig from './home-work';
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
//import personalRouterConfig from './personal';
import worksRounterConfig from './works';
import roleRouterConfig from './role';
import personalityRouterConfig from './personality-plan';
import studyRouterConfig from './study-plan';
import helpRouterConfig from './help-center';
import aboutRouterConfig from './about';
import braceletRouterConfig from './bracelet';


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

  //...personalRouterConfig,
  ...worksRounterConfig,
  ...roleRouterConfig,
  ...personalityRouterConfig,
  ...studyRouterConfig,
  ...helpRouterConfig,
  ...aboutRouterConfig,
  ...braceletRouterConfig
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
