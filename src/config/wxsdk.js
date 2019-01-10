import service from "@/api";
export default {
  wxConfig: () => {
    let url = window.location.href.split("#")[0];
    service.sign({
      url
    }).then(res => {
      wx.config({
        debug: false, // 开启调试模式,开发时可以开启
        appId: res.appid, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: [
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "getLocalImgData"
        ] // 必填，需要使用的JS接口列表                
      });
      wx.ready(() => {
        wx.checkJsApi({
          jsApiList: ["chooseImage", "getLocalImgData"],
          success: res => {
            console.log(res);
          }
        });
      });
    });
  }
}
