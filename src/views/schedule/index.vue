<template>
  <div class="page">
    <div class="page-bd">
      <!-- <van-tabs v-model="tabActive" :line-height="2"> -->
      <!-- <van-tab title="班级课表"> -->
      <!-- 学校课表 -->
      <!-- <template v-if="list.length">
            <div class="schedule-top flex a-i-c j-c-s-b">
              <div>学校课表</div>
              <div class>
                <van-radio
                  name="0"
                  v-model="picked"
                  checked-color="#92cd36"
                  @click="handleRadio($event)"
                >默认</van-radio>
              </div>
            </div>
      </template>-->
      <!-- <div class="schedule" v-if="list.length">
            <div class="schedule-tr flex">
              <div class="schedule-td flex-1" v-for="(week, index) in weekList" :key="index">
                <div class="block-head">{{ week.name }}</div>
              </div>
            </div>
            <div class="schedule-body flex">
              <div class="schedule-tr flex-1" v-for="(tr, index) in list" :key="index">
                <div class="schedule-td" v-for="(td, tdIndex) in tr.list" :key="tdIndex">
                  <div class="block block-main" v-if="tdIndex < 7">
                    <div>
                      <span class="have" v-if="td.title">{{ td.title }}</span>
                      <span class="null" v-else>无课</span>
                    </div>
                    <div class="schedule-time">
                      <div style="color:#1989fa;margin-top:10px;" size-12>{{ td.startTime }}</div>
                      <div style="color:#1989fa;margin-top:5px;" size-12>{{ td.endTime }}</div>
                    </div>
                  </div>
                  <div class="block block-night block-main" v-if="tdIndex >= 7">
                    <div>
                      <span>晚自习</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>-->
      <!-- <div class="empty" v-else>
            <img src="@/assets/kong.png" alt />
            <p>暂无班级课表</p>
      </div>-->
      <!-- </van-tab> -->
      <!-- <van-tab title="自制课表"> -->
      <!-- 自制课表 -->
      <template v-if="myScheduleList.length">
        <div class="schedule-top flex a-i-c j-c-s-b">
          <div>
            <!-- <van-button type="danger" size="small" @click="handleDelMySchedule">删除课表</van-button> -->
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
      <div class="schedule" v-if="myScheduleList.length">
        <div class="schedule-tr flex">
          <div class="schedule-td flex-1" v-for="(week, index) in weekList" :key="index">
            <div class="block-head">{{ week.name }}</div>
          </div>
        </div>
        <div class="schedule-body flex">
          <div class="schedule-tr flex-1" v-for="(tr, index) in myScheduleList" :key="index">
            <div class="schedule-td" v-for="(td, tdIndex) in tr.list" :key="tdIndex">
              <div class="block block-main" v-if="tdIndex < 7">
                <div>
                  <span class="have" v-if="td.title">{{ td.title }}</span>
                  <span class="null" v-else>无课</span>
                </div>
                <!-- <div class="schedule-time">
                      <div style="color:#1989fa;margin-top:10px;" size-12>{{ td.startTime }}</div>
                      <div style="color:#1989fa;margin-top:5px;" size-12>{{ td.endTime }}</div>
                </div>-->
              </div>
              <div class="block block-night block-main" v-if="tdIndex >= 7">
                <div>
                  <span>晚自习</span>
                </div>
                <!-- <div class="schedule-time">
                      <div style="margin-top:10px;">{{ td.startTime }}</div>
                      <div style="margin-top:5px;">{{ td.endTime }}</div>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-else>
        <img src="@/assets/kong.png" alt />
        <p>暂无自制课程表</p>
      </div>
      <!-- </van-tab> -->
      <!-- </van-tabs> -->
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button
          type="info"
          size="large"
          class="no-radius"
          @click="handleJump"
          v-if="!myScheduleList.length"
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
        { name: "星期一", day: 1 },
        { name: "星期二", day: 2 },
        { name: "星期三", day: 3 },
        { name: "星期四", day: 4 },
        { name: "星期五", day: 5 }
      ],
      //list: [],
      myScheduleList: []
    };
  },
  methods: {
    handleJump() {
      //let model = this.myScheduleList.length ? "edit" : "add";
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
        this.myScheduleList = res.data || [];
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
</style>
