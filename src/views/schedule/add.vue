<template>
  <div class="page">
    <div class="page-bd"></div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "scheduleAdd",
  data() {
    return {};
  },
  methods: {
    //课程列表查询
    async queryLessonList(params = {}) {
      let res = await service.queryLessonList(params);
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    this.queryLessonList();
  }
};
</script>
<style lang="less" scoped>
</style>
