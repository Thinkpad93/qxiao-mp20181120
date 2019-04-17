<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div
          class="cell student-box"
          v-for="student in studentList"
          :key="student.studentId"
          @click="handleChangeStudent(student)"
        >
          <div class="cell-hd"></div>
          <div class="cell-bd">
            <p>{{ student.studentName }}({{ student.className }})</p>
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
    handleChangeStudent(student) {
      if (student) {
        Cookies.set("studentId", student.studentId);
        Cookies.set("className", student.className);
        Cookies.set("classId", student.classId);
        this.$store.commit("student/SET_STUDENTID", student.studentId);
        this.$store.commit("users/SET_CLASSNAME", student.className);
        this.$store.commit("users/SET_CLASSID", student.classId);
        this.$store.dispatch("queryClass/queryStudentClass", {
          id: this.$store.state.users.id,
          studentId: student.studentId
        });
        this.$router.go(-1);
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
<style lang="less" scoped>
.student-box {
  height: 120px;
}
</style>
