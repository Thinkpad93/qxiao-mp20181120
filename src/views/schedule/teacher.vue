<template>
  <div class="page">
    <div class="page-hd">
      <template v-if="roleType == 2">
        <!-- 班级选择菜单 -->
        <div class="button-sp-area flex" size-17>
          <a href="javascript:;" id="showDatePicker" @click="popupShow = true">
            <span>{{ className }}</span>
            <van-icon name="arrow-down" size="16px"></van-icon>
          </a>
        </div>
        <!-- 班级选择菜单 -->
      </template>
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
      <div class="schedule-top flex a-i-c j-c-s-b" v-if="roleType == 2 && list.length">
        <!-- <van-button type="danger" size="small" @click="handleDelSchedule">删除课表</van-button> -->
        <div></div>
        <div class="flex a-i-c" style="color:#f00" @click="handleEdit">
          <van-icon name="edit" size="20px"></van-icon>
          <span class="ml-10">编辑</span>
          <!-- <van-button type="info" size="small" @click="handleEdit">编辑课表</van-button> -->
        </div>
      </div>
      <div class="schedule" v-if="list.length">
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
                <!-- <div class="schedule-time">
                  <div style="color:#1989fa;margin-top:10px;" size-12>{{ td.startTime }}</div>
                  <div style="color:#1989fa;margin-top:5px;" size-12>{{ td.endTime }}</div>
                </div>-->
              </div>
              <div class="block block-main" v-if="tdIndex >= 7">
                <div>
                  <span>晚自习</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-if="!list.length">
        <img src="@/assets/kong.png" alt />
        <p>暂无课表</p>
      </div>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;" v-if="roleType == 2">
        <van-button type="info" size="large" class="no-radius" @click="handleAdd">创建课表</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapState } from "vuex";
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
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType
    })
  },
  methods: {
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.queryClassSchedule(this.query);
    },
    handleAdd() {
      this.$router.push({
        path: "/schedule/add"
      });
    },
    handleEdit() {
      this.$router.push({
        path: "/schedule/edit",
        query: {
          classId: this.query.classId
        }
      });
    },
    //查询班级课表（老师）
    async queryClassSchedule(params = {}) {
      let res = await service.queryClassSchedule(params);
      if (res.errorCode === 0) {
        this.list = res.data;
        this.popupShow = false;
      }
    }
  },
  activated() {
    this.queryClassSchedule(this.query);
  }
};
</script>
<style lang="less" scoped>
.page-hd {
  margin-bottom: 0;
}
</style>