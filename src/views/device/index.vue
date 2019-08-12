<template>
  <div class="page">
    <div class="page-bd">
      <div class="mt-20">
        <van-button type="info" size="large" @click="openWXDeviceLib">初始化设备库</van-button>
      </div>
      <div class="mt-20">
        <van-button type="info" size="large" @click="startScanWXDevice">扫描设备</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    //初始化设备库（只支持蓝牙设备）
    openWXDeviceLib() {
      WeixinJSBridge.invoke("openWXDeviceLib", {}, function(res) {
        console.log(res);
        console.log("res");
      });
    },
    //扫描设备（获取周围所有的设备列表，无论绑定还是未被绑定的设备都会扫描到）
    startScanWXDevice() {
      WeixinJSBridge.invoke("startScanWXDevice", { btVersion: "ble" }, res => {
        console.log(res);
      });
    },
    ///扫描到某个设备时触发
    onScanWXDeviceResult() {
      wx.on("onScanWXDeviceResult", res => {
        console.log(res);
        console.log("onScanWXDeviceResult");
      });
    }
  },
  mounted() {
    this.onScanWXDeviceResult();
  }
};
</script>
<style lang="less" scoped>
</style>

