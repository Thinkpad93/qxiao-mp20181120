export default [{
  path: '/share',
  name: 'share',
  component: () => import('@/views/share'),
  meta: {
    keepAlive: true,
    isShare: false,
    title: '分享',
    roles: [1, 2, 3]
  }
}]
