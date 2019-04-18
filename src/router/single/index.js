export default [{
  path: '/single',
  name: 'single',
  component: () => import('@/views/single'),
  meta: {
    keepAlive: false,
    title: '小Q表现',
  }
}, ]
