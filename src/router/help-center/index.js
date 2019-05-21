export default [{
    path: '/help-center',
    name: "helpCenter",
    component: () => import('@/views/help-center'),
    meta: {
      title: "帮助中心",
      keepAlive: true,
      cookie: true
    }
  },
  {
    path: '/help-center/view',
    name: "helpCenterView",
    component: () => import('@/views/help-center/view'),
    meta: {
      title: "使用帮助",
      keepAlive: true,
      cookie: true
    }
  },
]
