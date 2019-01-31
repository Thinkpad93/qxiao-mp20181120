import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouterMap = [{
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    meta: {
      keepAlive: true,
      title: '小Q智慧',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/baby',
    component: () => import('@/views/baby'),
    meta: {
      keepAlive: true,
      title: '学生信息',
      roles: [3]
    }
  },
  {
    path: '/baby/supply',
    name: 'supply',
    component: () => import('@/views/baby/supply'),
    meta: {
      keepAlive: false,
      title: '完善学生信息',
      roles: [3]
    }
  },
  {
    path: '/baby/add',
    component: () => import('@/views/baby/add'),
    meta: {
      keepAlive: false,
      title: '学生添加',
      roles: [3]
    }
  },
  {
    path: '/community',
    name: 'community',
    component: () => import('@/views/community'),
    meta: {
      keepAlive: false,
      title: '班级圈发布',
      roles: [2, 3]
    }
  },
  {
    path: '/my',
    component: () => import('@/views/my'),
    meta: {
      keepAlive: true,
      title: '我的',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/my/edit',
    component: () => import('@/views/my/edit'),
    meta: {
      keepAlive: false,
      title: '用户信息编辑',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      keepAlive: false,
      title: '登陆',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/schoolCreate',
    component: () => import('@/views/school/create'),
    meta: {
      keepAlive: false,
      title: '创建学校',
      roles: [1]
    }
  },
  {
    path: '/schoolJoin',
    component: () => import('@/views/school/join'),
    meta: {
      keepAlive: false,
      title: '学校加入',
      roles: [2]
    }
  },
  {
    path: '/recipe',
    component: () => import('@/views/recipe'),
    meta: {
      keepAlive: true,
      title: '营养食谱',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/recipe/add',
    component: () => import('@/views/recipe/add'),
    meta: {
      keepAlive: false,
      title: '营养食谱发布',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/recipe/show',
    component: () => import('@/views/recipe/show'),
    meta: {
      keepAlive: true,
      title: '营养食谱详情',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/homework',
    component: () => import('@/views/homework'),
    meta: {
      keepAlive: true,
      title: "亲子作业",
      roles: [1, 2, 3]
    }
  },
  {
    path: '/homework/show',
    component: () => import('@/views/homework/show'),
    meta: {
      keepAlive: true,
      title: "作业详情查看",
      roles: [1, 2, 3]
    }
  },
  {
    path: '/homework/add',
    component: () => import('@/views/homework/add'),
    meta: {
      keepAlive: false,
      title: "布置作业",
      roles: [2]
    }
  },
  {
    path: '/clock',
    component: () => import('@/views/clock'),
    meta: {
      keepAlive: true,
      title: '考勤管理',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/clock/show',
    component: () => import('@/views/clock/show'),
    meta: {
      keepAlive: true,
      title: '考勤详情',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/fresh',
    component: () => import('@/views/fresh'),
    meta: {
      keepAlive: true,
      title: '新鲜速报',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/fresh/add',
    component: () => import('@/views/fresh/add'),
    meta: {
      keepAlive: false,
      title: '新鲜速报发布',
      roles: [2]
    }
  },
  {
    path: '/fresh/show',
    component: () => import('@/views/fresh/show'),
    meta: {
      keepAlive: true,
      title: '新鲜速报详情',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/notice',
    component: () => import('@/views/notice'),
    meta: {
      keepAlive: true,
      title: '通知公告',
      roles: [1]
    }
  },
  {
    path: '/notice/add',
    component: () => import('@/views/notice/add'),
    meta: {
      keepAlive: false,
      title: '公告发布',
      roles: [1]
    }
  },
  {
    path: '/notice/show',
    component: () => import('@/views/notice/show'),
    meta: {
      keepAlive: true,
      title: '公告详情',
      roles: [1]
    }
  },
  {
    path: '/teacher',
    component: () => import('@/views/teacher'),
    meta: {
      keepAlive: false,
      title: '老师管理',
      roles: [1]
    }
  },
  {
    path: '/teacher/add',
    component: () => import('@/views/teacher/add'),
    meta: {
      keepAlive: false,
      title: '老师添加',
      roles: [1]
    }
  },
  {
    path: '/teacher/edit',
    component: () => import('@/views/teacher/edit'),
    meta: {
      keepAlive: false,
      title: '老师编辑',
      roles: [1]
    }
  },
  {
    path: '/class',
    component: () => import('@/views/class'),
    meta: {
      keepAlive: true,
      title: '班级管理',
      roles: [1]
    },
  },
  {
    path: '/class/edit',
    component: () => import('@/views/class/edit'),
    meta: {
      keepAlive: true,
      title: '班级编辑',
      roles: [1]
    }
  },
  {
    path: '/student',
    component: () => import('@/views/student'),
    meta: {
      keepAlive: false,
      title: '学生管理',
      roles: [2]
    },
  },
  {
    path: '/student/add',
    component: () => import('@/views/student/add'),
    meta: {
      keepAlive: false,
      title: '学生添加',
      roles: [2]
    }
  },
  {
    path: '/student/edit',
    component: () => import('@/views/student/edit'),
    meta: {
      keepAlive: false,
      title: '学生编辑',
      roles: [2]
    }
  },
  {
    path: '/shuttle',
    component: () => import('@/views/shuttle'),
    meta: {
      keepAlive: true,
      title: '实时接送',
      roles: [2]
    }
  },
  {
    path: '/album',
    component: () => import('@/views/album'),
    meta: {
      keepAlive: true,
      title: '相册空间',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/album/view',
    component: () => import('@/views/album/view'),
    meta: {
      keepAlive: true,
      title: '相册列表',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/album/show',
    component: () => import('@/views/album/show'),
    meta: {
      keepAlive: true,
      title: '相册详情',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/share',
    component: () => import('@/views/share'),
    meta: {
      keepAlive: true,
      title: '分享',
      roles: [1, 2, 3]
    }
  }
]

export default new Router({
  //mode: 'history',
  routes: constantRouterMap
})
