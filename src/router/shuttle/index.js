export default [{
  path: '/shuttle',
  name: 'shuttle',
  component: () => import('@/views/shuttle'),
  meta: {
    keepAlive: false,
    isShare: false,
    title: '实时接送',
    roles: [2]
  }
}, ]
