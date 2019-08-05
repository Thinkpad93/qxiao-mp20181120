<template>
  <div class="page">
    <template v-if="roleType == 2">
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
    </template>
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
      <!-- 课表 -->
      <div class="schedule" v-if="list.length">
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
                <div size-12 class="time">{{ tr.startTime }}-{{ tr.endTime }}</div>
              </div>
            </div>
            <template v-if="tr.list">
              <div class="schedule-td flex-1" v-for="(td, indexs) in tr.list" :key="indexs">
                <div class="block">{{ td.title ? td.title : "无课" }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="empty" v-if="!list.length">
        <img src="@/assets/kong.png" alt />
        <p>暂无课程表</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import classList from "@/mixins/classList";
export default {
  name: "schedule",
  mixins: [classList],
  data() {
    return {
      popupShow: false,
      roleType: this.$store.state.user.info.roleType,
      className: this.$store.state.user.info.className,
      query: {
        classId: this.$store.state.user.info.classId
      },
      weekList: ["星期一", "星期二", "星期三", "星期四", "星期五"],
      list: []
    };
  },
  methods: {
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.queryScheduleList(this.query);
    },
    //课表查询
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
