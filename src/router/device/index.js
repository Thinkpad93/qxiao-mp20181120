export default [{
    path: '/device',
    name: "device",
    component: () => import('@/views/device'),
    meta: {
      title: "手环设备列表",
      keepAlive: true,
      isShare: false,
    }
  },
  {
    path: '/device/search',
    name: "deviceSearch",
    component: () => import('@/views/device/search'),
    meta: {
      title: "设备搜索",
      keepAlive: true,
      isShare: false,
    }
  },
]
