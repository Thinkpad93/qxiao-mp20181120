export default [{
  path: '/',
  redirect: '/single'
}, {
  path: '/single',
  name: 'single',
  component: () => import('@/views/single'),
  meta: {
    keepAlive: false,
    title: '小Q表现',
  }
}]
