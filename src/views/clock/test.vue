<template>
  <div class="page">
    <div class="page-bd">
      <div class="calendar-container">
        <calendar :events="calendar.events" :range="calendar.range" :lunar="calendar.lunar"></calendar>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import service from "@/api";
import calendar from "@/components/calendar";
export default {
  components: {
    calendar
  },
  data() {
    return {
      calendar: {
        range: false,
        lunar: true,
        events: {
          "2019-3-04": "",
          "2019-3-05": "",
          "2019-3-14": ""
        }
      },
      querys: {
        openId: this.$store.getters.openId,
        month: moment().format("YYYY-MM"),
        studentId: 0
      }
    };
  },
  methods: {
    //月考勤记录查询
    async clockQuery(params = {}) {
      let res = await service.clockQuery(params);
      if (res.errorCode === 0) {
        let datas = res.data;
        let timeArray = [];
        datas.forEach(elem => {
          let str = new Date(elem).getTime();
          timeArray.push(str);
        });
        console.log(timeArray);
        // let obj = {};
        // let time = {};
        // datas.forEach((elem, index) => {
        //   obj[elem] = index;
        // });
        // for (let i in obj) {
        //   time[moment(new Date(i).getTime()).format("YYYY-M-DD")] = i;
        // }
        // this.calendar.events = time;
      }
    }
  },
  mounted() {
    this.clockQuery(this.querys);
  }
};
</script>
<style lang="less" scoped>
.calendar-container {
  height: 100vh;
  // background-image: linear-gradient(
  //   180deg,
  //   rgb(150, 237, 254) 10%,
  //   rgb(218, 246, 211) 100%
  // );

  .calendar {
    position: relative;
  }
}
</style>
