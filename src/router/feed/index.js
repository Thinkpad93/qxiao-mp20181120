export default [{
    path: '/feed',
    name: 'feed',
    component: () => import('@/views/feed'),
    meta: {
      title: "建议反馈",
      keepAlive: true,
      isShare: false,
    }
  },
  {
    path: '/feed/add',
    name: 'feedAdd',
    component: () => import('@/views/feed/add'),
    meta: {
      title: "新增反馈",
      keepAlive: false,
      isShare: false,
    }
  }
]
