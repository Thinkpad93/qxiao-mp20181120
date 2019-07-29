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
          <a href="javascript:void(0);" class="flex j-c-c a-i-c" @click="popupTwo = true">
            <span id="data1" class="mr-10">{{ querys.month }}</span>
            <van-icon name="arrow-down" size="16px"></van-icon>
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
          :formatter="formatter"
        ></van-datetime-picker>
      </van-popup>
      <template v-if="roleType != 3">
        <div class="clock-table">
          <div class="cells">
            <div class="cell" size-17>
              <div class="cell-bd">班级</div>
              <div class="cell-bd">应到人数</div>
              <div class="cell-bd">实到人数</div>
              <div class="cell-bd">出勤率</div>
            </div>
          </div>
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
        <div class="empty" v-if="!clockList.length">
          <img src="@/assets/kong.png" alt />
          <p>还没有打卡记录</p>
        </div>
      </template>
      <!-- 家长端 -->
      <template v-else>
        <div class="clock-show-table">
          <div class="cells">
            <div
              class="cell"
              style="height:50px;"
              v-for="(month, index) in clockMonthList"
              :key="index"
            >
              <div class="cell-bd" style="padding-left:0;">
                <time>{{ month.day }}</time>
                已打卡
              </div>
              <div class="cell-ft" style="color:#92cd36;" @click="handleClockDay(month)">查看详情</div>
            </div>
          </div>
        </div>
        <div class="empty" v-if="!clockMonthList.length">
          <img src="@/assets/kong.png" alt />
          <p>本月还没有打卡过呢</p>
        </div>
      </template>
    </div>
    <div class="page-ft">
      <!-- 打卡按钮 -->
      <template v-if="roleType == 3">
        <div class="fixed-bottom" style="z-index: 100;">
          <template v-if="experience != 1">
            <van-button type="info" size="large" class="no-radius" @click="handleAddPunch">打卡接送</van-button>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import service from "@/api";
import formatter from "@/mixins/date-formatter";
import { mapState } from "vuex";
export default {
  name: "clock",
  mixins: [formatter],
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
        date: dayjs().format("YYYY-MM-DD")
      },
      querys: {
        studentId: this.$store.state.user.info.studentId,
        openId: this.$store.state.user.info.openId,
        month: dayjs().format("YYYY-MM")
      }
    };
  },
  computed: {
    ...mapState("user", {
      experience: state => state.info.experience //0不是体验用户 1是
    })
  },
  methods: {
    //一键接送
    handleAddPunch() {
      let { openId, studentId } = this.querys;
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定接送孩子吗？"
        })
        .then(() => {
          this.addPunch({ openId, studentId });
        });
    },
    handleClockDay(month) {
      this.$router.push({
        path: "/clock/day",
        query: { ...month }
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
    async addPunch(params = {}) {
      let res = await service.addPunch(params);
      if (res.errorCode === 0) {
        this.$toast(`${res.errorMsg}`);
        this.clockQuery(this.querys);
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
