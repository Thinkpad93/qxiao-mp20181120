<template>
  <div class="page">
    <div class="page-hd">
      <template v-if="roleType == 1 || roleType == 2 || roleType == 4">
        <div class="button-sp-area flex" size-17>
          <a href="javascript:void(0);" id="showDatePicker" @click="popupOne = true">
            <span id="data1">{{ query.date }}</span>
            <van-icon name="arrow-down" size="16px"></van-icon>
          </a>
        </div>
      </template>
      <template v-else>
        <div class="button-sp-area flex" size-17>
          <a href="javascript:void(0);" @click="popupTwo = true">
            <span id="data1">{{ querys.month }}</span>
          </a>
        </div>
      </template>
    </div>
    <div class="page-bd">
      <!-- 老师端 -->
      <van-popup v-model="popupOne" position="bottom">
        <van-datetime-picker
          ref="datetime"
          @cancel="popupOne = false"
          @confirm="handleShowDatePicker"
          v-model="currentDate"
          type="date"
          :formatter="formatter"
        ></van-datetime-picker>
      </van-popup>
      <!-- 家长端 -->
      <van-popup v-model="popupTwo" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          @confirm="handleChangeMonth"
          @cancel="popupTwo = false"
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
        <div class="clock-show-table">
          <div class="cells">
            <div
              class="cell"
              style="height:50px;"
              v-for="(month, index) in clockMonthList"
              :key="index"
            >
              <div class="cell-bd" style="padding-left:0;">{{ month }}已打卡</div>
              <div class="cell-ft" style="color:#92cd36;" @click="handleClockDay(month)">查看详情</div>
            </div>
          </div>
        </div>
      </template>
      <!-- 打卡按钮 -->
      <template v-if="roleType == 3">
        <div class="_confirm">
          <a
            href="javascript:void(0);"
            class="btn btn-large btn-primary"
            @click="handleAddPunch"
          >打卡接送</a>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import service from "@/api";
import { mapState } from "vuex";
export default {
  name: "clock",
  data() {
    return {
      popupOne: false,
      popupTwo: false,
      currentDate: new Date(),
      clockList: [],
      clockMonthList: [],
      roleType: this.$store.state.user.info.roleType,
      calendar: {
        range: false,
        lunar: true,
        events: {}
      },
      query: {
        openId: this.$store.state.user.info.openId,
        date: dayjs()
          .subtract(1, "days")
          .format("YYYY-MM-DD")
      },
      querys: {
        studentId: this.$store.state.user.info.studentId,
        openId: this.$store.state.user.info.openId,
        month: dayjs().format("YYYY-MM")
      }
    };
  },
  methods: {
    //格式化函数
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    //一键接送
    handleAddPunch() {
      let { studentId } = this.querys;
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定接送孩子吗？"
        })
        .then(() => {
          this.addPunch(studentId);
        });
    },
    handleClockDay(month) {
      this.$router.push({
        path: "/clock/day",
        query: { day: month }
      });
    },
    //选择年月日
    handleShowDatePicker(value) {
      let now = dayjs(new Date(value).getTime()).format("YYYY-MM-DD");
      this.query.date = now;
      this.clockStat(this.query);
    },
    //选择年月
    handleChangeMonth(value) {
      let month = dayjs(new Date(value).getTime()).format("YYYY-MM");
      this.querys.month = month;
      this.clockQuery(this.querys);
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
        this.popupOne = false;
      }
    },
    //月考勤记录查询
    async clockQuery(params = {}) {
      let res = await service.clockQuery(params);
      if (res.errorCode === 0) {
        this.clockMonthList = res.data;
        this.popupTwo = false;
      }
    },
    //打卡按钮
    async addPunch(studentId) {
      let res = await service.addPunch({ studentId });
      if (res.errorCode === 0) {
        this.$toast(`${res.errorMsg}`);
      } else {
        this.$toast(`${res.errorMsg}`);
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
<style lang="less" scoped>
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
