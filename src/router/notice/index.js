export default [{
    path: '/notice',
    component: () => import('@/views/notice'),
    meta: {
      keepAlive: true,
      title: '通知公告',
      roles: [1]
    }
  },
  {
    path: '/notice/add',
    component: () => import('@/views/notice/add'),
    meta: {
      keepAlive: false,
      title: '公告发布',
      roles: [1]
    }
  },
  {
    path: '/notice/show',
    component: () => import('@/views/notice/show'),
    meta: {
      keepAlive: true,
      title: '公告详情',
      roles: [1]
    }
  },
]
