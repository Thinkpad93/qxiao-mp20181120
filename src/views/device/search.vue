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
      <van-button type="default" @click="getWXDeviceInfos">取得微信设备信息</van-button>
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
      openWxDevice: false, //用户是否打开蓝牙设备
      deviceId: null, //已连接的设备ID
      deviceList: [] //设备列表
    };
  },
  methods: {
    //初始化设备库（只支持蓝牙设备）
    openWXDeviceLib() {
      let obj = {};
      WeixinJSBridge.invoke("openWXDeviceLib", { connType: "blue" }, res => {
        console.log("openWXDeviceLib");
        console.log(res);
        if (res.err_msg === "openWXDeviceLib:ok") {
          //使用前请先打开手机蓝牙
          if (res.bluetoothState === "off") {
            obj.isOpen = false;
            obj.message = "使用前请先打开手机蓝牙";
          }
          //用户没有授权微信使用蓝牙功能
          if (res.bluetoothState === "unauthorized") {
            obj.isOpen = false;
            obj.message = "请授权微信蓝牙功能并打开蓝牙";
          }
          //蓝牙已打开
          if (res.bluetoothState === "on") {
            obj.isOpen = true;
          }
        } else {
          obj.isOpen = false; //微信蓝牙打开失败
          obj.message = "微信蓝牙打开失败";
        }
      });
      return obj;
    },
    //扫描设备（获取周围所有的设备列表，无论绑定还是未被绑定的设备都会扫描到）
    startScanWXDevice() {
      let result = this.openWXDeviceLib();
      if (result.isOpen) {
        let toast = this.$toast.loading({
          mask: true,
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          message: "正在扫描设备..."
        });
        WeixinJSBridge.invoke(
          "startScanWXDevice",
          { connType: "blue", btVersion: "ble" },
          res => {
            console.log(res);
          }
        );
      } else {
        this.$toast(`${result.message}`);
      }
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
    },
    //获取操作凭证 type: 1.绑定设备 2.:解绑设备
    getWXDeviceTicket(type) {
      let obj = {
        deviceId: this.deviceId,
        type,
        connType: "blue"
      };
      WeixinJSBridge.invoke("getWXDeviceTicket", obj, res => {
        if (res.err_msg === "getWXDeviceTicket:ok") {
        }
      });
    }
  },
  mounted() {
    //console.log(WeixinJSBridge);
    //console.log("WeixinJSBridge");
    //this.openWXDeviceLib();
    //this.getWXDeviceInfos();
    //this.onScanWXDeviceResult();
  }
};
</script>
<style lang="less" scoped>
</style>