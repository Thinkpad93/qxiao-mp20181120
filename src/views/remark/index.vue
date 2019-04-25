<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="remark" v-for="(item, index) in list" :key="index">
        <div class="remark-bd">
          <div class="remark-teacher flex mb-30">
            <span>老师:</span>
            <p class="ml-20">你活泼乐观,自信心强,尊敬老师,是你的最大优点,作业能按时完成,有强烈的好奇心,可惜的是你上课管不住自己,不守纪律</p>
          </div>
          <div class="remark-sys flex mb-30">
            <span>系统:</span>
            <p class="ml-20">孩子好奇心旺盛，总是在某个角落弹奏着恰好好处的弦律。</p>
          </div>
          <div class="remark-time">2019.03.28 10:00:00</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "remark",
  data() {
    return {
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.openStudentId
      },
      list: [1]
    };
  },
  methods: {
    //评语列表查询
    async remarkListQuery(params = {}) {
      let res = await service.remarkListQuery(params);
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.remark {
  padding: 30px 20px;
  margin-bottom: 20px;
  text-align: justify;
  background-color: #fff;
  &-time {
    color: #b5b5b5;
    text-align: right;
  }
  span {
    display: inline-block;
  }
  p {
    flex: 1;
    line-height: 1.4;
  }
}
</style>
