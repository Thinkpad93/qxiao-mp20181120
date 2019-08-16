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
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button type="info" size="large" class="no-radius">添加</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      studentName: "",
      classId: 1,
      classList: [
        { classId: 1, className: "清风" },
        { classId: 2, className: "大风" }
      ]
    };
  },
  methods: {
    //初始化设备库（只支持蓝牙设备）
    openWXDeviceLib() {
      //connType为blue时，表示蓝牙库
      WeixinJSBridge.invoke("openWXDeviceLib", { connType: "blue" }, function(
        res
      ) {
        console.log(res);
        console.log("res");
      });
    },
    //扫描设备（获取周围所有的设备列表，无论绑定还是未被绑定的设备都会扫描到）
    startScanWXDevice() {
      WeixinJSBridge.invoke(
        "startScanWXDevice",
        { connType: "blue", btVersion: "ble" },
        res => {
          console.log(res);
        }
      );
    },
    ///扫描到某个设备时触发，事件监听是不需要传参的
    onScanWXDeviceResult() {
      wx.on("onScanWXDeviceResult", res => {
        console.log(res);
        console.log("扫描到某个设备时触发");
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

