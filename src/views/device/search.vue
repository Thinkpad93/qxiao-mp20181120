<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="devices.length">
        <div class="cells-title">设备列表</div>
        <div class="cells mb-20">
          <div
            class="cell min-h120"
            v-for="item in devices"
            :key="item.deviceId"
            @click="deviceClick(item)"
          >
            <div class="cell-hd">
              <img src="@/assets/avatar-bg@2x.png" width="40" height="40" />
            </div>
            <div class="cell-bd">
              <p class="text-right">{{ item.deviceId }}</p>
            </div>
          </div>
        </div>
      </template>
      <van-button type="danger" @click="startScanWXDevice">扫描设备</van-button>
      <!-- <van-button type="danger" @click="sendDataToWXDevice('IwcC8QIAAwAB2w==')">发送数据给设备</van-button> -->
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "braceletSearch",
  data() {
    return {
      toast: null,
      devices: [], //发现的设备列表数组
      bluetooth: false, //是否打开蓝牙
      deviceId: null, //设备ID
      list: [], //设备列表
      openId: this.$store.state.user.info.openId,
      studentId: this.$store.state.user.info.studentId
    };
  },
  methods: {
    deviceClick(params) {
      let { deviceId } = params; //设备ID
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要绑定设备吗？"
        })
        .then(() => {
          this.getWXDeviceTicket(1, deviceId);
        });
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
    //扫描设备（获取周围所有的设备列表，无论绑定还是未被绑定的设备都会扫描到）
    startScanWXDevice() {
      //每次扫描前先调用closeWXDeviceLib关闭设备库
      this.closeWXDeviceLib();
      //再调用openWXDeviceLib打开设备库
      this.openWXDeviceLib();
      //检查用户是否打开了手机蓝牙
      if (this.bluetooth) {
        this.toast = this.$toast.loading({
          mask: true,
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          message: "扫描设备..."
        });
        WeixinJSBridge.invoke(
          "startScanWXDevice",
          { connType: "blue", btVersion: "ble" },
          res => {
            if (res.err_msg === "startScanWXDevice:ok") {
            }
          }
        );
      } else {
        this.$toast(`请先打开手机蓝牙在进行扫描`);
      }
    },
    //扫描到某个设备
    onScanWXDeviceResult() {
      WeixinJSBridge.on("onScanWXDeviceResult", res => {
        console.log("扫描到某个设备");
        console.log(res);
        //是否扫描结束。
        if (res.devices.length && res.isCompleted == 0) {
          this.devices = res.devices;
          this.toast.clear();
          this.$dialog
            .alert({
              title: "提示",
              message: `扫描完成，成功扫描到${res.devices.length}个设备`
            })
            .then(() => {});
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
        this.list = deviceArray;
        for (let i = 0; i < deviceArray.length; i++) {
          if (deviceArray[i].state === "connected") {
            this.deviceId = deviceArray[i].deviceId;
            break;
          }
        }
        console.log("getWXDeviceInfos");
        console.log(res);
        console.log(this.list);
      });
    },
    //用户绑定设备
    //先获取操作凭证（type为1表示绑定，2表示解除绑定）
    async getWXDeviceTicket(type, deviceId) {
      let obj = {
        deviceId,
        type,
        connType: "blue"
      };
      WeixinJSBridge.invoke("getWXDeviceTicket", obj, res => {
        //操作凭证
        let { ticket } = res;
        console.log(ticket);
        console.log("操作凭证");
        if (res.err_msg === "getWXDeviceTicket:ok") {
          if (type === 1) {
            //绑定之前先进行设备状态查询
            service.getDeviceStatus({ deviceId }).then(res => {
              if (res.errorCode === 0) {
                console.log(res);
                console.log("绑定之前先进行设备状态查询");
                let status = res.data.status;
                if (status === 1) {
                  //绑定设备
                  let params = {
                    studentId: this.studentId,
                    openId: this.openId,
                    deviceId,
                    ticket
                  };
                  service.bindDevice(params).then(res => {
                    if (res.errorCode === 0) {
                      this.$toast(`设备绑定成功`);
                    } else {
                      this.$toast(`设备绑定失败`);
                    }
                  });
                }
              }
            });
          } else {
            //解除绑定
            let params = {
              deviceId,
              openId: this.openId,
              ticket
            };
            service.unBindDevice(params).then(res => {
              if (res.errorCode === 0) {
                console.log("解除绑定");
              } else {
                this.$toast(`解除绑定失败`);
              }
            });
          }
        }
      });
    },
    //微信客户端设备绑定状态改变事件
    onWXDeviceBindStateChange() {
      WeixinJSBridge.on("onWXDeviceBindStateChange", res => {
        console.log(res);
        console.log("微信客户端设备绑定状态改变事件");
      });
    },
    //发送数据给设备 发送的数据需要经过base64编码
    sendDataToWXDevice(base64 = "") {
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
    //设备连接状态变化
    onWXDeviceStateChange() {
      WeixinJSBridge.on("onWXDeviceStateChange", res => {
        let { state } = res;
        if (state === "connecting") {
          console.log("连接中");
        } else if (state === "connected") {
          console.log("连接中");
        } else {
          console.log("连接断开");
        }
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
    //初始化事件
    init() {
      this.openWXDeviceLib();
      this.getWXDeviceInfos();
      this.onReceiveDataFromWXDevice();
      this.onWXDeviceBluetoothStateChange();
      this.onWXDeviceStateChange();
      this.onScanWXDeviceResult();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
</style>