export default [{
    path: '/action',
    component: () => import('@/views/action'),
    meta: {
      title: "行为管理",
      keepAlive: true,
    }
  },
  {
    path: '/action/add',
    component: () => import('@/views/action/add'),
    meta: {
      title: "添加行为",
      keepAlive: false,
    }
  },
  {
    path: '/action/edit',
    component: () => import('@/views/action/edit'),
    meta: {
      title: "编辑行为",
      keepAlive: false,
    }
  },
  {
    path: '/actionHistory',
    component: () => import('@/views/action/history'),
    meta: {
      title: "历史行为",
      keepAlive: true,
    }
  }
]
