export default [{
    path: '/works',
    name: 'works',
    component: () => import('@/views/works'),
    meta: {
      title: "作品展",
      keepAlive: true,
      cookie: true,
    }
  },
  {
    path: '/works/add',
    name: 'worksAdd',
    component: () => import('@/views/works/add'),
    meta: {
      title: "作品上传",
      keepAlive: false,
      cookie: true,
    }
  },
  {
    path: '/works/view',
    name: 'worksView',
    component: () => import('@/views/works/view'),
    meta: {
      title: "我的上榜作品",
      keepAlive: true,
      cookie: true,
    }
  }
]
