<template>
  <div class="page">
    <div class="page-bd">
      <i class="iconfont iconfont icon-jiazai" size-24></i>
    </div>
  </div> 
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      Cookies.set("openId", this.$route.query.openId);
      Cookies.set("photo", this.$route.query.photo);
      this.$store.commit("user/SET_OPENID", this.$route.query.openId);
      this.$store.commit("user/SET_PHOTO", this.$route.query.photo);
      setTimeout(() => {
        this.goBeforeLoginUrl();
      }, 1000);
    }
  },
  mounted() {
    let { openId, photo } = this.$route.query;
    if (!openId && !photo) {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
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
