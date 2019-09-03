<template>
  <div class="page">
    <div class="page-bd">
      <!-- 自制课表 -->
      <template v-if="tableData.length">
        <div class="schedule-top flex a-i-c j-c-s-b">
          <div>
            <van-button type="info" size="small" @click="handleEdit">编辑课表</van-button>
            <van-button type="danger" size="small" @click="handleDelSchedule">删除课表</van-button>
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

      <table class="schedule" align="center" style="width:100%;" v-if="tableData.length">
        <thead>
          <tr>
            <th>
              <span>星期</span>
              <span></span>
            </th>
            <th v-for="(week, index) in weekList" :key="index">{{ week.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="schedule-tr" v-for="(tr, index) in tableData" :key="index">
            <template>
              <td v-if="index == 0" :rowspan="amCount">上午</td>
              <td v-if="index == amCount" :rowspan="pmCount">下午</td>
              <td v-if="index == pmCount + amCount" :rowspan="nightCount">晚自习</td>
            </template>
            <td class="schedule-td" v-for="(td, tdIndex) in tr.list" :key="tdIndex">
              <span v-if="td.lessonName">{{ td.lessonName }}</span>
              <span class="have" v-else>-</span>
              <div>{{ td.startTime }}-{{ td.endTime }}</div>
            </td>
          </tr>
        </tbody>
      </table>
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
      amCount: 0,
      pmCount: 0,
      nightCount: 0,
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
    //删除课表
    handleDelSchedule() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除课表吗？"
        })
        .then(() => {
          this.deteleMySchedule({ studentId: this.querys.studentId });
        })
        .catch(() => {});
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
    //删除我的课表
    async deteleMySchedule(params = {}) {
      let res = await service.deteleMySchedule(params);
      if (res.errorCode === 0) {
        this.tableData = [];
      }
    },
    //查询我的课表-自制
    async queryMySchedule(params = {}) {
      let res = await service.queryMySchedule(params);
      if (res.errorCode === 0) {
        if (res.data.length) {
          let result = res.data || [];
          let amCount = 0;
          let pmCount = 0;
          let nightCount = 0;
          for (let i = 0; i < result.length; i++) {
            let list = result[i].list;
            for (let l = 0; l < list.length; l++) {
              let timePeriod = list[l].timePeriod;
              if (timePeriod == 1) {
                amCount++;
              }
              if (timePeriod == 2) {
                pmCount++;
              }
              if (timePeriod == 3) {
                nightCount++;
              }
            }
          }
          this.amCount = amCount / 5;
          this.pmCount = pmCount / 5;
          this.nightCount = nightCount / 5;
          this.tableData = res.data || [];
        }
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
  mounted() {},
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
th,
td {
  font-size: 24px;
  height: 100px;
  border: 1px solid #ebeef5;
  text-align: center;
}
th {
  height: 80px;
  white-space: nowrap;
  background-color: #f5f7fa;
}
</style>
