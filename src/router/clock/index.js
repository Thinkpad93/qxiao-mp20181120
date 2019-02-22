export default [{
    path: '/clock',
    component: () => import('@/views/clock'),
    meta: {
      keepAlive: true,
      title: '考勤管理',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/clock/show',
    component: () => import('@/views/clock/show'),
    meta: {
      keepAlive: true,
      title: '考勤详情',
      roles: [1, 2, 3]
    }
  },
]
