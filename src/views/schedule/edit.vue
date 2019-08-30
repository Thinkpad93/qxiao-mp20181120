<template>
  <div class="page">
    <div class="page-bd">
      <!-- dialog -->
      <van-dialog
        :title="isDialogState == 1 ? '新增':'编辑'"
        v-model="dialogVisible"
        show-cancel-button
        @cancel="dialogVisible = false"
        :before-close="handleSubmit"
      >
        <div class="cells" style="padding:15px 0 15px 0;">
          <div class="cell min-h120">
            <div class="cell-hd">
              <label class="label">选项名称</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="如早操，升国旗" v-model.trim="form.lessonName" />
            </div>
          </div>
          <div class="cell min-h120">
            <div class="cell-hd">
              <label class="label">时长</label>
            </div>
            <div class="cell-bd">
              <p class="text-right">
                <van-stepper v-model="form.timeLong" :min="10" :max="60"></van-stepper>
              </p>
            </div>
          </div>
        </div>
      </van-dialog>
      <!-- dialog -->
      <!-- 选择课程 -->
      <van-popup class="lesson-popup" v-model="popupRight" position="right">
        <div class="cells">
          <div class="lesson">
            <div class="lesson-group">
              <van-button
                class="lesson-btn"
                type="primary"
                size="normal"
                v-for="(item, index) in lessonList.filter(item => item.type == 1)"
                :key="index"
                @click="handleLessonConfirm(item)"
              >{{ item.lessonName }}</van-button>
            </div>
            <div class="lesson-group">
              <van-button
                class="lesson-btn"
                type="warning"
                size="normal"
                v-for="(item, index) in lessonList.filter(item => item.type == 2)"
                :key="index"
                @click="handleLessonConfirm(item)"
              >{{ item.lessonName }}</van-button>
            </div>
          </div>
        </div>
      </van-popup>
      <!-- am pm 晚自习 -->
      <van-popup v-model="popupTime" position="bottom">
        <van-datetime-picker
          v-model="data"
          type="time"
          @cancel="popupTime = false"
          @confirm="handleTimeConfirm"
        ></van-datetime-picker>
      </van-popup>
      <van-tabs v-model="tabActive" :line-height="2">
        <van-tab title="配置选项">
          <!-- 班级选择 -->
          <div class="cells mt-20" v-if="roleType == 2">
            <div class="cell cell-select cell-select-after">
              <div class="cell-hd">
                <label for class="label">学生所在班级</label>
              </div>
              <div class="cell-bd">
                <select class="select" name dir="rtl" v-model="classId">
                  <!-- 兼容性问题修改 -->
                  <optgroup disabled hidden></optgroup>
                  <option
                    :value="option.classId"
                    v-for="(option,index) in classList"
                    :key="index"
                  >{{ option.className }}</option>
                </select>
              </div>
            </div>
          </div>
          <!-- am pm 晚自习 -->
          <div class="cells mt-20 mb-20">
            <div class="cell min-h120">
              <div class="cell-hd">
                <label class="label">上午开始时间</label>
              </div>
              <div class="cell-bd">
                <input
                  class="input"
                  placeholder="请输入上午开始时间"
                  v-model="config.am"
                  @click="handleSelectTime('am')"
                />
              </div>
            </div>
            <div class="cell min-h120">
              <div class="cell-hd">
                <label class="label">下午开始时间</label>
              </div>
              <div class="cell-bd">
                <input
                  class="input"
                  placeholder="请输入下午开始时间"
                  v-model="config.pm"
                  @click="handleSelectTime('pm')"
                />
              </div>
            </div>
            <div class="cell min-h120">
              <div class="cell-hd">
                <label class="label">晚自习开始时间</label>
              </div>
              <div class="cell-bd">
                <input
                  class="input"
                  placeholder="请输入晚自习开始时间"
                  v-model="config.night"
                  @click="handleSelectTime('night')"
                />
              </div>
            </div>
            <div class="cell min-h120">
              <div class="cell-hd">
                <label class="label">课程时间</label>
              </div>
              <div class="cell-bd">
                <p class="text-right">
                  <van-stepper v-model="config.lessonTime" :min="20" :max="60"></van-stepper>
                </p>
              </div>
            </div>
          </div>
          <div class="cells-title" v-if="optionList.length">
            <span>选项名称</span>
            <span>时长(分)</span>
          </div>
          <div class="cells mb-20">
            <van-swipe-cell
              ref="swipeCell"
              :right-width="60"
              v-for="(item, index) in optionList"
              :key="item.id"
              :on-close="onClose(item, index)"
            >
              <van-cell-group>
                <div class="cell min-h120" @click="onSwiptCellCick(item)">
                  <div class="cell-hd">
                    <label for class="label">{{ item.lessonName }}</label>
                  </div>
                  <div class="cell-bd">
                    <p class="text-right">{{ item.timeLong }}</p>
                  </div>
                </div>
              </van-cell-group>
              <span slot="right">删除</span>
            </van-swipe-cell>
          </div>
        </van-tab>
        <van-tab title="课表排版"></van-tab>
      </van-tabs>
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
import classList from "@/mixins/classList";
export default {
  name: "scheduleEdit",
  mixins: [classList],
  data() {
    return {
      dialogVisible: false,
      isDialogState: 1, //1是新增状态 2是编辑状态
      popupRight: false,
      popupTime: false,
      openType: "am",
      data: "",
      config: {
        am: "08:00", //上午开始时间
        pm: "14:00", //下午开始时间
        night: "19:30", //晚自习开始时间
        lessonTime: 40
      },
      optionList: [], //选项
      lessonList: [],
      weekList: [
        { name: "周一", day: 1 },
        { name: "周二", day: 2 },
        { name: "周三", day: 3 },
        { name: "周四", day: 4 },
        { name: "周五", day: 5 }
      ],
      tabActive: 0,
      form: {
        lessonName: "",
        studentId: this.$store.state.user.info.studentId,
        timeLong: 10
      }
    };
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType,
      classId: state => state.info.classId,
      studentId: state => state.info.studentId
    })
  },
  methods: {
    handleSelectTime(type) {
      this.popupTime = true;
      this.openType = type;
      if (type === "am") {
        this.data = this.am;
      } else if (type === "pm") {
        this.data = this.pm;
      } else {
        this.data = this.night;
      }
    },
    //确认选择时间
    handleTimeConfirm(value, index) {
      if (this.openType === "am") {
        this.am = value;
      } else if (this.openType === "pm") {
        this.pm = value;
      } else {
        this.night = value;
      }
      this.popupTime = false;
    },
    handleSubmit() {},
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
            this.deteleMySchedule({ studentId: this.studentId });
          }
        })
        .catch(() => {});
    },
    handleSave() {},
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
    async deteleMySchedule(params = {}) {
      let res = await service.deteleMySchedule(params);
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
    },
    //查询家长自制课表可选课程
    async queryLessonWithStudentId(params = {}) {
      let res = await service.queryLessonWithStudentId(params);
      if (res.errorCode === 0) {
        this.lessonList = res.data || [];
      }
    },
    //查询老师自制课表可选课程
    async queryLessonWithClassId(params = {}) {
      let res = await service.queryLessonWithClassId(params);
      if (res.errorCode === 0) {
        this.lessonList = res.data || [];
      }
    },
    //查询班级自增课程
    async queryMyLessonByClassId(params = {}) {
      let res = await service.queryMyLessonByClassId(params);
      if (res.errorCode === 0) {
        this.optionList = res.data || [];
      }
    },
    //查询班级自增课程
    async queryMyLessonByStudentId(params = {}) {
      let res = await service.queryMyLessonByStudentId(params);
      if (res.errorCode === 0) {
        this.optionList = res.data || [];
      }
    },
    //开始时间、课程时间
    async queryDefaulTime(params = {}) {
      let res = await service.queryDefaulTime(params);
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    if (this.roleType == 2) {
      this.queryClassSchedule({ classId: this.classId });
      this.queryLessonWithClassId({ classId: this.classId });
      this.queryMyLessonByStudentId({ classId: this.classId });
    } else {
      this.queryMySchedule({ studentId: this.studentId });
      this.queryLessonWithStudentId({ studentId: this.studentId });
      this.queryMyLessonByClassId({ studentId: this.studentId });
    }
    this.queryDefaulTime({ studentId: this.studentId });
  }
};
</script>
<style lang="less" scoped>
</style>
