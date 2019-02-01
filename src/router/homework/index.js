export default [{
    path: '/homework',
    component: () => import('@/views/homework'),
    meta: {
      keepAlive: true,
      title: "亲子作业",
      roles: [1, 2, 3]
    }
  },
  {
    path: '/homework/show',
    component: () => import('@/views/homework/show'),
    meta: {
      keepAlive: true,
      title: "作业详情查看",
      roles: [1, 2, 3]
    }
  },
  {
    path: '/homework/add',
    component: () => import('@/views/homework/add'),
    meta: {
      keepAlive: false,
      title: "布置作业",
      roles: [2]
    }
  },
]
