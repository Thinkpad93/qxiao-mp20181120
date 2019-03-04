<template>
  <div class="page">
    <div class="page-hd">
      <template v-if="roleType == 1 || roleType == 2 || roleType == 4">
        <div class="button-sp-area flex" size-17>
          <a href="javascript:;" id="showDatePicker" @click="show = true">
            <span id="data1">{{ query.date }}</span>
            <i class="iconfont icon-xiangxia1"></i>
          </a>
        </div>
      </template>
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
      <template v-if="roleType == 1 || roleType == 2 || roleType == 4">
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
      </template>
      <!-- 家长端 -->
      <template v-else>
        <!-- <div class="calendar-container">
          <calendar
            :events="calendar.events"
            :range="calendar.range"
            :lunar="calendar.lunar"
            @prev="handlePrev"
            @next="handleNext"
            @select="handleSelect"
          ></calendar>
        </div>-->
        <div class="clock-table">
          <div class="cells">
            <div class="cell"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import service from "@/api";
import { mapGetters } from "vuex";
import calendar from "@/components/calendar";
export default {
  name: "clock",
  components: {
    calendar
  },
  data() {
    return {
      show: false,
      currentDate: new Date(),
      clockList: [],
      calendar: {
        range: false,
        lunar: true,
        events: {}
      },
      query: {
        openId: this.$store.getters.openId,
        date: moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD")
      },
      querys: {
        studentId: this.$store.getters.id,
        openId: this.$store.getters.openId,
        month: moment().format("YYYY-MM")
      }
    };
  },
  computed: {
    ...mapGetters(["roleType"])
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
    handleSelect(value) {
      console.log(value);
    },
    //选择上一个月
    handlePrev(calendarMonth, year) {
      if (calendarMonth > 0 && calendarMonth < 9) {
        calendarMonth = "0" + calendarMonth;
      }
      let { month, ...args } = this.querys;
      let obj = Object.assign({}, args, { month: `${year}-${calendarMonth}` });
      this.clockQuery(obj);
    },
    //选择下一个月
    handleNext(calendarMonth, year) {
      if (calendarMonth > 0 && calendarMonth < 9) {
        calendarMonth = "0" + calendarMonth;
      }
      let { month, ...args } = this.querys;
      let obj = Object.assign({}, args, { month: `${year}-${calendarMonth}` });
      this.clockQuery(obj);
    },
    //考勤统计查询
    async clockStat(params = {}) {
      let res = await service.clockStat(params);
      if (res.errorCode === 0) {
        this.clockList = res.data;
        this.show = false;
      }
    },
    //查询学生当天打卡记录
    async clockQueryDate(params = {}) {
      let res = await service.clockQueryDate(params);
      if (res.errorCode === 0) {
        //...
      }
    },
    //月考勤记录查询
    async clockQuery(params = {}) {
      let res = await service.clockQuery(params);
      if (res.errorCode === 0) {
        let datas = res.data; //当月有打卡的时间
        let obj = {};
        let timeArray = [];
        datas.forEach(elem => {
          let str = moment(new Date(elem).getTime()).format("YYYY-M-D");
          obj[str] = "";
        });
        this.calendar.events = obj;
      }
    }
  },
  activated() {
    if (this.roleType == 3) {
      this.clockQuery(this.querys);
    } else {
      this.clockStat(this.query);
    }
  }
};
</script>
<style lang="less">
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
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
    height: 120px;
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
