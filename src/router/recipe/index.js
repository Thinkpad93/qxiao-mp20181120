export default [{
    path: '/recipe',
    component: () => import('@/views/recipe'),
    meta: {
      keepAlive: true,
      title: '营养食谱',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/recipe/add',
    component: () => import('@/views/recipe/add'),
    meta: {
      keepAlive: false,
      title: '营养食谱发布',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/recipe/show',
    component: () => import('@/views/recipe/show'),
    meta: {
      keepAlive: true,
      title: '营养食谱详情',
      roles: [1, 2, 3]
    }
  },
]
