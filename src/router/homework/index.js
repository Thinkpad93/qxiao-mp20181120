export default [{
    path: '/homework',
    name: 'homework',
    component: () => import('@/views/homework'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: "亲子作业",
      roles: [1, 2, 3]
    }
  },
  {
    path: '/homework/show',
    name: 'homeworkShow',
    component: () => import('@/views/homework/show'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: "作业详情查看",
      roles: [1, 2, 3]
    }
  },
  {
    path: '/homework/add',
    name: 'homeworkAdd',
    component: () => import('@/views/homework/add'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: "布置作业",
      roles: [2]
    }
  },
  {
    path: '/homework/read',
    name: 'homeworkRead',
    component: () => import('@/views/homework/read'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: "作业阅读人数查询",
      roles: [2]
    }
  },
]
