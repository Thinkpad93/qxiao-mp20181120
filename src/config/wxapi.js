import service from "@/api";

export default {
  //初始化
  wxRegister(callback) {
    let url = window.location.href.split("#")[0]; //获取当前url,传递到服务端进行签名
    service.sign({
      url
    }).then(res => {
      if (res.appid && res.nonceStr) {
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
            "hideMenuItems",
            "hideOptionMenu",
            "showOptionMenu",
            "chooseWXPay",
            "closeWindow"
          ] // 必填，需要使用的JS接口列表
        });
      }
    });
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
      if (callback) {
        callback()
      }
    });
  },
  //隐藏右上角菜单接口
  wxHideOptionMenu() {
    wx.hideOptionMenu();
  },
  //显示右上角菜单接口
  wxShowOptionMenu() {
    wx.showOptionMenu();
  },
  //微信分享到朋友圈
  wxShareTimeline(option) {
    wx.onMenuShareTimeline({
      title: option.title, // 分享标题
      link: option.link, // 分享链接
      imgUrl: "http://h5.ztuo.cn/img/shareimg.jpg", // 分享图标   
      success: () => {
        option.success();
      },
      cancel: () => {
        option.error();
      }
    });
  },
  //微信分享给朋友
  wxShareAppMessage(option) {
    wx.onMenuShareAppMessage({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述      
      link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: "http://h5.ztuo.cn/img/shareimg.jpg", // 分享图标  
      success: () => {
        option.success();
      },
      cancel: () => {
        option.error();
      }
    });
  }
}
