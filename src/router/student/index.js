export default [{
    path: '/student',
    component: () => import('@/views/student'),
    meta: {
      keepAlive: true,
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
]
