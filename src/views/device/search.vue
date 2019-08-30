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
      <!-- <van-button type="danger" @click="startScanWXDevice">扫描设备</van-button> -->
      <van-button type="danger" @click="sendDataToWXDevice">发送数据给设备</van-button>
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
    base64encode(str) {
      var base64EncodeChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var out, i, len;
      var c1, c2, c3;
      len = str.length;
      i = 0;
      out = "";
      while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt((c1 & 0x3) << 4);
          out += "==";
          break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt(
            ((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4)
          );
          out += base64EncodeChars.charAt((c2 & 0xf) << 2);
          out += "=";
          break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3f);
      }
      return out;
    },
    /**
     *  Byte数组转Base64字符,原理同上
     * @Param [0x00,0x00] [0x23,0x02,0x02,0x03,0x14]
     * @return Base64字符串
     **/
    bytes_array_to_base64(array) {
      if (array.length == 0) {
        return "";
      }
      var b64Chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var result = ""; // 给末尾添加的字符,先计算出后面的字符
      var d3 = array.length % 3;
      var endChar = "";
      if (d3 == 1) {
        var value = array[array.length - 1];
        endChar = b64Chars.charAt(value >> 2);
        endChar += b64Chars.charAt((value << 4) & 0x3f);
        endChar += "==";
      } else if (d3 == 2) {
        var value1 = array[array.length - 2];
        var value2 = array[array.length - 1];
        endChar = b64Chars.charAt(value1 >> 2);
        endChar += b64Chars.charAt(((value1 << 4) & 0x3f) + (value2 >> 4));
        endChar += b64Chars.charAt((value2 << 2) & 0x3f);
        endChar += "=";
      }
      var times = array.length / 3;
      var startIndex = 0; // 开始计算
      for (var i = 0; i < times - (d3 == 0 ? 0 : 1); i++) {
        startIndex = i * 3;
        var S1 = array[startIndex + 0];
        var S2 = array[startIndex + 1];
        var S3 = array[startIndex + 2];
        var s1 = b64Chars.charAt(S1 >> 2);
        var s2 = b64Chars.charAt(((S1 << 4) & 0x3f) + (S2 >> 4));
        var s3 = b64Chars.charAt(((S2 & 0xf) << 2) + (S3 >> 6));
        var s4 = b64Chars.charAt(S3 & 0x3f); // 添加到结果字符串中
        result += s1 + s2 + s3 + s4;
      }
      return result + endChar;
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
    // IwICAyQ=  电量
    // IwICBCc= 得Q星值
    // IwQBBAAQMQ== 设置Q星值16
    // IwQQBhdwxw== 上传当前运动目标
    async sendDataToWXDevice() {
      //let str = this.bytes_array_to_base64([0x23, 0x02, 0x02, 0x03, 0x24]);
      let str = "IwICAwAFKA=="; //获取设备剩余电量
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
            let obj = {
              openId: this.openId,
              deviceId: this.deviceId
            };
            //this.queryData(obj);
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
    //this.onScanWXDeviceResult();
  }
};
</script>
<style lang="less" scoped>
</style>