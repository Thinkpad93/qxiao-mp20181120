export default [{
  path: '/shuttle',
  name: 'shuttle',
  component: () => import('@/views/shuttle'),
  meta: {
    keepAlive: true,
    isShare: false,
    title: '实时接送',
    roles: [2]
  }
}, ]
