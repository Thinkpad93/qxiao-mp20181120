<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells-title">当天打卡详细时间</div>
      <div class="cells">
        <div class="cell" v-for="(day, index) in dayList" :key="index">
          <div class="cell-bd">
            <div class="cell-p text-center">{{ day }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  data() {
    return {
      query: {
        openId: this.$store.state.wx.openId,
        data: this.$route.query.day
      },
      dayList: []
    };
  },
  methods: {
    //查询学生当天打卡记录
    async clockQueryDate(params = {}) {
      let res = await service.clockQueryDate(params);
      if (res.errorCode === 0) {
        this.dayList = res.data;
      }
    }
  },
  mounted() {
    this.clockQueryDate(this.query);
  }
};
</script>
<style lang="less">
</style>
