export default [{
    path: '/notice',
    component: () => import('@/views/notice'),
    meta: {
      keepAlive: true,
      isShare: false,
      title: '通知公告',
      roles: [1]
    }
  },
  {
    path: '/notice/add',
    component: () => import('@/views/notice/add'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '公告发布',
      roles: [1]
    }
  },
  {
    path: '/notice/show',
    component: () => import('@/views/notice/show'),
    meta: {
      keepAlive: true,
      isShare: true,
      title: '公告详情',
      roles: [1]
    }
  },
  {
    path: '/notice/read',
    component: () => import('@/views/notice/read'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '班级阅读情况',
      roles: [1]
    }
  },
]
