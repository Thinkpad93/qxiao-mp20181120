export default [{
    path: '/role',
    name: 'role',
    component: () => import('@/views/role'),
    meta: {
      keepAlive: false,
      cookie: true,
      title: '资料修改',
    }
  },
  {
    path: '/role/select',
    name: 'roleSelect',
    component: () => import('@/views/role/select'),
    meta: {
      keepAlive: false,
      cookie: true,
      title: '选择角色',
    }
  }
]
