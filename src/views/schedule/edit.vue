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
      <!-- 课程选择 -->
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
      <div class="schedule" v-if="scheduleList.length">
        <div class="schedule-tr flex">
          <div class="schedule-td flex-1" v-for="(week, index) in weekList" :key="index">
            <div class="block-head">{{ week.name }}</div>
          </div>
        </div>
        <div class="schedule-body flex">
          <div class="schedule-tr flex-1" v-for="(tr, index) in scheduleList" :key="index">
            <div class="schedule-td" v-for="(td, tdIndex) in tr.list" :key="tdIndex">
              <div class="block" v-if="tdIndex < 7">
                <div @click="handleChangeLesson(td, index, tdIndex)">
                  <span class="have" v-if="td.title">{{ td.title }}</span>
                  <span class="null" v-else>无课</span>
                </div>
                <div class="schedule-time">
                  <!-- @click="handleChangeStartTime(td.startTime, index, tdIndex)" -->
                  <div style="color:#1989fa;margin-top:10px;" size-12>{{ td.startTime }}</div>
                  <!-- @click="handleChangeEndTime( td.endTime, index, tdIndex)" -->
                  <div style="color:#1989fa;margin-top:5px;" size-12>{{ td.endTime }}</div>
                </div>
              </div>
              <div class="block block-night" v-if="tdIndex >= 7">
                <div>
                  <span>晚自习</span>
                </div>
                <div class="schedule-time">
                  <div style="margin-top:10px;">{{ td.startTime }}</div>
                  <div style="margin-top:5px;">{{ td.endTime }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <div class="flex">
          <van-button type="danger" size="large" class="no-radius" @click="handleDelSchedule">删除</van-button>
          <van-button type="info" size="large" class="no-radius" @click="handleSave">保存</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapState } from "vuex";
export default {
  name: "scheduleEdit",
  data() {
    return {
      popupStartTime: false,
      startDate: "07:00",
      popupEndTime: false,
      endDate: "08:00",
      startRowIndex: 0,
      startColIndex: 0,
      endRowIndex: 0,
      endColIndex: 0,
      popupShow: false,
      defaultIndex: 0,
      rowIndex: 0, //行索引值
      tdIndex: 0, //td块索引值
      query: {
        studentId: this.$store.state.user.info.studentId
      },
      weekList: [
        { name: "星期一", day: 1 },
        { name: "星期二", day: 2 },
        { name: "星期三", day: 3 },
        { name: "星期四", day: 4 },
        { name: "星期五", day: 5 }
      ],
      lessonList: [],
      scheduleList: []
    };
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType,
      classId: state => state.info.classId
    })
  },
  methods: {
    //选择开始时间
    handleChangeStartTime(startTime, rowIndex, colIndex) {
      this.popupStartTime = true;
      this.startRowIndex = rowIndex;
      this.startColIndex = colIndex;
      this.startDate = startTime;
    },
    //选择结束时间
    handleChangeEndTime(endTime, rowIndex, colIndex) {
      this.popupEndTime = true;
      this.endRowIndex = rowIndex;
      this.endColIndex = colIndex;
      this.endDate = endTime;
    },
    //确认开始时间
    handleStartTimeConfirm(value, index) {
      this.scheduleList[this.startRowIndex].list[
        this.startColIndex
      ].startTime = value;
      this.popupStartTime = false;
    },
    //确认结束时间
    handleEndTimeConfirm(value, index) {
      this.scheduleList[this.endRowIndex].list[
        this.endColIndex
      ].endTime = value;
      this.popupEndTime = false;
    },
    //确认选择课程
    handleLessonConfirm(value, index) {
      let { title, lessonId } = value;
      //设置选择的课程
      let obj = this.scheduleList[this.rowIndex].list[this.tdIndex];
      if (obj) {
        obj.title = title || "";
        obj.lessonId = lessonId;
      }
      this.popupShow = false;
    },
    //单击选择课程
    handleChangeLesson(params, index, tdIndex) {
      let { lessonId, title } = params;
      let elementIndex = this.lessonList.findIndex(item => {
        return item.lessonId == lessonId;
      });
      this.rowIndex = index; //设置点击的行数
      this.tdIndex = tdIndex; //设置点击的td块索引值
      this.defaultIndex = elementIndex; //设置回选
      this.popupShow = true;
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
    handleDelSchedule() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除课表吗？"
        })
        .then(() => {
          if (this.roleType == 2) {
            this.deteleSchedule({ classId: this.classId });
          } else {
            this.deteleMySchedule();
          }
        })
        .catch(() => {});
    },
    handleSave() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要保存课表吗？"
        })
        .then(() => {
          if (this.roleType == 2) {
            this.updateSchedule({
              classId: this.classId,
              scheduleVOs: this.scheduleList
            });
          } else {
            this.updateMySchedule({ scheduleVOs: this.scheduleList });
          }
        })
        .catch(() => {});
      // let flag = true; //控制时间选择是否不对
      // let scheduleList = this.scheduleList;
      // for (let i = 0; i < scheduleList.length; i++) {
      //   let list = scheduleList[i].list;
      //   for (let j = 0; j < list.length; j++) {
      //     let startTime = list[j].startTime;
      //     let endTime = list[j].endTime;
      //     let result = this.handleCompareTime(startTime, endTime);
      //     if (!result) {
      //       flag = false;
      //       this.$toast(`第${i + 1}节的时间选择不对，请重新选择`);
      //       break;
      //     }
      //   }
      // }
      // if (flag) {
      //   this.updateMySchedule({ scheduleVOs: this.scheduleList });
      // }
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
          result.push({ lessonId: 0, title: "无课" });
          this.lessonList = result;
        }
      }
    },
    //查询我的课表
    async queryMySchedule(params = {}) {
      let res = await service.queryMySchedule(params);
      if (res.errorCode === 0) {
        this.scheduleList = res.data || [];
      }
    },
    //查询班级课表（老师）
    async queryClassSchedule(params = {}) {
      let res = await service.queryClassSchedule(params);
      if (res.errorCode === 0) {
        this.scheduleList = res.data || [];
      }
    },
    //编辑我的课表
    async updateMySchedule(params = {}) {
      let res = await service.updateMySchedule(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    //编辑班级课表（老师）
    async updateSchedule(params = {}) {
      let res = await service.updateSchedule(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    //删除我的课表
    async deteleMySchedule() {
      let { studentId } = this.query;
      let res = await service.deteleMySchedule({ studentId });
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    //删除班级课表（老师）
    async deteleSchedule(params = {}) {
      let res = await service.deteleSchedule(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    if (this.roleType == 2) {
      this.queryClassSchedule({ classId: this.classId });
    } else {
      this.queryMySchedule(this.query);
    }
    this.queryLessonList();
  }
};
</script>
<style lang="less" scoped>
.box {
}
</style>
