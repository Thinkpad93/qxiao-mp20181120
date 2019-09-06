<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="list.length">
        <div class="cells mb-20">
          <div class="cell min-h120" v-for="item in list" :key="item.deviceId">
            <div class="cell-hd">
              <img src="@/assets/avatar-bg@2x.png" width="40" height="40" />
            </div>
            <div class="cell-bd text-right">
              <span style="color:#07c160;" v-if="item.state == 'connected'">已连接</span>
              <span style="color:#f44;" v-else-if="item.state == 'disconnected'">连接断开</span>
              <span style="color:#1989fa;" v-else-if="item.state == 'connecting'">连接中...</span>
            </div>
          </div>
        </div>
      </template>
      <div class="steps" v-else>
        <p>1.确认手环处于工作状态</p>
        <p>2.进入手机设置界面，打开蓝牙。</p>
        <p>3.点击添加设备，开始扫描找到手环设备，点击绑定，稍后会提示绑定成功。</p>
      </div>
      <!-- <van-button type="danger" @click="disconnectWXDevice">断开设备连接</van-button> -->
      <!-- <van-button type="info" @click="connectWXDevice">连接设备</van-button> -->
      <!-- <van-button type="danger" @click="sendDataToWXDevice('IwQBBAAQMQ==')">设置Q星值</van-button>
      <van-button type="danger" @click="sendDataToWXDevice('IwICBCc=')">获取Q星值</van-button>-->
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button type="info" size="large" class="no-radius" to="/device/search">添加设备</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      bluetooth: false,
      deviceId: null,
      list: [] //设备列表
    };
  },
  methods: {
    connectWXDevice(params) {
      let { state, deviceId } = params;
      //如果连接设备断开，则重新连接
      if (state === "disconnected") {
        if (!this.bluetooth) {
          this.$toast(`请先打开手机蓝牙再进行连接`);
        } else {
          //连接设备
          WeixinJSBridge.invoke(
            "connectWXDevice",
            { deviceId, connType: "blue" },
            res => {
              if (res.err_msg === "connectWXDevice:ok") {
                console.log("connectWXDevice");
                console.log(deviceId);
                this.getWXDeviceInfos();
              }
            }
          );
        }
      }
    },
    //断开设备连接
    disconnectWXDevice() {
      WeixinJSBridge.invoke(
        "disconnectWXDevice",
        { deviceId: this.deviceId, connType: "blue" },
        res => {
          console.log(res);
          console.log("断开设备连接1");
          if (res.err_msg === "disConnectWXDevice:ok") {
            console.log(this.deviceId);
            console.log("断开设备连接2");
          }
        }
      );
    },
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
    //取得微信设备信息
    //只有绑定成功后才有list列表数据返回
    getWXDeviceInfos() {
      WeixinJSBridge.invoke("getWXDeviceInfos", {}, res => {
        console.log(res);
        console.log("res");
        if (res.err_msg === "getWXDeviceInfos:ok") {
          //绑定设备总数量
          if (res.deviceInfos.length) {
            this.list = res.deviceInfos;
            this.deviceId = res.deviceInfos[0].deviceId;
            // for (let i = 0; i < res.deviceInfos.length; i++) {
            //   if (res.deviceInfos[i].state === "connected") {
            //     this.deviceId = res.deviceInfos[i].deviceId;
            //     break;
            //   }
            // }
          }
        }
      });
    },
    //发送数据给设备 发送的数据需要经过base64编码
    sendDataToWXDevice(base64 = "") {
      console.log(this.deviceId);
      WeixinJSBridge.invoke(
        "sendDataToWXDevice",
        {
          deviceId: this.deviceId,
          connType: "blue",
          base64Data: base64
        },
        res => {
          if (res.err_msg === "sendDataToWXDevice:ok") {
            this.$toast(`数据已发送`);
            console.log(base64);
          } else {
            this.$toast(`数据发送失败`);
          }
          console.log(res);
        }
      );
    },
    //接收到设备数据
    onReceiveDataFromWXDevice() {
      WeixinJSBridge.on("onReceiveDataFromWXDevice", res => {
        console.log("onReceiveDataFromWXDevice");
        console.log(res);
      });
    },
    //手机蓝牙状态改变事件
    onWXDeviceBluetoothStateChange() {
      WeixinJSBridge.on("onWXDeviceBluetoothStateChange", res => {
        console.log(res);
        console.log("手机蓝牙状态改变事件");
        let { state } = res;
        if (state === "on") {
          this.$toast(`蓝牙打开`);
          this.bluetooth = true;
        } else {
          this.$toast(`蓝牙已关闭`);
          this.bluetooth = false;
          this.disconnectWXDevice();
          //this.closeWXDeviceLib();
          //this.openWXDeviceLib();
        }
      });
    },
    //设备连接状态变化
    onWXDeviceStateChange() {
      WeixinJSBridge.on("onWXDeviceStateChange", res => {
        console.log(res);
        console.log("设备连接状态变化");
        let { state } = res;
        if (state === "connecting") {
          console.log("已连接");
        } else if (state === "connected") {
          console.log("连接断开");
        } else {
          console.log("连接断开");
        }
        this.getWXDeviceInfos();
      });
    },
    init() {
      this.onWXDeviceBluetoothStateChange();
      this.onWXDeviceStateChange();
    }
  },
  activated() {
    this.openWXDeviceLib();
    this.getWXDeviceInfos();
    this.init();
  }
};
</script>
<style lang="less" scoped>
.steps {
  padding: 30px;
  p {
    margin-bottom: 20px;
  }
}
</style>

