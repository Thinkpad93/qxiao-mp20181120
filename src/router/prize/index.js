export default [{
    path: '/prize',
    component: () => import('@/views/prize'),
    meta: {
      title: "奖励兑换",
      keepAlive: true,
    }
  },
  {
    path: "/prize/log",
    component: () => import('@/views/prize/log'),
    meta: {
      title: "兑换记录",
      keepAlive: false,
    }
  }
]
