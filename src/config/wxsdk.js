import service from "@/api";
export default {
  wxShare() {
    let url = window.location.href.split("#")[0]; //获取当前url,传递到服务端进行签名
    let is_dev = process.env.NODE_ENV !== "production";
    let shareUrl = is_dev ?
      `http://232a9x6385.51mypc.cn/#/share` :
      `http://zc.qxiao.net/qxiao-mp/#/share`;
    service.sign({
      url
    }).then(res => {
      if (res.appid) {
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
            "getLocalImgData",
            "onMenuShareAppMessage",
            "hideMenuItems"
          ] // 必填，需要使用的JS接口列表
        });
        //config信息验证后会执行ready方法
        wx.ready(() => {
          //要隐藏的菜单项
          wx.hideMenuItems({
            menuList: [
              "menuItem:share:timeline",
              "menuItem:share:qq",
              "menuItem:share:weiboApp",
              "menuItem:share:QZone",
              "menuItem:favorite"
            ]
          });
          wx.onMenuShareAppMessage({
            title: "亲爱的用户您好", // 分享标题
            desc: "小Q智慧欢迎您的加入", // 分享描述
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://h5.ztuo.cn/img/shareimg.jpg", // 分享图标
            success: res => {
              //console.log(res);
            },
            fail: error => {
              //console.log(error);
            }
          });
        });
        wx.error(error => {
          //console.log(error);
        });
      }
    });
  }
}
