import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouterMap = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/author',
    component: () => import('@/views/author'),
    meta: {
      keepAlive: false,
      title: '微信登陆中',
      roles: ['admin', 'teacher', 'patroarch']
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    meta: {
      keepAlive: true,
      title: '小Q智慧',
      roles: ['admin', 'teacher', 'patroarch']
    }
  },
  {
    path: '/baby',
    component: () => import('@/views/baby'),
    meta: {
      keepAlive: true,
      title: '学生信息',
      roles: ['patroarch']
    }
  },
  {
    path: '/baby/supply',
    component: () => import('@/views/baby/supply'),
    meta: {
      keepAlive: false,
      title: '完善学生信息',
      roles: ['patroarch']
    }
  },
  {
    path: '/baby/add',
    component: () => import('@/views/baby/add'),
    meta: {
      keepAlive: false,
      title: '学生添加',
      roles: ['patroarch']
    }
  },
  {
    path: '/community',
    component: () => import('@/views/community'),
    meta: {
      keepAlive: false,
      title: '班级圈发布',
      roles: ['teacher', 'patroarch']
    }
  },
  {
    path: '/my',
    component: () => import('@/views/my'),
    meta: {
      keepAlive: true,
      title: '我的',
      roles: ['admin', 'teacher', 'patroarch']
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      keepAlive: false,
      title: '登陆',
    }
  },
  {
    path: '/author',
    component: () => import('@/views/author'),
    meta: {
      title: '授权',
      roles: ['admin', 'teacher', 'patroarch']
    }
  },
  {
    path: '/schoolCreate',
    component: () => import('@/views/school/create'),
    meta: {
      keepAlive: false,
      title: '创建学校',
      roles: ['admin']
    }
  },
  {
    path: '/schoolJoin',
    component: () => import('@/views/school/join'),
    meta: {
      keepAlive: false,
      title: '学校加入',
      roles: ['teacher']
    }
  },
  {
    path: '/recipe',
    component: () => import('@/views/recipe'),
    meta: {
      keepAlive: true,
      title: '营养食谱',
    }
  },
  {
    path: '/homework',
    component: () => import('@/views/homework'),
    meta: {
      keepAlive: true,
      title: "亲子作业",
    }
  },
  {
    path: '/homework/show',
    component: () => import('@/views/homework/show'),
    meta: {
      keepAlive: true,
      title: "作业详情查看",
    }
  },
  {
    path: '/homework/add',
    component: () => import('@/views/homework/add'),
    meta: {
      keepAlive: false,
      title: "布置作业"
    }
  },
  {
    path: '/clock',
    component: () => import('@/views/clock'),
    meta: {
      keepAlive: true,
      title: '考勤管理'
    }
  },
  {
    path: '/clock/show',
    component: () => import('@/views/clock/show'),
    meta: {
      keepAlive: true,
      title: '考勤详情'
    }
  },
  {
    path: '/fresh',
    component: () => import('@/views/fresh'),
    meta: {
      keepAlive: true,
      title: '新鲜速报',
      roles: ['admin']
    }
  },
  {
    path: '/fresh/add',
    component: () => import('@/views/fresh/add'),
    meta: {
      keepAlive: false,
      title: '新鲜速报发布',
      roles: ['admin']
    }
  },
  {
    path: '/fresh/show',
    component: () => import('@/views/fresh/show'),
    meta: {
      keepAlive: true,
      title: '新鲜速报详情',
      roles: ['admin']
    }
  },
  {
    path: '/notice',
    component: () => import('@/views/notice'),
    meta: {
      keepAlive: true,
      title: '通知公告',
      roles: ['admin']
    }
  },
  {
    path: '/notice/add',
    component: () => import('@/views/notice/add'),
    meta: {
      keepAlive: false,
      title: '公告发布',
      roles: ['admin']
    }
  },
  {
    path: '/notice/show/:id',
    component: () => import('@/views/notice/show'),
    meta: {
      keepAlive: true,
      title: '公告详情',
      roles: ['admin']
    }
  },
  {
    path: '/teacher',
    component: () => import('@/views/teacher'),
    meta: {
      keepAlive: true,
      title: '老师管理',
      roles: ['admin']
    }
  },
  {
    path: '/teacher/add',
    component: () => import('@/views/teacher/add'),
    meta: {
      keepAlive: false,
      title: '老师添加',
      roles: ['admin']
    }
  },
  {
    path: '/teacher/edit/:id',
    component: () => import('@/views/teacher/edit'),
    meta: {
      keepAlive: false,
      title: '老师编辑',
      roles: ['admin']
    }
  },
  {
    path: '/class',
    component: () => import('@/views/class'),
    meta: {
      keepAlive: true,
      title: '班级管理',
      roles: ['admin']
    },
  },
  {
    path: '/class/add',
    component: () => import('@/views/class/add'),
    meta: {
      keepAlive: false,
      title: '班级添加',
      roles: ['admin']
    }
  },
  {
    path: '/class/edit/:id',
    component: () => import('@/views/class/edit'),
    meta: {
      keepAlive: true,
      title: '班级编辑',
      roles: ['admin']
    }
  },
  {
    path: '/student',
    component: () => import('@/views/student'),
    meta: {
      keepAlive: true,
      title: '学生管理',
      roles: ['teacher']
    },
  },
  {
    path: '/student/add',
    component: () => import('@/views/student/add'),
    meta: {
      keepAlive: false,
      title: '学生添加',
      roles: ['teacher']
    }
  },
  {
    path: '/student/edit/:id',
    component: () => import('@/views/student/edit'),
    meta: {
      keepAlive: false,
      title: '学生编辑',
      roles: ['teacher']
    }
  },
  {
    path: '/shuttle',
    component: () => import('@/views/shuttle'),
    meta: {
      keepAlive: true,
      title: '实时接送',
      roles: ['teacher']
    }
  },
  {
    path: '/album',
    component: () => import('@/views/album'),
    meta: {
      keepAlive: true,
      title: '班级相册',
      roles: ['admin', 'teacher', 'patroarch']
    }
  }
]

export default new Router({
  //mode: 'history',
  routes: constantRouterMap
})
