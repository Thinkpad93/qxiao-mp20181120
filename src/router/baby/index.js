export default [{
    path: '/baby',
    component: () => import('@/views/baby'),
    meta: {
      keepAlive: true,
      title: '学生列表',
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
  }
]
