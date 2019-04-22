export default [{
  path: '/shuttle',
  name: 'shuttle',
  component: () => import('@/views/shuttle'),
  meta: {
    keepAlive: false,
    cookie: true,
    isShare: false,
    title: '实时接送',
    roles: [2]
  }
}]
