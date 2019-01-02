<template>
  <div class="page">
    <div class="page-bd">
      <article class="article"></article>
      <div class="cells">
        <div class="tab">
          <div class="tab-head">
            <a href="javascript:;" class="curr" @click="handleTabClick(0)">已读</a>
            <a href="javascript:;" @click="handleTabClick(1)">未读</a>
          </div>
          <div class="tab-content">
            <div class="item"></div>
            <div class="item"></div>
          </div>
        </div>        
      </div>
    </div>  
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "homeWorkShow",
  data() {
    return {
      readFlag: 0,
      query: {
        openId: this.$store.getters.openId,
        homeId: parseInt(this.$route.query.homeId),
        classId: parseInt(this.$route.query.classId)
      },
      info: {}
    };
  },
  methods: {
    handleTabClick(index) {
      this.readFlag = index;
    },
    //作业详情查询
    async homeworkDetail(params = {}) {
      let res = await service.homeworkDetail(params);
      if (res.errorCode === 0) {
      }
    },
    async homeworkReaders(params = {}) {
      let res = await service.homeworkReaders(params);
      if (res.errorCode === 0) {
      }
    }
  },
  activated() {
    this.homeworkDetail(this.query);
  }
};
</script>
<style lang="less">
</style>
