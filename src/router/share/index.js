export default [{
  path: '/share',
  component: () => import('@/views/share'),
  meta: {
    keepAlive: true,
    isShare: true,
    title: '分享',
    roles: [1, 2, 3]
  }
}]
