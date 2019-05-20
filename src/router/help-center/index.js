export default [{
  path: '/help-center',
  name: "helpCenter",
  component: () => import('@/views/help-center'),
  meta: {
    title: "帮助中心",
    keepAlive: true,
    cookie: true
  }
}]
