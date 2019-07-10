<template>
  <div class="page">
    <div class="page-bd">
      <div class="schedule">
        <div class="schedule-hd"></div>
        <div class="schedule-bd">
          <van-button type="primary" size="small" @click="popupShow = true">按钮</van-button>
          <!-- <v-date-picker
            mode="range"
            v-model="selectedDate"
            :is-inline="true"
            is-expanded
            show-caps
            @input="handleInput"
          ></v-date-picker>-->
          <van-popup v-model="popupShow" position="bottom">
            <calendar
              :events="calendar.events"
              :value="calendar.value"
              :range="calendar.range"
              :lunar="calendar.lunar"
              @prev="handlePrev"
              @next="handleNext"
              @select="calendar.select"
            ></calendar>
          </van-popup>
        </div>
        <div class="schedule-ft">
          <!-- <van-button type="danger" size="small">周</van-button>
          <van-button type="danger" size="small">月</van-button>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import calendar from "@/components/calendar";
import "v-calendar/lib/v-calendar.min.css";
import { setupCalendar, DatePicker } from "v-calendar";
setupCalendar({
  navVisibility: "focus",
  titleTransition: "none",
  weeksTransition: "none",
  paneWidth: window.innerWidth, //宽度
  datePickerShowDayPopover: false, //显示弹出窗口为拖动和选定的区域
  maxTapDuration: 0,
  datePickerShowCaps: true
  //firstDayOfWeek: 2 // Monday,
});
export default {
  name: "schedule",
  components: {
    calendar: calendar,
    "v-date-picker": DatePicker
  },
  data() {
    return {
      popupShow: false,
      calendar: {
        value: [[2019, 7, 11], [2019, 7, 12]], //默认日期
        range: true, //多选
        lunar: true, //显示农历
        events: {},
        select(begin, end) {
          console.log(begin);
          console.log(end);
        }
      },
      selectedDate: {
        start: new Date(2019, 7, 10),
        end: new Date(2019, 7, 11)
      }
    };
  },
  methods: {
    handleInput(value) {
      console.log(value);
    },
    handlePrev() {},
    handleNext() {},
    handleSelect() {}
  }
};
</script>
<style lang="less" scoped>
</style>
