export default [{
  path: '/download',
  name: "download",
  component: () => import('@/views/download'),
  meta: {
    title: "我的下载",
    keepAlive: true,
    cookie: true
  }
}]
