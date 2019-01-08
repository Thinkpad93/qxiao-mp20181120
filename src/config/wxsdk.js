import Vue from 'vue';
import service from "@/api";
export default {
  wxConfig: (url = "") => {
    service.sign({
      url
    }).then(res => {
      Vue.$wx.config({
        debug: false, // 开启调试模式,开发时可以开启
        appId: res.appid, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: [
          "onMenuShareAppMessage",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "getLocalImgData"
        ]
      });
      Vue.$wx.ready(() => {});
    });
  }
}
