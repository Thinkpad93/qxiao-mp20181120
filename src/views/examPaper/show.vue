<template>
  <div class="flex-page">
    <div class="flex-bd">
      <van-tabs v-model="actives">
        <van-tab title="简介"></van-tab>
        <van-tab title="评价"></van-tab>
      </van-tabs>
    </div>
    <div class="flex-ft"></div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "",
  data() {
    return {
      actives: 0
    };
  },
  methods: {
    async examPaperDetail(params = {}) {
      let res = await service.examPaperDetail(params);
      if (res.errorCode === 0) {
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
