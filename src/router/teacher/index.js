export default [{
    path: '/teacher',
    component: () => import('@/views/teacher'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '老师管理',
      roles: [1]
    }
  },
  {
    path: '/teacher/add',
    component: () => import('@/views/teacher/add'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '老师添加',
      roles: [1]
    }
  },
  {
    path: '/teacher/edit',
    component: () => import('@/views/teacher/edit'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '老师编辑',
      roles: [1]
    }
  },
]
