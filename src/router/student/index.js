export default [{
    path: '/student',
    name: 'student',
    component: () => import('@/views/student'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '学生管理',
      roles: [2]
    },
  },
  {
    path: '/student/add',
    name: 'studentAdd',
    component: () => import('@/views/student/add'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '学生添加',
      roles: [2]
    }
  },
  {
    path: '/student/edit',
    name: 'studentEdit',
    component: () => import('@/views/student/edit'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '学生编辑',
      roles: [2]
    }
  },
]
