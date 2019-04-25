export default [{
    path: '/examPaper',
    name: 'examPaper',
    component: () => import('@/views/examPaper'),
    meta: {
      title: "试卷列表",
      cookie: false,
      keepAlive: true,
    }
  },
  {
    path: "/examPaper/show",
    name: 'examPaperShow',
    component: () => import('@/views/examPaper/show'),
    meta: {
      title: "试卷详情",
      cookie: false,
      keepAlive: false,
    }
  }
]
