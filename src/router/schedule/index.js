export default [{
  path: '/schedule',
  name: "schedule",
  component: () => import('@/views/schedule'),
  meta: {
    title: "我的课表",
    keepAlive: true,
    isShare: false,
  }
}]
