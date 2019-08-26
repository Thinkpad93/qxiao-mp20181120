<template>
  <div class="page">
    <div class="page-bd">
      <van-tabs v-model="tabActive" :line-height="2">
        <van-tab title="配置选项">
          <!-- 升国旗 -->
          <div class="cells mt-20">
            <div class="cell min-h100">
              <div class="cell-hd">
                <label class="label">升国旗</label>
              </div>
              <div class="cell-bd" style="text-align: right;">
                <van-switch v-model="china" size="26px" active-color="#92cd36"></van-switch>
              </div>
            </div>
          </div>
          <template v-if="china">
            <div class="cells">
              <div class="cell cell-select cell-select-after">
                <div class="cell-hd">
                  <label class="label">日期</label>
                </div>
                <div class="cell-bd">
                  <select class="select" name dir="rtl" v-model="chineseNational" multiple size="1">
                    <!-- 兼容性问题修改 -->
                    <optgroup disabled hidden></optgroup>
                    <option
                      :value="option.day"
                      v-for="(option,index) in weekList"
                      :key="index"
                    >{{ option.name }}</option>
                  </select>
                </div>
              </div>
              <div class="cell min-h100">
                <div class="cell-hd">
                  <label for class="label">升国旗时间(分)</label>
                </div>
                <div class="cell-bd">
                  <p class="text-right">
                    <van-stepper v-model="chinaTime" :min="10" :max="60"></van-stepper>
                  </p>
                </div>
              </div>
            </div>
          </template>
          <!-- 升国旗 -->
          <!-- 早操 -->
          <div class="cells mt-20">
            <div class="cell min-h100">
              <div class="cell-hd">
                <label class="label">早操</label>
              </div>
              <div class="cell-bd" style="text-align: right;">
                <van-switch v-model="exercise" size="26px" active-color="#92cd36"></van-switch>
              </div>
            </div>
          </div>
          <template v-if="exercise">
            <div class="cells">
              <div class="cell cell-select cell-select-after">
                <div class="cell-hd">
                  <label class="label">日期</label>
                </div>
                <div class="cell-bd">
                  <select class="select" name dir="rtl" v-model="exerciseList" multiple size="1">
                    <!-- 兼容性问题修改 -->
                    <optgroup disabled hidden></optgroup>
                    <option
                      :value="option.day"
                      v-for="(option,index) in weekList"
                      :key="index"
                    >{{ option.name }}</option>
                  </select>
                </div>
              </div>
              <div class="cell min-h100">
                <div class="cell-hd">
                  <label for class="label">早操时间(分)</label>
                </div>
                <div class="cell-bd">
                  <p class="text-right">
                    <van-stepper v-model="exerciseTime" :min="10" :max="60"></van-stepper>
                  </p>
                </div>
              </div>
            </div>
          </template>
          <!-- 早操 -->
          <div class="cells mt-20 mb-20">
            <div class="cell min-h100">
              <div class="cell-hd">
                <label for class="label">上午上课时间</label>
              </div>
              <div class="cell-bd">
                <input
                  class="input"
                  placeholder="请输入上午开始时间"
                  v-model="form.am"
                  @click="selectAmandPm('am')"
                />
              </div>
            </div>
            <div class="cell min-h100">
              <div class="cell-hd">
                <label for class="label">下午上课时间</label>
              </div>
              <div class="cell-bd">
                <input
                  class="input"
                  placeholder="请输入下午开始时间"
                  v-model="form.pm"
                  @click="selectAmandPm('pm')"
                />
              </div>
            </div>
            <div class="cell min-h100">
              <div class="cell-hd">
                <label for class="label">每节课时间(分)</label>
              </div>
              <div class="cell-bd">
                <p class="text-right">
                  <van-stepper v-model="form.lessonTime" :min="30" :max="60"></van-stepper>
                </p>
              </div>
            </div>
            <div class="cell min-h100">
              <div class="cell-hd">
                <label for class="label">课间休息时间(分)</label>
              </div>
              <div class="cell-bd">
                <p class="text-right">
                  <van-stepper v-model="form.recess" :min="10" :max="40"></van-stepper>
                </p>
              </div>
            </div>
          </div>
          <!-- 晚自习 -->
          <div class="cells mt-20">
            <div class="cell min-h100">
              <div class="cell-hd">
                <label class="label" style="color:#f44">晚自习</label>
              </div>
              <div class="cell-bd" style="text-align: right;">
                <van-switch v-model="night" size="26px" active-color="#92cd36"></van-switch>
              </div>
            </div>
          </div>
          <template v-if="night">
            <div class="cells mb-20">
              <div class="cell cell-select cell-select-after">
                <div class="cell-hd">
                  <label class="label">日期</label>
                </div>
                <div class="cell-bd">
                  <select class="select" name dir="rtl" v-model="nightList" multiple size="1">
                    <!-- 兼容性问题修改 -->
                    <optgroup disabled hidden></optgroup>
                    <option
                      :value="option.day"
                      v-for="(option,index) in weekList"
                      :key="index"
                    >{{ option.name }}</option>
                  </select>
                </div>
              </div>
              <div class="cell min-h100">
                <div class="cell-hd">
                  <label for class="label">晚自习开始时间</label>
                </div>
                <div class="cell-bd">
                  <input class="input" placeholder="请输入上午开始时间" v-model="nightStart" />
                </div>
              </div>
              <div class="cell min-h100">
                <div class="cell-hd">
                  <label for class="label">晚自习课间时间(分)</label>
                </div>
                <div class="cell-bd">
                  <p class="text-right">
                    <van-stepper v-model="nightTime" :min="30" :max="60"></van-stepper>
                  </p>
                </div>
              </div>
              <div class="cell min-h100">
                <div class="cell-hd">
                  <label for class="label">晚自习节数</label>
                </div>
                <div class="cell-bd">
                  <p class="text-right">
                    <van-stepper v-model="nightNode" :min="1" :max="2"></van-stepper>
                  </p>
                </div>
              </div>
            </div>
          </template>
          <!-- 晚自习 -->
          <!-- 是否有大课间 -->
          <div class="cells mt-20">
            <div class="cell min-h100">
              <div class="cell-hd">
                <label class="label" style="color:#f44">大课间</label>
              </div>
              <div class="cell-bd" style="text-align: right;">
                <van-switch v-model="switched" size="26px" active-color="#92cd36"></van-switch>
              </div>
            </div>
          </div>
          <!-- 是否有大课间 -->
          <template v-if="switched">
            <div class="cells mb-20" v-for="(item,index) in big" :key="index">
              <div class="cell cell-select cell-select-after">
                <div class="cell-bd">
                  <select class="select" name dir="rtl" v-model="item.selected" multiple size="1">
                    <!-- 兼容性问题修改 -->
                    <optgroup disabled hidden></optgroup>
                    <option
                      :value="option.day"
                      v-for="(option,index) in weekList"
                      :key="index"
                    >{{ option.name }}</option>
                  </select>
                </div>
              </div>
              <div class="cell min-h100">
                <div class="cell-hd">
                  <label for class="label">大课间时间(分)</label>
                </div>
                <div class="cell-bd">
                  <p class="text-right">
                    <van-stepper v-model="item.recess" :min="10" :max="60"></van-stepper>
                  </p>
                </div>
              </div>
              <van-checkbox-group v-model="item.result">
                <van-cell-group>
                  <van-cell v-for="node in item.node" :key="node.nodeId" :title="node.title">
                    <van-checkbox :name="node.nodeId" :key="item.nodeId" checked-color="#92cd36"></van-checkbox>
                  </van-cell>
                </van-cell-group>
              </van-checkbox-group>
            </div>
          </template>
        </van-tab>
        <van-tab title="课表查看">
          <!-- 自制课表 -->
          <div class="schedule mt-20" v-if="scheduleList.length">
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
                      <span v-if="td.title">{{ td.title ? td.title : "无课" }}</span>
                      <van-icon name="plus" size="16px" color="#999" v-else></van-icon>
                    </div>
                    <div class="schedule-time">
                      <div
                        style="color:#1989fa;margin-top:10px;"
                        @click="handleChangeStartTime(td.startTime, index, tdIndex)"
                      >{{ !td.startTime ? "开始": td.startTime}}</div>
                      <div
                        style="color:#1989fa;margin-top:5px;"
                        @click="handleChangeEndTime( td.endTime, index, tdIndex)"
                      >{{ !td.endTime ? "结束": td.endTime}}</div>
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
          <!-- 自制课表 -->
          <div class="empty" v-if="!scheduleList.length">
            <img src="@/assets/kong.png" alt />
            <p>你还没有生成课表</p>
          </div>
          <!-- 新增按钮 -->
          <!-- <div class="mt-20 text-center" v-if="scheduleList.length">
        <van-button type="info" size="small" @click="handleAdd">新增课节</van-button>
          </div>-->
        </van-tab>
      </van-tabs>
      <!-- am pm -->
      <van-popup v-model="popupAmPm" position="bottom">
        <van-datetime-picker
          v-model="ampmDate"
          type="time"
          @cancel="popupAmPm = false"
          @confirm="handleAmPmTimeConfirm"
        ></van-datetime-picker>
      </van-popup>
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
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <div class="flex">
          <van-button type="default" size="large" class="no-radius" @click="newCreate">生成课表</van-button>
          <van-button type="info" size="large" class="no-radius" @click="handleSave">保存</van-button>
        </div>
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
      china: false, //是否有升国旗
      chinaTime: 15, //升国旗时间
      chineseNational: [1], //升国旗选中时间
      exercise: false, //是否有早操
      exerciseTime: 15, //早操时间
      exerciseList: [1, 2, 3, 4, 5], //早操选中时间
      night: false, //是否有晚自习
      nightStart: "19:30", //晚自习开始时间
      nightTime: 40, //晚自习时间
      nightList: [1], //晚自习选中时间
      nightNode: 1, //晚自习节数
      tabActive: 0,
      switched: false, //是否有大课间
      result: [],
      form: {
        am: "08:00",
        pm: "14:00",
        recess: 15,
        lessonTime: 40
      },
      big: [
        {
          recess: 30, //大课间时间
          selected: [1], //课间分布星期几
          result: [], //第几节到几节有大课间时间
          node: [
            { nodeId: 1, title: "第1节跟第2节之间" },
            { nodeId: 2, title: "第2节跟第3节之间" },
            { nodeId: 3, title: "第3节跟第4节之间" },
            { nodeId: 4, title: "第4节跟第5节之间" },
            { nodeId: 5, title: "第5节跟第6节之间" },
            { nodeId: 6, title: "第6节跟第7节之间" }
          ]
        }
      ],
      openType: "am",
      ampmDate: "",
      popupAmPm: false,
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
      studentId: this.$store.state.user.info.studentId,
      model: this.$route.query.model,
      weekList: [
        { name: "星期一", day: 1 },
        { name: "星期二", day: 2 },
        { name: "星期三", day: 3 },
        { name: "星期四", day: 4 },
        { name: "星期五", day: 5 }
      ],
      lessonList: [],
      scheduleList: [] //
    };
  },
  methods: {
    //选择上午或者下午上课时间
    selectAmandPm(type) {
      this.popupAmPm = true;
      this.openType = type;
      if (type === "am") {
        this.ampmDate = this.form.am;
      } else {
        this.ampmDate = this.form.pm;
      }
    },
    handleAmPmTimeConfirm(value, index) {
      this.openType == "am" ? (this.form.am = value) : (this.form.pm = value);
      this.popupAmPm = false;
    },
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
    //新增大课间
    handleBigRecess() {
      if (this.big.length <= 4) {
        let obj = {
          day: this.big.length + 1,
          recess: 30,
          result: [],
          node: [
            { nodeId: 1, title: "第1节跟第2节之间" },
            { nodeId: 2, title: "第3节跟第4节之间" },
            { nodeId: 3, title: "第5节跟第6节之间" },
            { nodeId: 4, title: "第7节跟第8节之间" }
          ]
        };
        this.big.push(obj);
      }
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
      if (!this.scheduleList.length) {
        this.$toast(`请先生成课表，再保存哦~`);
        return;
      } else {
        let flag = true; //控制时间选择是否不对
        let scheduleList = this.scheduleList;
        for (let i = 0; i < scheduleList.length; i++) {
          let list = scheduleList[i].list;
          for (let j = 0; j < list.length; j++) {
            let startTime = list[j].startTime;
            let endTime = list[j].endTime;
            let result = this.handleCompareTime(startTime, endTime);
            if (!result) {
              flag = false;
              this.$toast(`第${i + 1}节的时间选择不对，请重新选择`);
              break;
            }
          }
        }
        //当开始时间和结束时间不为空且开始时间大于结束时间
        if (flag) {
          this.addMySchedule({ scheduleVOs: this.scheduleList });
        }
      }
    },
    //将时间转成秒数
    timeToSec(time) {
      if (typeof time === "string") {
        let hour = time.split(":")[0] * 3600; //时
        let min = time.split(":")[1] * 60; //分
        return hour + min;
      }
    },
    //生成时分
    formatTime(seconds) {
      return [parseInt(seconds / 60 / 60), parseInt((seconds / 60) % 60)]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
    },
    //根据时间生成课表
    newCreate() {
      let chinaTime = this.chinaTime * 60; //升国旗时间
      let chineseNational = this.chineseNational; //升国旗选中时间
      //早操
      let exerciseTime = this.exerciseTime * 60; //早操时间
      let exerciseList = this.exerciseList; //早操选中时间
      //晚自习
      let nightTime = this.nightTime * 60; //晚自习每节课时间
      let nightList = this.nightList; //晚自习选中时间
      //课表生成根据是否有大课间生成
      let lessonTime = this.form.lessonTime * 60; //每节课时间
      let smallRecessTime = this.form.recess * 60; //课间时间
      let amArray = [];
      let pmArray = [];
      //如果没有大课间时间
      if (!this.switched) {
        let amStartTime;
        let amEndTime;
        let pmStartTime;
        let pmEndTime;
        let nightStartTime;
        let nightEndTime;
        //上午
        for (let s = 1; s <= 5; s++) {
          amStartTime = this.timeToSec(this.form.am); //上午上课开始时间
          amEndTime = amStartTime + lessonTime; //开始时间 + 每节课时间 = 结束时间
          let list = [];
          //如果有升国旗时间，则每天的第一节课上课时间延迟
          if (this.china) {
            if (chineseNational.includes(s)) {
              console.log("如果有升国旗时间，则每天的第一节课上课时间延迟");
              amStartTime = amStartTime + chinaTime;
              amEndTime = amEndTime + chinaTime;
            }
          }
          //如果有早操时间，则每天的第一节课上课时间延迟
          if (this.exercise) {
            if (exerciseList.includes(s)) {
              console.log("如果有早操时间，则每天的第一节课上课时间延迟");
              amStartTime = amStartTime + exerciseTime;
              amEndTime = amEndTime + exerciseTime;
            }
          }
          for (let i = 1; i <= 4; i++) {
            let obj = {
              startTime: this.formatTime(amStartTime),
              endTime: this.formatTime(amEndTime)
            };
            amStartTime = amStartTime + lessonTime + smallRecessTime;
            amEndTime = amEndTime + lessonTime + smallRecessTime;
            let objs = {
              pitchId: i,
              lessonId: 0, //课程ID，默认为无课
              title: "",
              day: s, //星期，递增
              studentId: this.studentId
            };
            let assign = Object.assign({}, objs, obj);
            list.push(assign);
          }
          //下午
          pmStartTime = this.timeToSec(this.form.pm); //下午上课开始时间
          pmEndTime = pmStartTime + lessonTime;
          let list2 = [];
          for (let j = 5; j <= 7; j++) {
            let obj2 = {
              startTime: this.formatTime(pmStartTime),
              endTime: this.formatTime(pmEndTime)
            };
            pmStartTime = pmStartTime + lessonTime + smallRecessTime;
            pmEndTime = pmEndTime + lessonTime + smallRecessTime;
            let objs2 = {
              pitchId: j,
              lessonId: 0, //课程ID，默认为无课
              title: "",
              day: s, //星期，递增
              studentId: this.studentId
            };
            let assign = Object.assign({}, objs2, obj2);
            list2.push(assign);
          }
          //晚自习
          nightStartTime = this.timeToSec(this.nightStart);
          nightEndTime = nightStartTime + nightTime;
          let list3 = [];
          //如果有晚自习时间
          if (this.night) {
            if (nightList.includes(s)) {
              for (let n = 8; n <= this.nightNode + 7; n++) {
                let objs3 = {
                  pitchId: n,
                  lessonId: 0, //课程ID，默认为无课
                  title: "",
                  day: s, //星期，递增
                  studentId: this.studentId
                };
                let assign = Object.assign({}, objs3, {
                  startTime: this.formatTime(nightStartTime),
                  endTime: this.formatTime(nightEndTime)
                });

                nightStartTime = nightEndTime + smallRecessTime;
                nightEndTime = nightStartTime + nightTime;

                list3.push(assign);
              }
            }
          }
          //数组相加
          let aaa = list.concat(list2).concat(list3) || [];
          pmArray.push({ list: aaa });
        }
        console.log(pmArray);
        //用于渲染表格的所有数据
        this.scheduleList = pmArray || [];
      } else {
        //大课间列表
        //上午
        let selectedArray = [];
        let resultArray = [];
        for (let b = 0; b < this.big.length; b++) {
          let recess = this.big[b].recess;
          let selected = this.big[b].selected;
          let result = this.big[b].result;
          selectedArray.push(selected);
          resultArray.push(result);
        }
        let s = selectedArray.reduce((a, b) => a.concat(b)); //将二维数组转成一维数组
        let r = resultArray.reduce((a, b) => a.concat(b));
        let newSelectedArray = Array.from(new Set(s)); //大课间的星期数组
        let newResultArray = Array.from(new Set(r)); //大课间的节数数组
        let newRecess = this.big[0].recess * 60; //大课间时间
        let assign;
        let pmAssIgn;

        let amStartTime = this.timeToSec(this.form.am); //上午上课开始时间
        let amEndTime = amStartTime + lessonTime; //开始时间 + 每节课时间 = 结束时间
        //如果没有选择节数，则不生成课表
        if (!newResultArray.length) {
          this.$toast(`请选择大课间在第几节~`);
          return;
        }
        //上午节数
        for (let s = 1; s <= 5; s++) {
          let amStartTime = this.timeToSec(this.form.am); //上午上课开始时间
          let amEndTime = amStartTime + lessonTime; //开始时间 + 每节课时间 = 结束时间
          let list = [];
          //周一到周五
          for (let i = 1; i <= 4; i++) {
            let objs = {
              pitchId: i,
              lessonId: 0, //课程ID，默认为无课
              title: "",
              day: s, //星期，递增
              studentId: this.studentId
            };
            //判断周几有大课间
            if (newSelectedArray.includes(s)) {
              //判断哪一节有大课间
              if (newResultArray.includes(i)) {
                assign = Object.assign({}, objs, {
                  startTime: this.formatTime(amStartTime),
                  endTime: this.formatTime(amEndTime)
                });
                amStartTime = amEndTime + newRecess;
                amEndTime = amStartTime + lessonTime;
              } else {
                assign = Object.assign({}, objs, {
                  startTime: this.formatTime(amStartTime),
                  endTime: this.formatTime(amEndTime)
                });
                amStartTime = amStartTime + lessonTime + smallRecessTime;
                amEndTime = amEndTime + lessonTime + smallRecessTime;
              }
            } else {
              assign = Object.assign({}, objs, {
                startTime: this.formatTime(amStartTime),
                endTime: this.formatTime(amEndTime)
              });
              amStartTime = amStartTime + lessonTime + smallRecessTime;
              amEndTime = amEndTime + lessonTime + smallRecessTime;
            }
            list.push(assign);
          }
          //下午节数
          let pmStartTime = this.timeToSec(this.form.pm);
          let pmEndTime = pmStartTime + lessonTime;
          let list2 = [];
          for (let i = 5; i <= 7; i++) {
            let objs2 = {
              pitchId: i,
              lessonId: 0, //课程ID，默认为无课
              title: "",
              day: s, //星期，递增
              studentId: this.studentId
            };
            if (newSelectedArray.includes(s)) {
              if (newResultArray.includes(i)) {
                pmAssIgn = Object.assign({}, objs2, {
                  startTime: this.formatTime(pmStartTime),
                  endTime: this.formatTime(pmEndTime)
                });
                pmStartTime = pmEndTime + newRecess;
                pmEndTime = pmStartTime + lessonTime;
              } else {
                pmAssIgn = Object.assign({}, objs2, {
                  startTime: this.formatTime(pmStartTime),
                  endTime: this.formatTime(pmEndTime)
                });
                pmStartTime = pmStartTime + lessonTime + smallRecessTime;
                pmEndTime = pmEndTime + lessonTime + smallRecessTime;
              }
            } else {
              pmAssIgn = Object.assign({}, objs2, {
                startTime: this.formatTime(pmStartTime),
                endTime: this.formatTime(pmEndTime)
              });
              pmStartTime = pmStartTime + lessonTime + smallRecessTime;
              pmEndTime = pmEndTime + lessonTime + smallRecessTime;
            }
            list2.push(pmAssIgn);
          }
          //晚自习
          let nightStartTime = this.timeToSec(this.nightStart);
          let nightEndTime = nightStartTime + nightTime;
          let list3 = [];
          //如果有晚自习时间
          if (this.night) {
            if (nightList.includes(s)) {
              for (let n = 8; n <= this.nightNode + 7; n++) {
                let objs3 = {
                  pitchId: n,
                  lessonId: 0, //课程ID，默认为无课
                  title: "",
                  day: s, //星期，递增
                  studentId: this.studentId
                };
                let assign = Object.assign({}, objs3, {
                  startTime: this.formatTime(nightStartTime),
                  endTime: this.formatTime(nightEndTime)
                });

                nightStartTime = nightEndTime + smallRecessTime;
                nightEndTime = nightStartTime + nightTime;

                list3.push(assign);
              }
            }
          }
          let aaa = list.concat(list2).concat(list3) || [];
          pmArray.push({ list: aaa });
        }
        console.log(pmArray);
        //用于渲染表格的所有数据
        this.scheduleList = pmArray || [];
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
    //自制我的课表
    async addMySchedule(params = {}) {
      let res = await service.addMySchedule(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    this.queryLessonList();
  }
};
</script>
<style lang="less" scoped>
</style>
