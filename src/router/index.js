import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouterMap = [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/author',
    component: () => import('@/views/author'),
    roles: ['admin', 'teacher', 'patroarch']
  }, {
    path: '/home',
    component: () => import('@/views/home'),
    meta: {
      title: '首页',
      roles: ['admin', 'teacher', 'patroarch']
    }
  }, {
    path: '/baby',
    component: () => import('@/views/baby'),
    roles: ['patroarch']
  }, {
    path: '/baby/supply',
    component: () => import('@/views/baby/supply'),
    meta: {
      title: '完善学生信息',
      roles: ['patroarch']
    }
  }, {
    path: '/baby/add',
    component: () => import('@/views/baby/add'),
    meta: {
      title: '学生添加',
      roles: ['patroarch']
    }
  }, {
    path: '/community',
    component: () => import('@/views/community'),
    meta: {
      title: '班级圈发布',
      roles: ['teacher', 'patroarch']
    }
  }, {
    path: '/my',
    component: () => import('@/views/my'),
    meta: {
      title: '我的',
      roles: ['admin', 'teacher', 'patroarch']
    }
  }, {
    path: '/parentMy',
    component: () => import('@/views/my/parentMy')
  }, {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      title: '登陆',
    }
  }, {
    path: '/author',
    component: () => import('@/views/author'),
    meta: {
      title: '授权',
      roles: ['admin', 'teacher', 'patroarch']
    }
  }, {
    path: '/schoolCreate',
    component: () => import('@/views/school/create'),
    meta: {
      title: '创建学校',
      roles: ['admin']
    }
  }, {
    path: '/schoolJoin',
    component: () => import('@/views/school/join'),
    meta: {
      title: '学校加入',
      roles: ['teacher']
    }
  }, {
    path: '/recipe',
    component: () => import('@/views/recipe'),
    meta: {
      title: '营养食谱',
    }
  }, {
    path: '/homework',
    component: () => import('@/views/homework'),
    meta: {
      title: "亲子作业",
    }
  }, {
    path: '/homework/show',
    component: () => import('@/views/homework/show'),
    meta: {
      title: "作业详情查看",
    }
  }, {
    path: '/homework/add',
    component: () => import('@/views/homework/add'),
    meta: {
      title: "布置作业"
    }
  }, {
    path: '/clock',
    component: () => import('@/views/clock'),
    meta: {
      title: '考勤管理'
    }
  }, {
    path: '/clock/show/:id',
    component: () => import('@/views/clock/show')
  }, {
    path: '/fresh',
    component: () => import('@/views/fresh'),
    meta: {
      title: '新鲜速报'
    }
  }, {
    path: '/fresh/add',
    component: () => import('@/views/fresh/add'),
    meta: {
      title: '新鲜速报发布'
    }
  }, {
    path: '/fresh/show',
    component: () => import('@/views/fresh/show'),
    meta: {
      title: '新鲜速报详情'
    }
  }, {
    path: '/notice',
    component: () => import('@/views/notice'),
    meta: {
      title: '通知公告'
    }
  }, {
    path: '/notice/add',
    component: () => import('@/views/notice/add'),
    meta: {
      title: '公告发布'
    }
  }, {
    path: '/notice/show/:id',
    component: () => import('@/views/notice/show'),
    meta: {
      title: '公告详情'
    }
  }, {
    path: '/notice/change',
    component: () => import('@/views/notice/change'),
    meta: {
      title: '发送对象'
    }
  }, {
    path: '/teacher',
    component: () => import('@/views/teacher'),
    meta: {
      title: '老师管理',
      roles: ['admin']
    }
  }, {
    path: '/teacher/add',
    component: () => import('@/views/teacher/add'),
    meta: {
      title: '老师添加'
    }
  }, {
    path: '/teacher/edit/:id',
    component: () => import('@/views/teacher/edit'),
    meta: {
      title: '老师编辑'
    }
  },
  {
    path: '/class',
    component: () => import('@/views/class'),
    meta: {
      title: '班级管理'
    },
    roles: ['admin']
  },
  {
    path: '/class/add',
    component: () => import('@/views/class/add'),
    meta: {
      title: '班级添加'
    }
  },
  {
    path: '/class/edit/:id',
    component: () => import('@/views/class/edit'),
    meta: {
      title: '班级编辑'
    }
  },
  {
    path: '/student',
    component: () => import('@/views/student'),
    meta: {
      title: '学生管理'
    },
    roles: ['teacher']
  },
  {
    path: '/student/add',
    component: () => import('@/views/student/add'),
    meta: {
      title: '学生添加'
    }
  },
  {
    path: '/student/edit/:id',
    component: () => import('@/views/student/edit')
  }, {
    path: '/album',
    component: () => import('@/views/album')
  }
]

export default new Router({
  //mode: 'history',
  routes: constantRouterMap
})
