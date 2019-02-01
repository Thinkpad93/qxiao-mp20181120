export default [{
    path: '/schoolCreate',
    component: () => import('@/views/school/create'),
    meta: {
      keepAlive: false,
      title: '创建学校',
      roles: [1]
    }
  },
  {
    path: '/schoolJoin',
    component: () => import('@/views/school/join'),
    meta: {
      keepAlive: false,
      title: '学校加入',
      roles: [2]
    }
  }
]
