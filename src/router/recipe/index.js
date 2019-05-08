export default [{
    path: '/recipe',
    name: 'recipe',
    component: () => import('@/views/recipe'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: '营养食谱',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/recipe/add',
    name: 'recipeAdd',
    component: () => import('@/views/recipe/add'),
    meta: {
      keepAlive: false,
      cookie: true,
      isShare: false,
      title: '营养食谱发布',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/recipe/show',
    name: 'recipeShow',
    component: () => import('@/views/recipe/show'),
    meta: {
      keepAlive: true,
      cookie: true,
      isShare: false,
      title: '营养食谱详情',
      roles: [1, 2, 3]
    }
  },
]
