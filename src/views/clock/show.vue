<template>
  <div class="page">
    <div class="page-hd">
      <div class="class-mod">
        <van-button type="info" round size="small" style="min-width:100px;">{{ className }}</van-button>
      </div>
    </div>
    <div class="pae-bd">
      <!-- 修改学生考勤状态 -->
      <van-dialog
        title="学生考勤状态修改"
        v-model="dialogVisible"
        show-cancel-button
        @cancel="dialogVisible = false"
        :before-close="handleSubmit"
      >
        <van-radio-group v-model="form.studentStatus">
          <van-cell-group>
            <van-cell :title="item.title" v-for="(item, index) in statusList" :key="index">
              <van-radio :name="item.studentStatus" checked-color="#92cd36"></van-radio>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-dialog>
      <!-- 修改学生考勤状态 -->
      <div class="table">
        <div class="table-head">
          <div class="tr">
            <div class="th">
              <i style="background-color:#92cd36;"></i>
              <span size-14>表示已打卡</span>
            </div>
            <div class="th">
              <i style="background-color:#febf56;"></i>
              <span size-14>表示未打卡</span>
            </div>
          </div>
        </div>
        <div class="table-body">
          <div class="tr">
            <div
              class="td"
              :class="[item.punchStatus == 1 ? 'td-success': 'td-default']"
              v-for="item in list"
              :key="item.studentId"
              @click="handleChangeStatus(item)"
            >
              <div>
                <img :src="item.photo" v-if="item.photo" />
                <img src="@/assets/child-default@2x.png" v-else />
                <div class>
                  <span>{{ item.studentName }}</span>
                </div>
                <div size-12>
                  <span v-if="item.studentStatus == 0"></span>
                  <span v-else-if="item.studentStatus == 1">请假</span>
                  <span v-else-if="item.studentStatus == 2">缺勤</span>
                  <span v-else-if="item.studentStatus == 3">漏打卡</span>
                  <span v-else>出勤</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 打卡记录列表 -->
      <div class="cells" style="margin-top:15px;">
        <div class="cell" v-for="item in punchList" :key="item.studentId">
          <div class="cell-hd">
            <label for class="label">{{ item.studentName }}</label>
          </div>
          <div class="cell-bd">
            <p class="cell-p">{{ item.postTime }}</p>
          </div>
        </div>
      </div>
      <!-- 打卡记录列表 -->
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import service from "@/api";
export default {
  name: "clockShow",
  data() {
    return {
      studentStatus: 1,
      dialogVisible: false,
      className: this.$route.query.className,
      query: {
        date: this.$route.query.date,
        classId: this.$route.query.classId
      },
      form: {
        studentId: null,
        studentStatus: null
      },
      statusList: [
        { title: "请假", studentStatus: 1 },
        { title: "缺勤", studentStatus: 2 },
        { title: "漏打卡", studentStatus: 3 },
        { title: "出勤", studentStatus: 4 }
      ],
      list: [],
      punchList: []
    };
  },
  methods: {
    async handleSubmit(action, done) {
      if (action === "confirm") {
        let res = await service.changeStatus(this.form);
        if (res.errorCode === 0) {
          done();
          this.$toast(`修改成功`);
          this.dialogVisible = false;
          this.queryAttendance(this.query);
        }
      } else {
        done();
      }
    },
    handleChangeStatus(params) {
      if (dayjs().format("YYYY-MM-DD") == this.query.date) {
        let { studentStatus, studentId } = params;
        this.dialogVisible = true;
        this.form.studentStatus = studentStatus;
        this.form.studentId = studentId;
      } else {
        this.$toast(`学生考勤状态只能修改当天的`);
      }
    },
    //考勤统计详情
    async queryAttendance(params = {}) {
      let res = await service.queryAttendance(params);
      if (res.errorCode === 0) {
        this.list = res.data;
      }
    },
    //改变学生出勤状态
    async changeStatus(params = {}) {
      let res = await service.changeStatus(params);
      if (res.errorCode === 0) {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //出勤管理-查询学生打卡时间
    async queryStudentPunchList(params = {}) {
      let res = await service.queryStudentPunchList(params);
      if (res.errorCode === 0) {
        this.punchList = res.data;
      }
    }
  },
  activated() {
    this.queryAttendance(this.query);
    this.queryStudentPunchList(this.query);
  }
};
</script>
<style lang="less" scoped>
.class-mod {
  text-align: center;
  padding: 20px 0;
  background-color: #fff;
}
.table {
  background-color: #fff;
  .tr {
    display: flex;
    flex-wrap: wrap;
  }
}
.table-head {
  padding: 24px 0;
  .th {
    flex: 1;
    text-align: center;
    font-size: 0;
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      vertical-align: top;
    }
  }
}
.table-body {
  .td {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 200px;
    position: relative;
    text-align: center;
    color: #fff;
    background-color: #fff;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      bottom: 0;
      border-left: 1px solid #e5e5e5;
      color: #e5e5e5;
      transform-origin: 0 0;
      transform: scaleX(0.5);
    }
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #e5e5e5;
      color: #e5e5e5;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
    &-success {
      background-color: #9cd248;
    }
    &-default {
      background-color: #fda322;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    span {
      display: inline-block;
      margin-top: 10px;
    }
  }
}
</style>
