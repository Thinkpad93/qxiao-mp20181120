export default [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login'),
  meta: {
    keepAlive: false,
    cookie: true,
    isShare: false,
    title: '登陆',
    roles: [1, 2, 3]
  }
}]
