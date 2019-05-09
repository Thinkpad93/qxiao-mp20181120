export default [{
    path: '/child',
    name: 'child',
    component: () => import('@/views/child'),
    meta: {
      title: "已关联孩子列表",
      keepAlive: true,
      cookie: true,
    }
  },
  {
    path: "/child/add",
    name: 'childAdd',
    component: () => import('@/views/child/add'),
    meta: {
      title: "添加孩子",
      keepAlive: false,
      cookie: true,
    }
  }
]
