export default [{
    path: '/schedule',
    name: "schedule",
    component: () => import('@/views/schedule'),
    meta: {
      title: "课程表",
      keepAlive: true,
      isShare: false,
    }
  },
  {
    path: '/schedule/add',
    name: "scheduleAdd",
    component: () => import('@/views/schedule/add'),
    meta: {
      title: "自制课程表",
      keepAlive: false,
      isShare: false,
    }
  },
  {
    path: '/schedule/edit',
    name: "scheduleEdit",
    component: () => import('@/views/schedule/edit'),
    meta: {
      title: "编辑自制课程表",
      keepAlive: true,
      isShare: false,
    }
  }
]
