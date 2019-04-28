<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells">
        <div class="cell min-h160" v-for="item in list" :key="item.exchangeId">
          <div class="cell-bd">
            <p>{{ item.textContent }}</p>
            <div size-14>x{{ item.times }}</div>
            <time size-12 style="color:#7d7e80">{{ item.postTime }}</time>
          </div>
          <div class="cell-ft">
            <span>{{ item.starCount * item.times }}颗</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "prizeExchangeLog",
  data() {
    return {
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.openStudentId,
        page: 1,
        pageSize: 10
      },
      list: []
    };
  },
  methods: {
    //兑奖记录查询
    async prizeExchangeLog(params = {}) {
      let res = await service.prizeExchangeLog(params);
      if (res.errorCode === 0) {
        this.list = res.data.data || [];
      }
    }
  },
  mounted() {
    this.prizeExchangeLog(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
