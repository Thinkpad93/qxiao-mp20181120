<template>
  <div class="page">
    <div class="page-bd">
      <div class="empty">
        <img src="@/assets/kong.png" alt />
        <p class="mt-30">您还没有绑定小Q手环呢~</p>
      </div>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button type="info" size="large" class="no-radius" to="/device">去绑定</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "bracelet",
  data() {
    return {
      query: {
        studentId: this.$store.state.user.info.studentId,
        openId: this.$store.state.user.info.openId
      }
    };
  },
  methods: {
    //检查用户是否绑定手环
    async checkBindBracelet(params = {}) {
      let res = await service.checkBindBracelet(params);
      if (res.errorCode === 0) {
      } else if (res.errorCode === -1) {
        //用户没有绑定手环
      }
    }
  },
  mounted() {
    this.checkBindBracelet(this.query);
  }
};
</script>
<style lang="less" scoped>
.bracelets {
  width: 100%;
  color: #999;
  font-size: 30px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  img {
    width: 482px;
    height: 278px;
  }
}
</style>
