<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="remark" v-for="(item, index) in list" :key="index">
        <div class="remark-bd">
          <div class="remark-teacher" v-if="item.remarkType == 1">
            <span>老师:</span>
            <p>{{ item.textContent }}</p>
          </div>
          <div class="remark-sys" v-if="item.remarkType == 0">
            <span>系统:</span>
            <p>{{ item.textContent }}</p>
          </div>
          <div class="remark-time">{{ item.postTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { remarkList } from "@/mock";
export default {
  name: "remark",
  data() {
    return {
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.openStudentId
      },
      list: []
    };
  },
  methods: {
    //评语列表查询
    async remarkListQuery() {
      let res = await service.examPaperDetail(params);
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    this.list = remarkList();
    console.log(this.list);
  }
};
</script>
<style lang="less" scoped>
.remark {
  font-size: 32px;
  padding: 30px 20px;
  margin-bottom: 20px;
  text-align: justify;
  background-color: #fff;
  &-teacher {
    display: flex;
    margin-bottom: 30px;
  }
  &-sys {
    display: flex;
  }
  &-time {
    color: #b5b5b5;
    text-align: right;
  }
  span {
    display: inline-block;
    margin-right: 20px;
  }
  p {
    flex: 1;
    line-height: 1.4;
  }
}
</style>
