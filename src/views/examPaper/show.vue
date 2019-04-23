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
      actives: 0,
      query: {
        openId: this.$store.state.user.info.openId,
        paperId: this.$route.query.paperId
      },
      form: {
        studentId: this.$store.state.user.info.openStudentId,
        textContent: ""
      },
      info: {}
    };
  },
  methods: {
    //试卷详情查询
    async examPaperDetail(params = {}) {
      let res = await service.examPaperDetail(params);
      if (res.errorCode === 0) {
      }
    },
    //查询试卷评论
    async examPaperCommentQuery() {
      let res = await service.examPaperCommentQuery(params);
    },
    //提交试卷评论
    async examPaperComment() {
      let res = await service.examPaperComment(params);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
