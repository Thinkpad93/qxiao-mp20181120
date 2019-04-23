export default [{
  path: '/remark',
  name: 'remark',
  component: () => import('@/views/remark'),
  meta: {
    keepAlive: false,
    cookie: true,
    title: '评语',
  }
}]
