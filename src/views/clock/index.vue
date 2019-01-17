<template>
  <div class="page">
    <div class="page-hd">
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;" id="showDatePicker" @click="handleShowDatePicker">
          <span id="data1">{{ query.date }}</span>
          <i class="iconfont icon-xiangxia1"></i>
        </a>
      </div>
    </div>
    <div class="page-bd">
      <div class="clock-table">
        <div class="cells">
          <div class="cell" size-17>
            <div class="cell-bd">班级</div>
            <div class="cell-bd">应到人数</div>
            <div class="cell-bd">实到人数</div>
            <div class="cell-bd">出勤率</div>
          </div>
        </div>
      </div>
      <div class="clock-table">
        <div class="cells">
          <div class="cell" v-for="(clock, index) in clockList" :key="index" @click="handleQueryClock(clock)">
            <div class="cell-bd">
              <p class="">{{ clock.className }}</p>
            </div>
            <div class="cell-bd">
              <p class="">{{ clock.classCount }}</p>
            </div>
            <div class="cell-bd">
              <p class="">{{ clock.clockCount }}</p>
            </div>
            <div class="cell-bd">
              <!-- <canvas id="mc3" class="canvas"></canvas> -->
              <p style="color:#9cd248">{{ clock.clockRate }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import service from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "clock",
  data() {
    return {
      clockList: [],
      query: {
        openId: this.$store.getters.openId,
        date: "2019-01-15"
      }
    };
  },
  computed: {},
  methods: {
    handleShowDatePicker() {
      let t = this.$weui.datePicker({
        start: 1990,
        end: new Date().getFullYear(),
        onConfirm: result => {
          console.log(result);
          let y = result[0].value;
          let m = result[1].value;
          let d = result[2].value;
          //添加补0操作
          if (m >= 1 && m <= 9) {
            m = "0" + m;
          }
          if (d >= 1 && d <= 9) {
            d = "0" + d;
          }
          this.query.date = `${y}-${m}-${d}`;
          this.clockStat(this.query);
        }
      });
    },
    handleQueryClock(clock) {
      this.$router.push({
        path: "/clock/show",
        query: { classId: `${clock.classId}`, date: `${clock.statDate}` }
      });
    },
    //考勤统计查询
    async clockStat(params = {}) {
      let res = await service.clockStat(params);
      if (res.errorCode === 0) {
        this.clockList = res.data;
      }
    }
  },
  activated() {
    this.clockStat(this.query);
  }
};
</script>
<style lang="less">
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
}
#showDatePicker {
  position: relative;
}
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
}

.clock-table {
  .cell {
    padding: 0 0;
    height: 100px;
  }
  .cell-bd {
    text-align: center;
    padding-left: 0;
  }
}
</style>
