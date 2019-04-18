export default [{
    path: '/class',
    name: 'class',
    component: () => import('@/views/class'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '班级管理',
      roles: [1]
    },
  },
  {
    path: '/class/edit',
     name: 'classEdit',
    component: () => import('@/views/class/edit'),
    meta: {
      keepAlive: true,
      isShare: false,
      title: '班级编辑',
      roles: [1]
    }
  },
]
