export default [{
  path: '/user',
  component: () => import('@/views/user'),
  meta: {
    title: "个人中心",
    keepAlive: false,
    cookie: true,
  }
}]
