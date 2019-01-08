<template>
  <div class="page"></div> 
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      pageLoading: null
    };
  },
  methods: {
    login() {
      //this.goBeforeLoginUrl(); // 页面恢复(进入用户一开始请求的页面)
      this.$router.push({ path: "/login" });
    }
  },
  activated() {},
  created() {
    let { openId, photo } = this.$route.query;
    if (!openId && !photo) {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        console.log("跳转到微信授权页面");
        window.location.href =
          "http://23ti245684.imwork.net/qxiao-mp/action/mod-xiaojiao/manage/registerUser.do";
      }
    } else {
      Cookies.set("openId", this.$route.query.openId);
      Cookies.set("photo", this.$route.query.photo);
      this.$store.commit("user/SET_OPENID", openId);
      this.$store.commit("user/SET_PHOTO", photo);
      this.login();
    }
  }
};
</script>
<style lang="less">
</style>
