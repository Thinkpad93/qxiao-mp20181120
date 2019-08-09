<template>
  <div class="page">
    <div class="page-bd">
      <!-- 课程选择 -->
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="lessonList"
          :default-index="defaultIndex"
          show-toolbar
          value-key="title"
          @cancel="popupShow = false"
          @confirm="handleLessonConfirm"
        ></van-picker>
      </van-popup>
      <!-- 开始时间 -->
      <van-popup v-model="popupStartTime" position="bottom">
        <van-datetime-picker
          v-model="startDate"
          type="time"
          @cancel="popupStartTime = false"
          @confirm="handleStartTimeConfirm"
        ></van-datetime-picker>
      </van-popup>
      <!-- 开始时间 -->
      <!-- 结束时间 -->
      <van-popup v-model="popupEndTime" position="bottom">
        <van-datetime-picker
          v-model="endDate"
          type="time"
          @cancel="popupEndTime = false"
          @confirm="handleEndTimeConfirm"
        ></van-datetime-picker>
      </van-popup>
      <!-- 结束时间 -->
      <!-- 自制课表 -->
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
          <div class="schedule-tr flex" v-for="(tr, index) in scheduleList" :key="index">
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
            <template v-if="tr.schedule">
              <div class="schedule-td flex-1" v-for="(td, tdIndex) in tr.schedule" :key="tdIndex">
                <div class="block" @click="handleChangeLesson(td, index, tdIndex)">
                  <span v-if="td.title">{{ td.title ? td.title : "无课" }}</span>
                  <van-icon name="plus" size="16px" color="#999" v-else></van-icon>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- 新增按钮 -->
      <div class="mt-20 text-center">
        <van-button type="info" size="small" @click="handleAdd">新增课节</van-button>
      </div>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button type="info" size="large" class="no-radius" @click="handleSave">保存</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "scheduleAdd",
  data() {
    return {
      popupStartTime: false,
      startDate: "07:00",
      popupEndTime: false,
      endDate: "18:00",
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
      lessonList: [],
      scheduleList: [
        {
          startTime: "",
          endTime: "",
          schedule: [
            { lessonId: 0, title: "", day: 1 },
            { lessonId: 0, title: "", day: 2 },
            { lessonId: 0, title: "", day: 3 },
            { lessonId: 0, title: "", day: 4 },
            { lessonId: 0, title: "", day: 5 }
          ]
        },
        {
          startTime: "",
          endTime: "",
          schedule: [
            { lessonId: 0, title: "", day: 1 },
            { lessonId: 0, title: "", day: 2 },
            { lessonId: 0, title: "", day: 3 },
            { lessonId: 0, title: "", day: 4 },
            { lessonId: 0, title: "", day: 5 }
          ]
        }
      ]
    };
  },
  methods: {
    //选择开始时间
    handleChangeStartTime(index) {
      this.popupStartTime = true;
      this.startIndex = index;
    },
    //选择结束时间
    handleChangeEndTime(index) {
      this.popupEndTime = true;
      this.endIndex = index;
    },
    //确认开始时间
    handleStartTimeConfirm(value, index) {
      this.scheduleList[this.startIndex].startTime = value;
      this.popupStartTime = false;
    },
    //确认结束时间
    handleEndTimeConfirm(value, index) {
      this.scheduleList[this.endIndex].endTime = value;
      this.popupEndTime = false;
    },
    //确认选择课程
    handleLessonConfirm(value, index) {
      let { title, lessonId } = value;
      //设置选择的课程
      let obj = this.scheduleList[this.rowIndex].schedule[this.tdIndex];
      if (obj) {
        obj.title = title;
        obj.lessonId = lessonId;
      }
      this.popupShow = false;
    },
    //单击选择课程
    handleChangeLesson(params, index, tdIndex) {
      let { lessonId } = params;
      let elementIndex = this.lessonList.findIndex(item => {
        return item.lessonId == lessonId;
      });
      this.rowIndex = index; //设置点击的行数
      this.tdIndex = tdIndex; //设置点击的td块索引值
      this.defaultIndex = elementIndex; //设置回选
      this.popupShow = true;
    },
    //新增课节
    handleAdd() {
      //声明一个对象
      let obj = { startTime: "", endTime: "", schedule: [] };
      //生成周一到周五的课程
      for (let i = 1; i <= 5; i++) {
        obj.schedule.push({ lessonId: 0, title: "", day: i });
      }
      this.scheduleList.push(obj);
    },
    //对比时分大小
    handleCompareTime(start, end) {
      if (typeof start === "string" && typeof end === "string") {
        let startArray = start.split(":");
        let endArray = end.split(":");
        let startTime = startArray[0] * 3600 + startArray[1] * 60;
        let endTime = endArray[0] * 3600 + endArray[1] * 60;
        if (startTime > endTime) {
          console.log("开始时间大于开始时间");
          return false;
        } else {
          return true;
          console.log("开始时间小于结束时间");
        }
      }
    },
    //保存提交课表
    handleSave() {
      let isString = true;
      let flag = true; //控制时间选择是否不对
      let scheduleList = this.scheduleList;
      for (let i = 0; i < scheduleList.length; i++) {
        let startTime = scheduleList[i].startTime;
        let endTime = scheduleList[i].endTime;
        let result = this.handleCompareTime(startTime, endTime);
        if (startTime == "") {
          isString = false;
          this.$toast(`请选择第${i + 1}节的开始时间`);
          break;
        }
        if (endTime == "") {
          isString = false;
          this.$toast(`请选择第${i + 1}节的结束时间`);
          break;
        }
        if (!result) {
          flag = false;
          this.$toast(`第${i + 1}节的时间选择不对，请重新选择`);
          break;
        }
      }
      if (isString && flag) {
        console.log(this.scheduleList);
      }
    },
    //课程列表查询
    async queryLessonList(params = {}) {
      let res = await service.queryLessonList(params);
      if (res.errorCode === 0) {
        if (res.data.length) {
          let result = res.data.map(item => {
            let { lessonId, title } = item;
            return {
              lessonId,
              title
            };
          });
          result.unshift({ lessonId: 0, title: "无课" });
          this.lessonList = result;
        }
      }
    },
    //查询我的课表
    async queryMySchedule(params = {}) {
      let res = await service.queryMySchedule(params);
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    this.queryMySchedule(this.query);
    this.queryLessonList();
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
