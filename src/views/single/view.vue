<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells" v-if="list.length">
        <div class="cell min-h100">
          <div class="cell-hd">
            <label class="label f-w">行为名称</label>
          </div>
          <div class="cell-bd">
            <p class="text-center f-w">学生名字</p>
          </div>
          <div class="cell-ft">
            <p class="f-w">Q星</p>
          </div>
        </div>
      </div>
      <div class="cells">
        <div class="cell min-h100" v-for="(item, index) in list" :key="index">
          <div class="cell-hd">
            <label class="label">{{ item.name }}</label>
          </div>
          <div class="cell-bd">
            <p class="text-center">{{ item.studentName }}星</p>
          </div>
          <div class="cell-ft">
            <van-rate v-model="item.starCount" :size="20" :count="5" color="#09e2bb" readonly></van-rate>
          </div>
        </div>
      </div>
      <div class="empty" v-if="!list.length">
        <img src="@/assets/kong.png" alt />
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "",
  data() {
    return {
      tabIndex: this.$route.query.tabIndex,
      name: this.$route.query.name,
      query: {
        classId: this.$route.query.classId,
        startDate: this.$route.query.startDate,
        endDate: this.$route.query.endDate,
        actionId: this.$route.query.actionId,
        actionType: this.$route.query.actionType
      },
      list: []
    };
  },
  methods: {
    //行为详情（在家）
    async queryActionDetails(params = {}) {
      let res = await service.queryActionDetails(params);
      if (res.errorCode === 0) {
        this.list = res.data;
      }
    },
    //课程详情（在校）
    async queryLessonDetail(params = {}) {
      let res = await service.queryActionDetails(params);
      if (res.errorCode === 0) {
        this.list = res.data;
      }
    }
  },
  activated() {
    if (this.tabIndex == 0) {
      this.queryActionDetails(this.query);
    } else {
    }
  }
};
</script>
<style lang="less" scoped>
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
}
</style>
