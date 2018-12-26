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
      <div class="tab flex" size-17>
        <a href="javascript:;">班级</a>
        <a href="javascript:;">应到人数</a>
        <a href="javascript:;">实到人数</a>
        <a href="javascript:;">出勤率</a>
      </div>
      <div class="cells">
        <div class="cell" v-for="(clock, index) in clockList" :key="index" @click="handleQueryClock(clock)">
          <div class="cell-bd">
            <p>{{ clock.className }}</p>
          </div>
          <div class="cell-bd">
            <p>{{ clock.classCount }}</p>
          </div>
          <div class="cell-bd">
            <p>{{ clock.clockCount }}</p>
          </div>
          <div class="cell-bd">
            <!-- <canvas id="mc3" class="canvas"></canvas> -->
            <p style="color:#9cd248">{{ clock.clockRate }}</p>
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
<style lang="less" scoped>
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
.canvas {
}
.tab {
  height: 100px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  a {
    flex: 1;
    text-align: center;
  }
}
.cells {
  font-size: 32px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.cell {
  padding: 34px 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  }
}
.cell-hd {
  line-height: 90px;
}
.cell-bd {
  flex: 1;
  text-align: center;
}
</style>
