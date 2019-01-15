<template>
  <div class="page">
    <div class="page-hd">
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;" id="showDatePicker" @click="handleShowDatePicker">
          <span id="data1">{{ date }}</span>
          <!-- <span class="triangle_border_down_green"></span> -->
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
      date: "2018-12-25"
    };
  },
  computed: {
    ...mapGetters(["openId"])
  },
  methods: {
    handleShowDatePicker() {
      let t = this.$weui.datePicker({
        start: 1990,
        end: new Date().getFullYear(),
        onConfirm: result => {
          this.query.date =
            result[0].value + "-" + result[1].value + "-" + result[2].value;
          this.clockStat(this.query);
        }
      });
    },
    handleQueryClock(clock) {
      this.$router.push({ path: `/clock/show/${clock.classId}` });
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
    let obj = {
      openId: this.openId,
      date: this.date
    };
    this.clockStat(obj);
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
.triangle_border_down_green {
  position: absolute;
  right: -16%;
  top: 50%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px;
  border-color: #9cd248 transparent transparent;
  transform: translateY(-50%);
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
