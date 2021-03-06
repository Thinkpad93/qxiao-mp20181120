export default [{
    path: '/clock',
    name: 'clock',
    component: () => import('@/views/clock'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: '考勤管理',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/clock/show',
    name: 'clockShow',
    component: () => import('@/views/clock/show'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: '考勤详情',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/clock/day',
    name: 'clockDay',
    component: () => import('@/views/clock/day'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: '学生当天打卡记录',
      roles: [1, 2, 3]
    }
  },
]
