export default [{
  path: '/schedule',
  name: "schedule",
  component: () => import('@/views/schedule'),
  meta: {
    title: "课程表",
    keepAlive: true,
    isShare: false,
  }
}]
