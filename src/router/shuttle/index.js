export default [{
  path: '/shuttle',
  component: () => import('@/views/shuttle'),
  meta: {
    keepAlive: true,
    title: '实时接送',
    roles: [2]
  }
}, ]
