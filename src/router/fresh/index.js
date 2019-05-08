export default [{
    path: '/fresh',
    name: 'fresh',
    component: () => import('@/views/fresh'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: '新鲜速报',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/fresh/add',
    name: 'freshAdd',
    component: () => import('@/views/fresh/add'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '新鲜速报发布',
      roles: [2]
    }
  },
  {
    path: '/fresh/show',
    name: 'freshShow',
    component: () => import('@/views/fresh/show'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: '新鲜速报详情',
      roles: [1, 2, 3]
    }
  },
]
