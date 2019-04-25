export default [{
  path: '/remark',
  name: 'remark',
  component: () => import('@/views/remark'),
  meta: {
    keepAlive: true,
    cookie: true,
    title: '评语列表',
  }
}]
