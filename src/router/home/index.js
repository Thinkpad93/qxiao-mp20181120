export default [{
  path: '/home',
  name: 'home',
  component: () => import('@/views/home'),
  meta: {
    keepAlive: true,
    isShare: false,
    title: '小Q班级',
  }
}]
