export default [{
    path: '/works',
    name: 'works',
    component: () => import('@/views/works'),
    meta: {
      title: "作品展开",
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
      keepAlive: true,
      cookie: true,
    }
  }
]
