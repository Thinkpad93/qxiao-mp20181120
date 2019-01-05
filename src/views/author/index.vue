<template>
  <div class="page">
    授权中获取OpenId...  
  </div> 
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      openId: null
    };
  },
  methods: {
    login() {
      setTimeout(() => {
        // 页面恢复(进入用户一开始请求的页面)
      }, 2000);
    }
  },
  created() {
    console.log(this.$route.query);
    console.log("执行次数");
    if (!Cookies.get("openId")) {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        console.log("跳转到微信授权页面");
        // 跳转到微信授权页面
        window.location.href =
          "http://23ti245684.imwork.net/qxiao-mp/action/mod-xiaojiao/manage/registerUser.do";
      }
    } else {
      this.login();
    }
  }
};
</script>
<style lang="less">
</style>
