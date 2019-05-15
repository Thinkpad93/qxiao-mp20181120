export default [{
  path: '/study-plan',
  name: "studyPlan",
  component: () => import('@/views/study-plan'),
  meta: {
    title: "学习计划",
    keepAlive: true,
    cookie: true
  }
}]
