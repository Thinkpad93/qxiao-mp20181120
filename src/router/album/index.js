export default [{
    path: '/album',
    name: 'album',
    component: () => import('@/views/album'),
    meta: {
      keepAlive: true,
      isShare: false,
      title: '相册空间',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/album/view',
    name: 'albumView',
    component: () => import('@/views/album/view'),
    meta: {
      keepAlive: true,
      isShare: false,
      title: '相册列表',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/album/show',
    name: 'albumShow',
    component: () => import('@/views/album/show'),
    meta: {
      keepAlive: true,
      isShare: false,
      title: '相册详情',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/album/add',
    name: 'albumAdd',
    component: () => import('@/views/album/add'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '相册上传',
      roles: [2]
    }
  },
]
