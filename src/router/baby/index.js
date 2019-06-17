export default [{
    path: '/baby',
    name: 'baby',
    component: () => import('@/views/baby'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '学生列表',
      roles: [3]
    }
  },
  {
    path: '/baby/supply',
    name: 'babySupply',
    component: () => import('@/views/baby/supply'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '完善学生信息',
      roles: [3]
    }
  },
  {
    path: '/baby/add',
    name: 'babyAdd',
    component: () => import('@/views/baby/add'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '学生添加',
      roles: [3]
    }
  },
  {
<<<<<<< HEAD
=======
    path: '/baby/edit',
    name: 'babyEdit',
    component: () => import('@/views/baby/edit'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '学生信息',
      roles: [3]
    }
  },
  {
>>>>>>> open-dev
    path: '/baby/share',
    name: 'babyShare',
    component: () => import('@/views/baby/share'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '分享',
      roles: [3]
    }
  }
]
