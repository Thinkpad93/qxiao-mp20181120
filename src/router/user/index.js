export default [{
    path: '/user',
    component: () => import('@/views/user'),
    meta: {
      title: "个人中心",
      keepAlive: true,
      cookie: true,
    }
  },
  {
    path: '/user/edit',
    component: () => import('@/views/user/edit'),
    meta: {
      title: "用户编辑",
      keepAlive: false,
      cookie: true,
    }
  }
]
