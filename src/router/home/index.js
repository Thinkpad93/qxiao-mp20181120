export default [{
  path: '/home',
  name: 'home',
  component: () => import('@/views/home'),
  meta: {
    keepAlive: true,
    title: '小Q智慧',
    roles: [1, 2, 3]
  }
}]
