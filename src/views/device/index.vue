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
              <span style="color:#f44;" v-else-if="item.state == 'disconnected'">未连接</span>
              <!-- <span v-else>无</span> -->
            </div>
          </div>
        </div>
      </template>
      <div class="empty" v-else>
        <img src="@/assets/kong.png" alt />
        <p class="mt-30">暂无手环列表</p>
      </div>
      <!-- <van-button type="danger" @click="sendDataToWXDevice('IwMC8AHR')">获取最近睡眠记录条目</van-button> -->
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button
          type="info"
          size="large"
          class="no-radius"
          to="/device/search"
          v-if="!list.length"
        >添加设备</van-button>
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
            for (let i = 0; i < res.deviceInfos.length; i++) {
              if (res.deviceInfos[i].state === "connected") {
                this.deviceId = res.deviceInfos[i].deviceId;
                break;
              }
            }
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
    }
  },
  mounted() {
    this.openWXDeviceLib();
    this.getWXDeviceInfos();
  }
};
</script>
<style lang="less" scoped>
</style>

