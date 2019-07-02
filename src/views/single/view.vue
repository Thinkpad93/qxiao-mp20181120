<template>
  <div class="page">
    <div class="page-hd">
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;" id="showDatePicker" @click="popupShow = true">
          <span>{{ name }}</span>
          <van-icon name="arrow-down" size="16px"></van-icon>
        </a>
      </div>
    </div>
    <div class="page-bd">
      <!-- popup -->
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="actionList"
          show-toolbar
          value-key="title"
          :default-index="defaultIndex"
          @cancel="popupShow = false"
          @confirm="handleClassConfirm"
        ></van-picker>
      </van-popup>
      <!-- popup -->
      <van-tabs v-model="tabActive" :line-height="2">
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
      </van-tabs>
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
        date: this.$route.query.date,
        id: this.$route.query.id,
        actionType: this.$route.query.actionType
      },
      actionList: [],
      excellentList: [], //优秀
      goodList: [], // 良好
      ordinaryList: [] // 一般
    };
  },
  computed: {
    defaultIndex() {
      return this.actionList.findIndex(item => item.id == this.query.id) || 0;
    }
  },
  methods: {
    handleClassConfirm(value) {
      console.log(value);
      this.name = value.title;
      this.query.id = value.id;
      this.query.actionType = value.actionType;
      this.queryStudentActionUsers(this.query);
    },
    //查询在家表现详细学生
    async queryStudentActionUsers(params = {}) {
      let res = await service.queryStudentActionUsers(params);
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.excellentList = res.data.excellentList;
        this.ordinaryList = res.data.ordinaryList;
        this.goodList = res.data.goodList;
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //查询在校表现详细学生
    async queryLessonStudent(params = {}) {
      let res = await service.queryLessonStudent(params);
      if (res.errorCode === 0) {
        this.excellentList = res.data.excellentList;
        this.ordinaryList = res.data.ordinaryList;
        this.goodList = res.data.goodList;
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //查询班级学生所有行为
    async classActionList(classId) {
      let res = await service.classActionList({ classId });
      if (res.errorCode === 0) {
        this.actionList = res.data;
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    if (this.tabIndex == 0) {
      this.classActionList(this.query.classId);
      this.queryStudentActionUsers(this.query);
    } else {
      this.queryLessonStudent(this.query);
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
