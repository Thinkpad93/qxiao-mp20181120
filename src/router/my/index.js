export default [{
    path: '/my',
    name: 'my',
    component: () => import('@/views/my'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '我的',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/my/edit',
    name: 'myEdit',
    component: () => import('@/views/my/edit'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '用户信息编辑',
      roles: [1, 2, 3]
    }
  }
]
