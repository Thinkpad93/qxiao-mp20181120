<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <div class="article-bd">
          <h3>步骤1：</h3>
          <p>确认手环处于工作状态</p>
          <h3>步骤2：</h3>
          <p>打开手机蓝牙-进入手机设置界面，点击蓝牙图标打开蓝牙。</p>
          <h3>步骤3：</h3>
          <p>请将手环贴近手机，手机会自动 查找查找，找到手环设备，点击 绑定，稍后会提示绑定成功。</p>
        </div>
      </article>
      <van-button type="default" @click="startScanWXDevice">扫描设备</van-button>
      <van-button type="default" @click="stopScanWXDevice">停止扫描设备</van-button>
    </div>
    <!-- <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button type="danger" size="large" @click="stopScanWXDevice">停止扫描设备</van-button>
        <van-button type="info" size="large" @click="startScanWXDevice">扫描设备</van-button>
      </div>
    </div>-->
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "braceletSearch",
  data() {
    return {
      deviceId: null //已连接的设备ID
    };
  },
  methods: {
    //初始化设备库（只支持蓝牙设备）
    openWXDeviceLib() {
      WeixinJSBridge.invoke("openWXDeviceLib", { connType: "blue" }, res => {
        console.log("openWXDeviceLib");
        console.log(res);
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
    //停止扫描设备
    stopScanWXDevice() {
      WeixinJSBridge.invoke("stopScanWXDevice", { connType: "blue" }, res => {
        console.log("停止扫描设备");
        console.log(res);
      });
    },
    //连接设备
    connectWXDevice() {
      WeixinJSBridge.invoke(
        "connectWXDevice",
        { deviceId: this.deviceId, connType: "blue" },
        res => {
          console.log("connectWXDevice");
          console.log(res);
        }
      );
    },
    onScanWXDeviceResult() {
      WeixinJSBridge.on("onScanWXDeviceResult", res => {
        console.log("onScanWXDeviceResult");
        console.log(res);
      });
    },
    //取得微信设备信息
    getWXDeviceInfos() {
      WeixinJSBridge.invoke("getWXDeviceInfos", {}, res => {
        //绑定设备总数量
        let deviceArray = res.deviceInfos;
        for (let i = 0; i < deviceArray.length; i++) {
          if (deviceArray[i].state === "connected") {
            this.deviceId = deviceArray[i].deviceId;
            break;
          }
        }
        console.log("getWXDeviceInfos");
        console.log(this.deviceId);
      });
    }
  },
  mounted() {
    console.log(WeixinJSBridge);
    console.log("WeixinJSBridge");
    //this.openWXDeviceLib();
    //this.getWXDeviceInfos();
    //this.onScanWXDeviceResult();
  }
};
</script>
<style lang="less" scoped>
</style>