export default [{
    path: '/child',
    name: 'child',
    component: () => import('@/views/child'),
    meta: {
      title: "已关联孩子列表",
      keepAlive: false,
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
  },
  {
    path: "/child/view",
    name: 'childView',
    component: () => import('@/views/child/view'),
    meta: {
      title: "修改孩子信息",
      keepAlive: false,
      cookie: true,
    }
  },
  {
    path: "/child/edit",
    name: 'childEdit',
    component: () => import('@/views/child/edit'),
    meta: {
      title: "编辑孩子信息",
      keepAlive: false,
      cookie: true,
    }
  }
]
