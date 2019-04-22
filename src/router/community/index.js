export default [{
  path: '/community',
  name: 'community',
  component: () => import('@/views/community'),
  meta: {
    keepAlive: false,
    cookie: true,
    isShare: false,
    title: '班级圈发布',
    roles: [2, 3]
  }
}]
