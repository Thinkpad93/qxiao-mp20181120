export default [{
    path: '/course/view',
    name: 'courseView',
    component: () => import('@/views/course/view'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '课堂表现',
      roles: [1]
    }
  },
  {
    path: '/course/show',
    name: 'courseShow',
    component: () => import('@/views/course/show'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '课堂回顾',
    }
  }
]
