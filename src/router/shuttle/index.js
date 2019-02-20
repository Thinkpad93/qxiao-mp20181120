export default [{
  path: '/shuttle',
  component: () => import('@/views/shuttle'),
  meta: {
    keepAlive: false,
    title: '实时接送',
    roles: [2]
  }
}, ]
