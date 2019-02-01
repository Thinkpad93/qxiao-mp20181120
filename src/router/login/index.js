export default [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login'),
  meta: {
    keepAlive: false,
    title: '登陆',
    roles: [1, 2, 3]
  }
}]