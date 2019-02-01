export default [{
    path: '/fresh',
    component: () => import('@/views/fresh'),
    meta: {
      keepAlive: true,
      title: '新鲜速报',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/fresh/add',
    component: () => import('@/views/fresh/add'),
    meta: {
      keepAlive: false,
      title: '新鲜速报发布',
      roles: [2]
    }
  },
  {
    path: '/fresh/show',
    component: () => import('@/views/fresh/show'),
    meta: {
      keepAlive: true,
      title: '新鲜速报详情',
      roles: [1, 2, 3]
    }
  },
]
