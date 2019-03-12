<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div
          class="cell student-box"
          v-for="student in studentList"
          :key="student.studentId"
          @click="handleChangeStudent(student.studentId)"
        >
          <div class="cell-hd"></div>
          <div class="cell-bd">
            <p>{{ student.studentName }}</p>
          </div>
          <div class="cell-ft">
            <van-radio-group v-model="studentId">
              <van-radio :name="student.studentId" checked-color="#92cd36"></van-radio>
            </van-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import Cookies from "js-cookie";
export default {
  name: "boby",
  data() {
    return {
      studentId: parseInt(this.$store.state.student.studentId),
      query: {
        openId: this.$store.state.wx.openId
      },
      studentList: []
    };
  },
  methods: {
    handleChangeStudent(studentId) {
      if (studentId) {
        this.$dialog
          .alert({
            message: "学生切换成功"
          })
          .then(() => {
            //更新studentId值
            this.$store.commit("student/SET_STUDENTID", studentId);
            Cookies.set("studentId", studentId);
            this.$router.go(-1);
          });
      }
    },
    //查询学生列表
    async queryAllStudent(params = {}) {
      let res = await service.queryAllStudent(params);
      if (res.errorCode === 0) {
        this.studentList = res.data;
      }
    }
  },
  mounted() {
    this.queryAllStudent(this.query);
  }
};
</script>
<style lang="less">
.student-box {
  height: 120px;
}
</style>
