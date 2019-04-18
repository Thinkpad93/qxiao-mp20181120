export default [{
  path: '/single',
  name: 'single',
  component: () => import('@/views/single'),
  meta: {
    keepAlive: true,
    title: '小Q表现',
  }
}]
