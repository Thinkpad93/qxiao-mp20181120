<template>
  <div class="page">
    <div class="page-bd">
      <div class="schedule">
        <div class="schedule-hd"></div>
        <div class="schedule-bd">
          <p @click="popupShow = true">{{ value[0] }}-{{ value[1] }}</p>
          <van-popup v-model="popupShow" position="bottom">
            <calendar
              :events="events"
              :zero="true"
              :value="value"
              :range="range"
              :lunar="lunar"
              @prev="handlePrev"
              @next="handleNext"
              @select="handleSelect"
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
import dayjs from "dayjs";
import service from "@/api";
import calendar from "@/components/calendar";
export default {
  name: "schedule",
  components: {
    calendar
  },
  data() {
    return {
      popupShow: false,
      value: [["2019", "07", "11"], ["2019", "07", "12"]], //默认日期
      range: true, //多选
      lunar: true, //显示农历
      events: {}
    };
  },
  methods: {
    handlePrev() {},
    handleNext() {},
    handleSelect(begin, end) {
      console.log(begin);
      console.log(end);
      if (begin && end) {
        this.value[0] = begin;
        this.value[1] = end;
        this.popupShow = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
