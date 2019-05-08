export default [{
    path: '/notice',
    name: 'notice',
    component: () => import('@/views/notice'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: '通知公告',
      roles: [1]
    }
  },
  {
    path: '/notice/add',
    name: 'noticeAdd',
    component: () => import('@/views/notice/add'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '公告发布',
      roles: [1]
    }
  },
  {
    path: '/notice/show',
    name: 'noticeShow',
    component: () => import('@/views/notice/show'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: '公告详情',
      roles: [1]
    }
  },
  {
    path: '/notice/read',
    name: 'noticeRead',
    component: () => import('@/views/notice/read'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '班级阅读情况',
      roles: [1]
    }
  },
]
