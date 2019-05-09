export default [{
    path: '/homeWork',
    name: 'homeWork',
    component: () => import('@/views/homeWork'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: "亲子作业",
      roles: [1, 2, 3]
    }
  },
  {
    path: '/homeWork/show',
    name: 'homeWorkShow',
    component: () => import('@/views/homeWork/show'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: "作业详情查看",
      roles: [1, 2, 3]
    }
  },
  {
    path: '/homeWork/add',
    name: 'homeWorkAdd',
    component: () => import('@/views/homeWork/add'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: "布置作业",
      roles: [2]
    }
  },
  {
    path: '/homeWork/read',
    name: 'homeWorkRead',
    component: () => import('@/views/homeWork/read'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: "作业阅读人数查询",
      roles: [2]
    }
  },
]
