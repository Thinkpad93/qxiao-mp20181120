export default [{
    path: '/',
    redirect: '/single'
  }, {
    path: '/single',
    name: 'single',
    component: () => import('@/views/single'),
    meta: {
      keepAlive: true,
      title: '小Q表现',
      isShare: false,
    }
  },
  {
    path: '/single/teacher',
    name: 'singleTeacher',
    component: () => import('@/views/single/teacher'),
    meta: {
      keepAlive: true,
      title: '小Q表现-老师端',
      isShare: false,
    }
  },
]
