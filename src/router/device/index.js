export default [{
  path: '/device',
  name: "device",
  component: () => import('@/views/device'),
  meta: {
    title: "蓝牙设备",
    keepAlive: true,
    isShare: false,
  }
}]
