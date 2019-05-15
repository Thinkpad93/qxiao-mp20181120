export default [{
    path: '/home-work',
    name: 'homeWork',
    component: () => import('@/views/home-work'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: "亲子作业",
      roles: [1, 2, 3]
    }
  },
  {
    path: '/home-work/show',
    name: 'homeWorkShow',
    component: () => import('@/views/home-work/show'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: "作业详情查看",
      roles: [1, 2, 3]
    }
  },
  {
    path: '/home-work/add',
    name: 'homeWorkAdd',
    component: () => import('@/views/home-work/add'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: "布置作业",
      roles: [2]
    }
  },
  {
    path: '/home-work/read',
    name: 'homeWorkRead',
    component: () => import('@/views/home-work/read'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: "作业阅读人数查询",
      roles: [2]
    }
  },
]
