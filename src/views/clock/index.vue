<template>
  <div class="page">
    <div class="page-hd">
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;" id="showDatePicker" @click="show = true">
          <span id="data1">{{ query.date }}</span>
          <i class="iconfont icon-xiangxia1"></i>
        </a>
      </div>
    </div>
    <div class="page-bd">
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          ref="datetime"
          @cancel="show = false"
          @confirm="handleShowDatePicker"
          v-model="currentDate"
          type="date"
        ></van-datetime-picker>
      </van-popup>
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
          <div
            class="cell"
            v-for="(clock, index) in clockList"
            :key="index"
            @click="handleQueryClock(clock)"
          >
            <div class="cell-bd">
              <p class>{{ clock.className }}</p>
            </div>
            <div class="cell-bd">
              <p class>{{ clock.classCount }}</p>
            </div>
            <div class="cell-bd">
              <p class>{{ clock.clockCount }}</p>
            </div>
            <div class="cell-bd">
              <van-circle
                v-model="clock.clockRate"
                :rate="clock.clockRate"
                color="#07c160"
                layer-color="#ebedf0"
                size="42px"
                :text="clock.clockRate.toFixed(0) + '%'"
              ></van-circle>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import service from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "clock",
  data() {
    return {
      show: false,
      currentDate: new Date(),
      clockList: [],
      query: {
        openId: this.$store.getters.openId,
        date: moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD")
      }
    };
  },
  methods: {
    handleShowDatePicker(value) {
      let now = moment(new Date(value).getTime()).format("YYYY-MM-DD");
      this.query.date = now;
      this.clockStat(this.query);
    },
    handleQueryClock(clock) {
      this.$router.push({
        path: "/clock/show",
        query: {
          className: `${clock.className}`,
          classId: `${clock.classId}`,
          date: `${clock.statDate}`
        }
      });
    },
    //考勤统计查询
    async clockStat(params = {}) {
      let res = await service.clockStat(params);
      if (res.errorCode === 0) {
        this.clockList = res.data;
        this.show = false;
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
.van-circle {
  vertical-align: top;
}
</style>
