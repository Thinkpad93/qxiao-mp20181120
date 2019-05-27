export default [{
    path: '/study-plan',
    name: "studyPlan",
    component: () => import('@/views/study-plan'),
    meta: {
      title: "学习计划",
      keepAlive: true,
      cookie: true
    }
  },
  {
    path: '/study-plan/show',
    name: "studyPlanShow",
    component: () => import('@/views/study-plan/show'),
    meta: {
      title: "学习计划详情",
      keepAlive: true,
      cookie: true
    }
  },
]
