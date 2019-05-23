export default [{
    path: '/personData',
    name: 'personData',
    component: () => import('@/views/personalCenter/personalData'),
    meta: {
      title: "个人资料",
      keepAlive: false,
      cookie: true,
    }
  }, {
    path: "/collection",
    name: 'collection',
    component: () => import('@/views/personalCenter/myCollection'),
    meta: {
      title: "我的收藏",
      keepAlive: false,
      cookie: true,
    }
  },
  {
    path: "/myDownload",
    name: 'myDownload',
    component: () => import('@/views/personalCenter/myDownload'),

    meta: {
      title: "我的下载",
      keepAlive: false,
      cookie: true,
    }
  },
  {
    path: "/mySchedule",
    name: 'mySchedule',
    component: () => import('@/views/personalCenter/mySchedule'),
    meta: {
      title: "我的课表",
      keepAlive: false,
      cookie: true,
    }
  },
  {
    path: "/myBraclet",
    name: 'myBraclet',
    component: () => import('@/views/personalCenter/myBraclet'),
    meta: {
      title: "我的手环",
      keepAlive: false,
      cookie: true,
    }
  },

]
