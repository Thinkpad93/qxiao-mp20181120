<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="deviceId">
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
        <div class="cells">
          <div class="cell min-h120">
            <div class="cell-hd">
              <label class="label">转码</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入base64转码后的字符串" v-model.trim="base64" />
            </div>
          </div>
        </div>
        <p class="text-right">
          <van-button type="warning" size="normal" @click="run">发送</van-button>
        </p>
      </template>
      <div class="steps" v-else>
        <!-- <p>1.确认手环处于工作状态</p>
        <p>2.进入手机设置界面，打开蓝牙。</p>
        <p>3.点击添加设备，开始扫描找到手环设备，点击绑定，稍后会提示绑定成功。</p>-->
      </div>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <!-- <van-button type="danger" size="large" class="no-radius" @click="unBindDevice">手环设备解绑</van-button> -->
        <!-- <van-button type="info" size="large" class="no-radius" @click="handleAddDevice">添加设备</van-button> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import service from "@/api";
export default {
  name: "device",
  data() {
    return {
      base64: "",
      bluetooth: false, //是否打开蓝牙
      deviceId: null, //设备ID
      list: [] //设备列表
    };
  },
  computed: {
    ...mapState("user", {
      openId: state => state.info.openId,
      studentId: state => state.info.studentId,
      isBindBracelet: state => state.info.isBindBracelet // 0未绑定手环 1绑定
    })
  },
  methods: {
    //循环调用
    run() {
      let deviceId = this.deviceId;
      let map = [{ key: "IwICBSY=" }];
      for (let i in map) {
        let base64Data = map[i].key; //key
        this.sendDataToWXDevice(deviceId, base64Data);
      }
      // let base64Data = this.base64;
      // if (base64Data == "") {
      //   this.$toast(`请输入base64转码后的字符串`);
      // } else {
      //   this.sendDataToWXDevice(deviceId, base64Data);
      // }
    },
    //单个调用
    single(base64Data = "") {
      let deviceId = this.deviceId;
      this.sendDataToWXDevice(deviceId, base64Data);
    },
    //数字转十六进制字符串
    numberToByt(num) {
      for (let i = 0; i < num; i++) {
        let n = `0x` + i.toString(16);
        console.log(n);
      }
    },
    handleAddDevice() {
      //if (this.studentId == 0) {
      //this.$toast("您尚未关注小孩，请先关注");
      //} else {
      this.$router.push({
        path: "/device/search"
      });
      //}
    },
    //手环设备解绑
    unBindDevice() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要解绑设备吗？"
        })
        .then(() => {
          let obj = {
            deviceId: this.deviceId,
            type: 2, //2表示解除绑定
            connType: "blue"
          };
          WeixinJSBridge.invoke("getWXDeviceTicket", obj, res => {
            //操作凭证
            let { ticket } = res;
            if (res.err_msg === "getWXDeviceTicket:ok") {
              console.log(res);
              console.log("开始解绑");
              //开始解绑
              let params = {
                deviceId: this.deviceId,
                openId: this.openId,
                ticket
              };
              service.unBindDevice(params).then(res => {
                if (res.errorCode === 0) {
                  this.$dialog
                    .alert({
                      title: "提示",
                      message: "解除绑定成功"
                    })
                    .then(() => {
                      this.getWXDeviceInfos();
                    });
                } else {
                  console.log("解除绑定失败");
                }
              });
            }
          });
        });
    },
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
          } else {
            this.list = [];
          }
        }
      });
    },
    //发送数据给设备 发送的数据需要经过base64编码
    sendDataToWXDevice(deviceId, base64Data = "") {
      console.log(this.deviceId);
      WeixinJSBridge.invoke(
        "sendDataToWXDevice",
        {
          deviceId,
          connType: "blue",
          base64Data
        },
        res => {
          if (res.err_msg === "sendDataToWXDevice:ok") {
            this.$toast(`数据已发送`);
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
        //设备id
        //base64编码过的设备发到H5的数据
        let { deviceId, base64Data } = res;
        this.parsePackets({ deviceId, content: base64Data });
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
    //解析数据包
    async parsePackets(params = {}) {
      let res = await service.parsePackets(params);
      if (res.errorCode === 0) {
        console.log("解析数据包");
      }
    },
    //事件监听
    init() {
      this.onWXDeviceBluetoothStateChange();
      this.onWXDeviceStateChange();
      this.onReceiveDataFromWXDevice();
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

