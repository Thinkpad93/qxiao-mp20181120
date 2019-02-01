export default [{
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
  }
]