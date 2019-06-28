<template>
  <div class="page">
    <div class="page-bd">
      <div class="empty">
        <img src="@/assets/kong.png" alt>
        <p class="mt-30">小Q智能手环紧锣密鼓进行中,敬请期待...</p>
      </div>
    </div>
    <div class="page-ft">
      <!-- <van-button type="info" size="large" class="no-radius">去绑定</van-button> -->
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapState } from "vuex";
export default {
  name: "bracelet",
  data() {
    return {};
  },
  computed: {
    ...mapState("user", {
      openId: state => state.info.openId,
      studentId: state => state.info.openStudentId
    })
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
    //this.checkBindBracelet({ openId: this.openId, studentId: this.studentId });
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
