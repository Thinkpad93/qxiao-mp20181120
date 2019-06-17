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
      <div class="prize-null" v-if="!list.length">
        <img src="@/assets/prize-null@2x.png" alt>
        <p class="mt-30">您还没有任何兑换记录哦~</p>
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
.prize-null {
  width: 100%;
  color: #999;
  font-size: 30px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  img {
    width: 392px;
    height: 200px;
  }
}
</style>
