export default [{
  path: '/home',
  name: 'home',
  component: () => import('@/views/home'),
  meta: {
    keepAlive: false,
    cookie: true,
    isShare: false,
    title: '小Q班级',
    roles: [1, 2, 3]
  }
}]
