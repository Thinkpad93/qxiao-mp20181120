<template>
  <div class="page">
    <div class="page-bd">
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
      tabActive: 0,
      tabIndex: this.$route.query.tabIndex,
      query: {
        classId: this.$route.query.classId,
        date: this.$route.query.date,
        id: this.$route.query.id
      },
      excellentList: [], //优秀
      goodList: [], // 良好
      ordinaryList: [] // 一般
    };
  },
  methods: {
    //查询在家表现详细学生
    async queryStudentActionUsers(params = {}) {
      let res = await service.queryStudentActionUsers(params);
      if (res.errorCode === 0) {
        this.excellentList = res.data.excellentList;
        this.ordinaryList = res.data.ordinaryList;
        this.goodList = res.data.goodList;
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    },
    async queryLessonStudent(params = {}) {
      let res = await service.queryLessonStudent(params);
      if (res.errorCode === 0) {
        this.excellentList = res.data.excellentList;
        this.ordinaryList = res.data.ordinaryList;
        this.goodList = res.data.goodList;
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    if (this.tabIndex == 0) {
      this.queryStudentActionUsers(this.query);
    } else {
      this.queryLessonStudent(this.query);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
