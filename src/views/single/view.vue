<template>
  <div class="page">
    <div class="page-hd"></div>
    <div class="page-bd">
      <div class="cells">
        <div class="cell min-h100" v-for="(item, index) in list" :key="index">
          <div class="cell-hd">
            <label class="label">{{ item.name }}</label>
          </div>
          <div class="cell-bd">
            <p class="text-center">{{ item.studentName }}星</p>
          </div>
          <div class="cell-ft">
            <!-- <p>{{ item.starCount }}</p> -->
            <van-rate v-model="item.starCount" :size="20" :count="5" color="#09e2bb" readonly></van-rate>
          </div>
        </div>
      </div>
      <!-- popup -->
      <!-- <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="actionList"
          show-toolbar
          value-key="title"
          :default-index="defaultIndex"
          @cancel="popupShow = false"
          @confirm="handleClassConfirm"
        ></van-picker>
      </van-popup>-->
      <!-- popup -->
      <!-- <van-tabs v-model="tabActive" :line-height="2">
        <van-tab title="优秀">
          <div class="cells">
            <div class="cell min-h100" v-for="(item, index) in excellentList" :key="index">
              <div class="cell-hd">
                <label class="label">{{ item.studentName }}</label>
              </div>
              <div class="cell-bd">
                <p class="text-right">{{ item.starCount }}星</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="良好">
          <div class="cells">
            <div class="cell min-h100" v-for="(item, index) in goodList" :key="index">
              <div class="cell-hd">
                <label class="label">{{ item.studentName }}</label>
              </div>
              <div class="cell-bd">
                <p class="text-right">{{ item.starCount }}星</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="一般">
          <div class="cells">
            <div class="cell min-h100" v-for="(item, index) in ordinaryList" :key="index">
              <div class="cell-hd">
                <label class="label">{{ item.studentName }}</label>
              </div>
              <div class="cell-bd">
                <p class="text-right">{{ item.starCount }}星</p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>-->
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "",
  data() {
    return {
      popupShow: false,
      tabActive: 0,
      tabIndex: this.$route.query.tabIndex,
      name: this.$route.query.name,
      query: {
        classId: this.$route.query.classId,
        startDate: this.$route.query.startDate,
        endDate: this.$route.query.endDate,
        actionId: this.$route.query.actionId,
        actionType: this.$route.query.actionType
      },
      list: []
      //actionList: [],
      //excellentList: [], //优秀
      //goodList: [], // 良好
      //ordinaryList: [] // 一般
    };
  },
  computed: {
    defaultIndex() {
      return this.actionList.findIndex(item => item.id == this.query.id) || 0;
    }
  },
  methods: {
    handleClassConfirm(value) {
      this.name = value.title;
      this.query.id = value.id;
      this.query.actionType = value.actionType;
      this.queryStudentActionUsers(this.query);
    },
    //行为详情
    async queryActionDetails(params = {}) {
      let res = await service.queryActionDetails(params);
      if (res.errorCode === 0) {
        this.list = res.data;
      }
    }
    //查询在家表现详细学生
    // async queryStudentActionUsers(params = {}) {
    //   let res = await service.queryStudentActionUsers(params);
    //   if (res.errorCode === 0) {
    //     this.popupShow = false;
    //     this.excellentList = res.data.excellentList;
    //     this.ordinaryList = res.data.ordinaryList;
    //     this.goodList = res.data.goodList;
    //   } else {
    //     this.$toast(`${res.errorMsg}`);
    //   }
    // },
    // //查询在校表现详细学生
    // async queryLessonStudent(params = {}) {
    //   let res = await service.queryLessonStudent(params);
    //   if (res.errorCode === 0) {
    //     this.excellentList = res.data.excellentList;
    //     this.ordinaryList = res.data.ordinaryList;
    //     this.goodList = res.data.goodList;
    //   } else {
    //     this.$toast(`${res.errorMsg}`);
    //   }
    // },
    // //查询班级学生所有行为
    // async classActionList(classId) {
    //   let res = await service.classActionList({ classId });
    //   if (res.errorCode === 0) {
    //     this.actionList = res.data;
    //   } else {
    //     this.$toast(`${res.errorMsg}`);
    //   }
    // }
  },
  mounted() {
    if (this.tabIndex == 0) {
      this.queryActionDetails(this.query);
      //this.classActionList(this.query.classId);
      //this.queryStudentActionUsers(this.query);
    } else {
      //this.queryLessonStudent(this.query);
    }
  }
};
</script>
<style lang="less" scoped>
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
}
</style>
