export default [{
    path: '/teacher',
    name: 'teacher',
    component: () => import('@/views/teacher'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '老师管理',
      roles: [1]
    }
  },
  {
    path: '/teacher/add',
    name: 'teacherAdd',
    component: () => import('@/views/teacher/add'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: '老师添加',
      roles: [1]
    }
  },
  {
    path: '/teacher/edit',
    name: 'teacherEdit',
    component: () => import('@/views/teacher/edit'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '老师编辑',
      roles: [1]
    }
  },
]
