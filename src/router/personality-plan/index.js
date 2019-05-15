export default [{
  path: '/personality-plan',
  name: "personalityPlan",
  component: () => import('@/views/personality-plan'),
  meta: {
    title: "个性计划",
    keepAlive: true,
    cookie: true
  }
}]
