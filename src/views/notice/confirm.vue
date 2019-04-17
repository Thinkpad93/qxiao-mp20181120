<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div class="cell student-box" v-for="student in studentList" :key="student.studentId">
          <div class="cell-bd">
            <p>{{ student.studentName }}</p>
          </div>
          <div class="cell-ft">
            <a
              :class="[ student.confirmFlag ? 'btn-default': 'btn-primary' ]"
              href="javascript:void(0);"
              class="confirm_student"
              @click="handleConfirmFlag(student)"
            >{{ student.confirmFlag ? '已确认':'确认'}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "noticeConfirm",
  data() {
    return {
      query: {
        openId: this.$store.state.wx.openId,
        noticeId: this.$route.query.noticeId
      },
      studentList: []
    };
  },
  methods: {
    handleConfirmFlag(student) {
      let { studentId, confirmFlag } = student;
      if (!confirmFlag) {
        let obj = Object.assign({}, this.query, { studentId });
        this.noticeConfirm(obj);
      }
    },
    //根据OpenId获取学生信息（家长端）
    async studentInfo(params = {}) {
      let res = await service.studentInfo(params);
      if (res.errorCode === 0) {
        this.studentList = res.data;
      }
    },
    //家长公告确认
    async noticeConfirm(params = {}) {
      let res = await service.noticeConfirm(params);
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    this.studentInfo(this.query);
  }
};
</script>
<style lang="less" scoped>
.student-box {
  height: 120px;
}
.confirm_student {
  color: #fff;
  border-radius: 30px;
  display: inline-block;
  padding: 14px 30px;
  box-shadow: 0 2px 20px 0 rgba(128, 199, 17, 0.3);
}
</style>
