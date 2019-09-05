export default [{
    path: '/device',
    name: "device",
    component: () => import('@/views/device'),
    meta: {
      title: "蓝牙设备",
      keepAlive: false,
      isShare: false,
    }
  },
  {
    path: '/device/search',
    name: "deviceSearch",
    component: () => import('@/views/device/search'),
    meta: {
      title: "蓝牙设备搜索",
      keepAlive: true,
      isShare: false,
    }
  },
]
