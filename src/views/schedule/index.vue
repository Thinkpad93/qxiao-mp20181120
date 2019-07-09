<template>
  <div class="page">
    <div class="page-bd">
      <div class="schedule">
        <div class="schedule-hd"></div>
        <div class="schedule-bd">
          <!-- <van-button type="primary" size="small" @click="popupShow = true">小型按钮</van-button> -->
          <v-date-picker
            mode="range"
            v-model="selectedDate"
            :is-inline="true"
            show-caps
            transition="none"
            :popover="{visibility: 'hidden'}"
            @input="handleInput"
          ></v-date-picker>
          <van-popup v-model="popupShow" position="bottom"></van-popup>
        </div>
        <div class="schedule-ft"></div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import "v-calendar/lib/v-calendar.min.css";
import { setupCalendar, DatePicker } from "v-calendar";
setupCalendar({
  navVisibility: "hidden",
  titleTransition: "none",
  weeksTransition: "none",
  paneWidth: window.innerWidth, //宽度
  datePickerShowDayPopover: false, //显示弹出窗口为拖动和选定的区域
  firstDayOfWeek: 2 // Monday,
});
export default {
  name: "schedule",
  components: {
    "v-date-picker": DatePicker
  },
  data() {
    return {
      popupShow: false,
      selectedDate: {
        start: new Date(2018, 0, 9),
        end: new Date(2018, 0, 18)
      }
    };
  },
  methods: {
    handleInput(value) {
      console.log(value);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
