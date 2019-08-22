<template>
  <div class="page">
    <div class="page-hd">
      <!-- 班级选择菜单 -->
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;" id="showDatePicker" @click="popupShow = true">
          <span>{{ className }}</span>
          <van-icon name="arrow-down" size="16px"></van-icon>
        </a>
      </div>
      <!-- 班级选择菜单 -->
    </div>
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="classList"
          show-toolbar
          value-key="className"
          @cancel="popupShow = false"
          @confirm="handleClassConfirm"
        ></van-picker>
      </van-popup>
      <!-- 学校课表 -->
      <div class="schedule" v-if="list.length">
        <div class="schedule-tr flex">
          <div class="schedule-td flex-1" v-for="(week, index) in weekList" :key="index">
            <div class="block-head">{{ week.name }}</div>
          </div>
        </div>
        <div class="schedule-body flex">
          <div class="schedule-tr flex-1" v-for="(tr, index) in list" :key="index">
            <div class="schedule-td" v-for="(td, tdIndex) in tr.list" :key="tdIndex">
              <div class="block">
                <div>
                  <span class="have" v-if="td.title">{{ td.title }}</span>
                  <span class="null" v-else>无课</span>
                </div>
                <div class="schedule-time">
                  <div style="color:#1989fa;margin-top:10px;" size-12>{{ td.startTime }}</div>
                  <div style="color:#1989fa;margin-top:5px;" size-12>{{ td.endTime }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import classList from "@/mixins/classList";
export default {
  name: "",
  mixins: [classList],
  data() {
    return {
      popupShow: false,
      className: this.$store.state.user.info.className,
      query: {
        classId: this.$store.state.user.info.classId
      },
      weekList: [
        { name: "星期一", day: 1 },
        { name: "星期二", day: 2 },
        { name: "星期三", day: 3 },
        { name: "星期四", day: 4 },
        { name: "星期五", day: 5 }
      ],
      list: []
    };
  },
  methods: {
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.queryScheduleList(this.query);
    },
    //课表查询-学校
    async queryScheduleList(params = {}) {
      let res = await service.queryScheduleList(params);
      if (res.errorCode === 0) {
        this.list = res.data;
        this.popupShow = false;
      }
    }
  },
  mounted() {
    this.queryScheduleList(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>