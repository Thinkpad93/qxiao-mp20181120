<template>
  <div class="flex-page">
    <div class="flex-bd"></div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius">去绑定</van-button>
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
    this.checkBindBracelet({ openId: this.openId, studentId: this.studentId });
  }
};
</script>
<style lang="less" scoped>
</style>
