export default [{
  path: '/',
  redirect: '/single'
}, {
  path: '/single',
  name: 'single',
  component: () => import('@/views/single'),
  meta: {
    keepAlive: true,
    cookie: true,
    title: '小Q表现',
  }
}]
