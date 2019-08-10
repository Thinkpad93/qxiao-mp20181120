<template>
  <div class="page">
    <div class="page-bd">
      <div class="schedule">
        <div class="schedule-tr flex">
          <div class="schedule-td">
            <div class="block lineTd common-td">
              <span size-12 class="span2">时间</span>
              <span size-12 class="span1">星期</span>
            </div>
          </div>
          <div class="schedule-td flex-1" v-for="(week, index) in weekList" :key="index">
            <div class="block">{{ week }}</div>
          </div>
        </div>
        <div class="schedule-body">
          <div class="schedule-tr flex" v-for="(tr, index) in list" :key="index">
            <div class="schedule-td common-td">
              <div class="block">
                <div size-12 class="section">第{{ index + 1 }}节</div>
                <div size-12 class="time">
                  <div>
                    <span
                      style="color:#1989fa;"
                      @click="handleChangeStartTime(index)"
                    >{{ !tr.startTime ? "开始": tr.startTime}}</span>
                    -
                    <span
                      style="color:#1989fa;"
                      @click="handleChangeEndTime(index)"
                    >{{ !tr.endTime ? "结束": tr.endTime}}</span>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="tr.list">
              <div class="schedule-td flex-1" v-for="(td, tdIndex) in tr.list" :key="tdIndex">
                <div class="block" @click="handleChangeLesson(td, index, tdIndex)">
                  <span v-if="td.title">{{ td.title ? td.title : "无课" }}</span>
                  <van-icon name="plus" size="16px" color="#999" v-else></van-icon>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "scheduleEdit",
  data() {
    return {
      popupStartTime: false,
      startDate: "07:00",
      popupEndTime: false,
      endDate: "08:00",
      startIndex: 0, //开始时间索引
      endIndex: 0, //结束时间索引
      popupShow: false,
      defaultIndex: 0,
      rowIndex: 0, //行索引值
      tdIndex: 0, //td块索引值
      query: {
        studentId: this.$store.state.user.info.studentId
      },
      weekList: ["星期一", "星期二", "星期三", "星期四", "星期五"],
      list: []
    };
  },
  methods: {
    //查询我的课表
    async queryMySchedule(params = {}) {
      let res = await service.queryMySchedule(params);
      if (res.errorCode === 0) {
        this.list = res.data;
      }
    },
    //编辑我的课表
    async updateMySchedule(params = {}) {
      let res = await service.updateMySchedule(params);
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    this.queryMySchedule(this.query);
  }
};
</script>
<style lang="less" scoped>
.schedule {
  background-color: #fff;
}
.block {
  font-size: 24px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
}

.common-td {
  width: 200px;
  min-width: 200px;
  position: relative;
  overflow: hidden;
}

.schedule-td:nth-child(even) {
  background-color: #fafafa;
}

.span1 {
  position: absolute;
  top: 20%;
  right: 8%;
}
.span2 {
  position: absolute;
  top: 60%;
  left: 10%;
}

.lineTd {
  &:before {
    content: "";
    position: absolute;
    width: 1px;
    height: 300px; /*这里需要自己调整，根据td的宽度和高度*/
    top: 0;
    left: 0;
    background-color: #ebeef5;
    display: block;
    transform: rotate(-64deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: top;
  }
}

.time {
  width: 100%;
  align-self: flex-start;
  text-align: center;
}
</style>
