export default [{
    path: '/',
    redirect: '/action'
  }, {
    path: '/action',
    name: 'action',
    component: () => import('@/views/action'),
    meta: {
      title: "行为管理",
      keepAlive: false,
      cookie: true
    }
  },
  {
    path: '/action/add',
    name: 'actionAdd',
    component: () => import('@/views/action/add'),
    meta: {
      title: "添加行为",
      keepAlive: false,
      cookie: true
    }
  },
  {
    path: '/action/edit',
    name: 'actionEdit',
    component: () => import('@/views/action/edit'),
    meta: {
      title: "编辑行为",
      keepAlive: false,
      cookie: true
    }
  },
  {
    path: '/actionHistory',
    name: 'actionHistory',
    component: () => import('@/views/action/history'),
    meta: {
      title: "历史行为",
      keepAlive: true,
      cookie: true
    }
  }
]
