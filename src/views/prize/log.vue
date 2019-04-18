<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells">
        <div class="cell cell-h160" v-for="item in pageData" :key="item.exchangeId">
          <div class="cell-bd">
            <p>{{ item.textContent }}</p>
            <div class="font-14">x{{ item.times }}</div>
            <time class="font-12">{{ item.postTime }}</time>
          </div>
          <div class="cell-ft">
            <span>{{ item.starCount }}颗</span>
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
        openId: this.$route.query.openId,
        studentId: this.$route.query.studentId,
        page: 1,
        pageSize: 10
      },
      pageData: []
    };
  },
  methods: {
    //兑奖记录查询
    async prizeExchangeLog(params = {}) {
      let res = await service.prizeExchangeLog(params);
      if (res.errorCode === 0) {
        this.pageData = res.data.data || [];
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
