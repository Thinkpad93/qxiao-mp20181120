export default [{
    path: '/feed',
    name: 'feed',
    component: () => import('@/views/feed'),
    meta: {
      title: "师生互动",
      keepAlive: false,
      isShare: false,
    }
  },
  {
    path: '/feed/teacher',
    name: 'feedTeacher',
    component: () => import('@/views/feed/teacher'),
    meta: {
      title: "师生互动",
      keepAlive: false,
      isShare: false,
    }
  },
  {
    path: '/feed/add',
    name: 'feedAdd',
    component: () => import('@/views/feed/add'),
    meta: {
      title: "新增互动",
      keepAlive: false,
      isShare: false,
    }
  },
  {
    path: '/feed/view',
    name: 'feedView',
    component: () => import('@/views/feed/view'),
    meta: {
      title: "互动详情",
      keepAlive: false,
      isShare: false,
    }
  },
  // {
  //   path: '/feed/checkout',
  //   name: 'feedCheckout',
  //   component: () => import('@/views/feed/checkout'),
  //   meta: {
  //     title: "师生互动",
  //     keepAlive: false,
  //     isShare: false
  //   }
  // },
  // {
  //   path: '/feed/checkoutTeacher',
  //   name: 'feedCheckoutTeacher',
  //   component: () => import('@/views/feed/checkoutTeacher'),
  //   meta: {
  //     title: "师生互动",
  //     keepAlive: false,
  //     isShare: false
  //   }
  // }
]
