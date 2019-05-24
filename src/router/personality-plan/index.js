export default [{
    path: '/personality-plan',
    name: "personalityPlan",
    component: () => import('@/views/personality-plan'),
    meta: {
      title: "个性计划",
      keepAlive: true,
      cookie: true
    }
  },
  {
    path: '/personality-plan/show',
    name: "personalityPlanShow",
    component: () => import('@/views/personality-plan/show'),
    meta: {
      title: "个性计划详情查看",
      keepAlive: true,
      cookie: true
    }
  }
]
