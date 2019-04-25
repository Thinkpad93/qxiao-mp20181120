<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells">
        <div class="cell student-box" v-for="(item, index) in list" :key="index">
          <div class="cell-hd"></div>
          <div class="cell-bd">
            <p>{{ item.openStudentName }}</p>
          </div>
          <div class="cell-ft">
            <van-radio-group v-model="studentId">
              <van-radio :name="item.openStudentId" checked-color="#04b6ff"></van-radio>
            </van-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleAdd">添加孩子</van-button>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
export default {
  name: "childList",
  data() {
    return {
      openId: this.$store.state.user.info.openId,
      studentId: parseInt(this.$store.state.user.info.openStudentId),
      list: []
    };
  },
  watch: {
    studentId(news, old) {
      let obj = this.list.find(item => item.openStudentId == news);
      let _cookie = Cookies.getJSON("info");
      //更新cookie值
      let params = Object.assign({}, _cookie, obj);
      if (Object.keys(params).length) {
        this.$store.dispatch("user/setInfo", params);
      }
    }
  },
  methods: {
    handleAdd() {
      this.$router.push({
        path: "/child/add"
      });
    },
    //查询学生列表--开放版
    async queryOpenStudentList(params = {}) {
      let res = await service.queryOpenStudentList(params);
      if (res.errorCode === 0) {
        this.list = res.data;
      }
    }
  },
  mounted() {
    this.queryOpenStudentList({ openId: this.openId });
  }
};
</script>
<style lang="less" scoped>
.student-box {
  height: 120px;
}
</style>
