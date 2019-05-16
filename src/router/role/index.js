export default [{
  path: '/role',
  name: 'role',
  component: () => import('@/views/role'),
  meta: {
    keepAlive: false,
    cookie: true,
    title: '资料修改',
  }
}]
