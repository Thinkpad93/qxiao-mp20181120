export default [{
    path: '/prize',
    name: 'prize',
    component: () => import('@/views/prize'),
    meta: {
      title: "奖励兑换",
      keepAlive: false,
      cookie: true,
    }
  },
  {
    path: "/prize/log",
    name: 'prizeLog',
    component: () => import('@/views/prize/log'),
    meta: {
      title: "兑换记录",
      keepAlive: false,
      cookie: true,
    }
  }
]
