export default [{
    path: '/wisdom',
    name: 'wisdom',
    component: () => import('@/views/wisdom'),
    meta: {
      title: "小Q智慧",
      keepAlive: true,
      cookie: true,
    }
  },
  {
    path: '/wisdom/show',
    name: 'wisdomShow',
    component: () => import('@/views/wisdom/show'),
    meta: {
      title: "小Q智慧详情",
      keepAlive: true,
      cookie: true,
    }
  }
]
