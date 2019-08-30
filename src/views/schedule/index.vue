<template>
  <div class="page">
    <div class="page-bd">
      <!-- 自制课表 -->
      <template v-if="tableData.length">
        <div class="schedule-top flex a-i-c j-c-s-b">
          <div>
            <van-button type="info" size="small" @click="handleEdit">编辑课表</van-button>
          </div>
          <div class>
            <van-radio
              name="1"
              v-model="picked"
              checked-color="#92cd36"
              @click="handleRadio($event)"
            >默认</van-radio>
          </div>
        </div>
      </template>

      <!-- <table class="schedule" align="center" style="width:100%;">
        <thead>
          <tr>
            <th>
              <span>星期</span>
              <span></span>
            </th>
            <th v-for="(week, index) in weekList" :key="index">{{ week.name }}</th>
          </tr>
        </thead>
        <tbody class="flex">
          <tr class="schedule-tr flex-1" v-for="(tr, index) in tableData" :key="index">
            <td class="schedule-td" v-for="(td, tdIndex) in tr.list" :key="tdIndex">
              <template v-if="td.timePeriod == 1">
                <span v-if="td.lessonName">{{ td.lessonName ? td.lessonName : "-" }}</span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>-->

      <div class="schedule" v-if="tableData.length">
        <div class="schedule-tr flex">
          <div class="schedule-td flex-1">
            <div class="block-head">时间</div>
          </div>
          <div class="schedule-td flex-1" v-for="(week, index) in weekList" :key="index">
            <div class="block-head">{{ week.name }}</div>
          </div>
        </div>
        <div class="schedule-body flex">
          <div class="schedule-tr flex-1"></div>
          <div class="schedule-tr flex-1" v-for="(tr, index) in tableData" :key="index">
            <div class="schedule-td" v-for="(td, tdIndex) in tr.list" :key="tdIndex">
              <div class="block block-main">
                <div>
                  <span class="have" v-if="td.lessonName">{{ td.lessonName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-else>
        <img src="@/assets/kong.png" alt />
        <p>暂无自制课程表</p>
      </div>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button
          type="info"
          size="large"
          class="no-radius"
          @click="handleJump"
          v-if="!tableData.length"
        >自制课程表</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "schedule",
  data() {
    return {
      tabActive: 0,
      picked: "0",
      query: {
        classId: this.$store.state.user.info.classId
      },
      querys: {
        studentId: this.$store.state.user.info.studentId
      },
      weekList: [
        { name: "周一", day: 1 },
        { name: "周二", day: 2 },
        { name: "周三", day: 3 },
        { name: "周四", day: 4 },
        { name: "周五", day: 5 }
      ],
      tableData: []
    };
  },
  methods: {
    handleJump() {
      this.$router.push({
        path: `/schedule/add`
      });
    },
    handleEdit() {
      this.$router.push({
        path: `/schedule/edit`,
        query: {
          classId: this.query.classId
        }
      });
    },
    //radio事件
    handleRadio(e) {
      let obj = {
        classId: this.query.classId,
        studentId: this.querys.studentId,
        checked: parseInt(this.picked)
      };
      this.checkedSchedule(obj);
    },
    //课表查询-学校
    // async queryScheduleList(params = {}) {
    //   let res = await service.queryScheduleList(params);
    //   if (res.errorCode === 0) {
    //     this.list = res.data || [];
    //   }
    // },
    //查询我的课表-自制
    async queryMySchedule(params = {}) {
      let res = await service.queryMySchedule(params);
      if (res.errorCode === 0) {
        this.tableData = res.data || [];
      }
    },
    //选中默认课表
    async checkedSchedule(params = {}) {
      let res = await service.checkedSchedule(params);
      if (res.errorCode === 0) {
      }
    },
    //查询课表状态
    async queryScheduleCheckedState(params = {}) {
      let res = await service.queryScheduleCheckedState(params);
      if (res.errorCode === 0) {
        let { schedule } = res.data || {};
        if (schedule != null) {
          this.picked = schedule.toString();
        }
      }
    }
  },
  mounted() {
    //this.queryScheduleList(this.query);
  },
  activated() {
    this.queryMySchedule(this.querys);
    this.queryScheduleCheckedState({
      classId: this.query.classId,
      studentId: this.querys.studentId
    });
  }
};
</script>
<style lang="less" scoped>
table {
  color: #606266;
  border-collapse: collapse;
  text-align: center;
  table-layout: fixed;
}
th {
  white-space: nowrap;
  background-color: #f5f7fa;
}
tr,
th,
td {
  font-size: 24px;
  height: 100px;
  border: 1px solid #ebeef5;
  text-align: center;
}
</style>
