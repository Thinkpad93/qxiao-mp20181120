<template>
  <div class="page">
    <div class="page-hd">
      <div class="class-edit-head">
        <a href="javascript:;" class="btn btn-primary">{{ className }}</a>
        <div class="tab">
          <a
            href="javascript:;"
            @click="handleTabClick(1)"
            :class="[query.type === 1 ? 'curr': '']"
          >已打卡</a>
          <a
            href="javascript:;"
            @click="handleTabClick(0)"
            :class="[query.type === 0 ? 'curr': '']"
          >未打卡</a>
        </div>
      </div>
    </div>
    <div class="pae-bd">
      <div class="clock-show-table">
        <div class="cells">
          <div class="cell" v-for="(item, index) in classClockList" :key="index">
            <div class="cell-bd">
              <p>{{ item.studentName }}</p>
            </div>
            <div class="cell-ft">
              <span>{{ item.postTime }}</span>
              <!-- <span v-for="(time, index) in item.time" :key="index">{{ time.postTime }}</span> -->
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="cells">
        <div class="cell" v-for="(item, index) in classClockList" :key="index">
          <div class="cell-bd">
            <p>{{ item.studentName }}</p>
          </div>
          <div class="cell-ft">
            <span v-for="(time, index) in item.time" :key="index">{{ time.postTime }}</span>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "clockShow",
  data() {
    return {
      className: this.$route.query.className,
      classClockList: [],
      query: {
        type: 1, //0-缺勤 1-出勤
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
        this.classClockList = res.data.info;
      }
    }
  },
  activated() {
    this.queryAttendance(this.query);
  }
};
</script>
<style lang="less">
.clock-show-table {
  .cell {
    padding: 0 30px;
    height: 100px;
  }
  .cell-bd {
    padding-left: 0;
  }
}
.class-edit-head {
  text-align: center;
  padding-top: 40px;
  > a {
    width: 240px;
  }
  .tab {
    display: flex;
    font-size: 30px;
    a {
      height: 100px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .curr {
      color: #92cd36;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        display: block;
        width: 50%;
        height: 4px;
        background-color: #92cd36;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
