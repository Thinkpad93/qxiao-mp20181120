<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells mb-20">
        <div class="cell min-h120" v-for="item in deviceList" :key="item.state">
          <div class="cell-hd">
            <label class="label">当前设备</label>
          </div>
          <div class="cell-bd">
            <p class="text-right">{{ item.deviceId }}</p>
          </div>
        </div>
      </div>
      <!-- <article class="article">
        <div class="article-bd">
          <h3>步骤1：</h3>
          <p>确认手环处于工作状态</p>
          <h3>步骤2：</h3>
          <p>打开手机蓝牙-进入手机设置界面，点击蓝牙图标打开蓝牙。</p>
          <h3>步骤3：</h3>
          <p>请将手环贴近手机，手机会自动 查找查找，找到手环设备，点击 绑定，稍后会提示绑定成功。</p>
        </div>
      </article>-->
      <!-- <van-button type="default" @click="startScanWXDevice">扫描设备</van-button>
      <van-button type="default" @click="stopScanWXDevice">停止扫描设备</van-button>
      <van-button type="default" @click="getWXDeviceInfos">取得微信设备信息</van-button>-->
      <van-button type="danger" @click="startScanWXDevice">扫描设备</van-button>
      <!-- <van-button type="danger" @click="sendDataToWXDevice">发送数据给设备</van-button> -->
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
      bluetooth: false, //是否打开蓝牙
      deviceId: null, //设备ID
      deviceList: [], //设备列表
      openId: this.$store.state.user.info.openId
    };
  },
  methods: {
    //初始化设备库（只支持蓝牙设备）
    openWXDeviceLib() {
      WeixinJSBridge.invoke("openWXDeviceLib", { connType: "blue" }, res => {
        console.log("openWXDeviceLib");
        console.log(res);
        if (res.err_msg === "openWXDeviceLib:ok") {
          //使用前请先打开手机蓝牙
          if (res.bluetoothState === "off") {
            this.bluetooth = false;
            console.log("使用前请先打开手机蓝牙");
          }
          //用户没有授权微信使用蓝牙功能
          if (res.bluetoothState === "unauthorized") {
            this.bluetooth = false;
            console.log("请授权微信蓝牙功能并打开蓝牙");
          }
          //蓝牙已打开
          if (res.bluetoothState === "on") {
            this.bluetooth = true;
          }
        } else {
          this.bluetooth = false; //微信蓝牙打开失败
          console.log("微信蓝牙打开失败");
        }
      });
    },
    //关闭设备库
    closeWXDeviceLib() {
      WeixinJSBridge.invoke("closeWXDeviceLib", { connType: "blue" }, res => {
        if (res.err_msg === "closeWXDeviceLib:ok") {
          console.log("关闭设备库成功");
        } else {
          console.log("关闭设备库失败");
        }
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
      // let result = this.openWXDeviceLib();
      // if (result.isOpen) {
      //   let toast = this.$toast.loading({
      //     mask: true,
      //     duration: 0, // 持续展示 toast
      //     forbidClick: true, // 禁用背景点击
      //     message: "正在扫描设备..."
      //   });
      //   WeixinJSBridge.invoke(
      //     "startScanWXDevice",
      //     { connType: "blue", btVersion: "ble" },
      //     res => {
      //       console.log(res);
      //     }
      //   );
      // } else {
      //   this.$toast(`${result.message}`);
      // }
    },
    //停止扫描设备
    stopScanWXDevice() {
      WeixinJSBridge.invoke("stopScanWXDevice", { connType: "blue" }, res => {
        if (res.err_msg === "stopScanWXDevice:ok") {
          console.log("停止扫描设备");
          console.log(res);
        }
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
    //取得微信设备信息
    //只有绑定成功后才有list列表数据返回
    getWXDeviceInfos() {
      WeixinJSBridge.invoke("getWXDeviceInfos", {}, res => {
        //绑定设备总数量
        let deviceArray = res.deviceInfos;
        this.deviceList = deviceArray;
        for (let i = 0; i < deviceArray.length; i++) {
          if (deviceArray[i].state === "connected") {
            this.deviceId = deviceArray[i].deviceId;
            break;
          }
        }
        console.log("getWXDeviceInfos");
        console.log(res);
        console.log(this.deviceList);
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
    },
    //发送数据给设备 发送的数据需要经过base64编码
    async sendDataToWXDevice() {
      let str = "IwsC8QMAA1wqU0UAAJk="; //获取本地时间日期
      console.log(this.deviceId);
      //console.log(str);
      WeixinJSBridge.invoke(
        "sendDataToWXDevice",
        {
          deviceId: this.deviceId,
          connType: "blue",
          base64Data: str
        },
        res => {
          if (res.err_msg === "sendDataToWXDevice:ok") {
            this.$toast(`数据已发送`);
            console.log(str);
          } else {
            this.$toast(`数据发送失败`);
          }
          console.log(res);
        }
      );
    },
    //微信客户端设备绑定状态改变事件
    onWXDeviceBindStateChange() {
      WeixinJSBridge.on("onWXDeviceBindStateChange", res => {
        console.log(res);
        console.log("微信客户端设备绑定状态改变事件");
      });
    },
    //设备连接状态变化
    onWXDeviceStateChange() {
      WeixinJSBridge.on("onWXDeviceStateChange", res => {
        console.log(res);
        console.log("设备连接状态变化...");
      });
    },
    //接收到设备数据
    onReceiveDataFromWXDevice() {
      WeixinJSBridge.on("onReceiveDataFromWXDevice", res => {
        console.log("onReceiveDataFromWXDevice");
        console.log(res);
      });
    },
    //扫描到某个设备
    onScanWXDeviceResult() {
      WeixinJSBridge.on("onScanWXDeviceResult", res => {
        console.log("扫描到某个设备");
        console.log(res);
      });
    },
    //手机蓝牙状态改变事件
    onWXDeviceBluetoothStateChange() {
      WeixinJSBridge.on("onWXDeviceBluetoothStateChange", res => {
        let { state } = res;
        if (state === "on") {
          this.$toast(`蓝牙打开`);
        } else {
          this.$toast(`蓝牙已关闭`);
        }
      });
    },
    //设备查询接口
    async queryData(params = {}) {
      let res = await service.queryData(params);
      if (res.errorCode === 0) {
        console.log(res);
        console.log("设备查询接口");
      }
    }
  },
  mounted() {
    this.openWXDeviceLib();
    this.getWXDeviceInfos();
    this.onReceiveDataFromWXDevice();
    this.onWXDeviceBluetoothStateChange();
    this.onWXDeviceStateChange();
    this.onScanWXDeviceResult();
  }
};
</script>
<style lang="less" scoped>
</style>