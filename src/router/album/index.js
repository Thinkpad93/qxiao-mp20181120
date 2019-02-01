export default [{
    path: '/album',
    component: () => import('@/views/album'),
    meta: {
      keepAlive: true,
      title: '相册空间',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/album/view',
    component: () => import('@/views/album/view'),
    meta: {
      keepAlive: true,
      title: '相册列表',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/album/show',
    component: () => import('@/views/album/show'),
    meta: {
      keepAlive: true,
      title: '相册详情',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/album/add',
    component: () => import('@/views/album/add'),
    meta: {
      keepAlive: false,
      title: '相册上传',
      roles: [2]
    }
  },
]
