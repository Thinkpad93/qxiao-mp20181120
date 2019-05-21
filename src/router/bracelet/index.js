export default [{
  path: '/bracelet',
  name: 'bracelet',
  component: () => import('@/views/bracelet'),
  meta: {
    title: "我的手环",
    keepAlive: false,
    cookie: true,
  }
}]
