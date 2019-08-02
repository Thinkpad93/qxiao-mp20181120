<template>
  <div class="page">
    <div class="pae-bd">
      <div class="class-edit-head">
        <button class="btn btn-primary">{{ className }}</button>
      </div>
      <van-tabs v-model="active" :line-height="2" @click="handleTabClick">
        <van-tab title="未打卡">
          <div class="cells-title">未打卡列表({{ list.length }})</div>
          <div class="cells">
            <div class="cell min-h120" v-for="(item, index) in list" :key="index">
              <div class="cell-bd">
                <p>{{ item.studentName }}</p>
              </div>
              <div class="cell-ft">
                <span>{{ item.postTime }}</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已打卡">
          <div class="cells-title">已打卡列表({{ list.length }})</div>
          <div class="cells">
            <div class="cell min-h120" v-for="(item, index) in list" :key="index">
              <div class="cell-bd">
                <p>{{ item.studentName }}</p>
              </div>
              <div class="cell-ft">
                <span>{{ item.postTime }}</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "clockShow",
  data() {
    return {
      active: 0,
      className: this.$route.query.className,
      list: [],
      query: {
        type: 0, //0-缺勤 1-出勤
        date: this.$route.query.date,
        classId: this.$route.query.classId
      }
    };
  },
  methods: {
    handleTabClick(index) {
      this.query.type = index;
      this.queryAttendance(this.query);
    },
    //考勤统计详情
    async queryAttendance(params = {}) {
      let res = await service.queryAttendance(params);
      if (res.errorCode === 0) {
        this.list = res.data.info;
      }
    }
  },
  activated() {
    this.queryAttendance(this.query);
  }
};
</script>
<style lang="less" scoped>
.class-edit-head {
  text-align: center;
  padding-top: 40px;
  background-color: #fff;
  > button {
    width: 240px;
  }
}
</style>
