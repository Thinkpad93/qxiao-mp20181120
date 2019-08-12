<template>
  <div class="page">
    <div class="page-bd">
      <p size-18 class="mt-20 mb-20 pl-20">问题描述</p>
      <div class="cells">
        <div class="cell">
          <div class="cell-bd">
            <textarea
              class="textarea"
              placeholder="请填写您的意见和建议..."
              rows="10"
              v-model="form.textContent"
            ></textarea>
          </div>
        </div>
        <div class="cell cell-input cell-input-after">
          <div class="cell-hd">
            <label for class="label">选择老师</label>
          </div>
          <div class="cell-bd">
            <select class="select" name="select" dir="rtl" v-model="form.teacherId">
              <!-- 兼容性问题修改 -->
              <optgroup disabled hidden></optgroup>
              <option
                :value="option.teacherId"
                v-for="(option,index) in teacherList"
                :key="index"
              >{{ option.teacherName }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button type="info" size="large" class="no-radius" @click="handleSubmit">发送</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "feedAdd",
  data() {
    return {
      query: {
        studentId: this.$store.state.user.info.studentId
      },
      form: {
        studentId: this.$store.state.user.info.studentId,
        textContent: "",
        teacherId: null,
        openId: this.$store.state.user.info.openId
      },
      teacherList: []
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.textContent == "") {
        this.$toast("请输入内容");
        return;
      }
      if (!this.form.teacherId) {
        this.$toast("请选择老师");
        return;
      }
      this.addFeedWithStudent(this.form);
    },
    //查询孩子所在班级的老师
    async queryTeacherWithStudentId(params = {}) {
      let res = await service.queryTeacherWithStudentId(params);
      if (res.errorCode === 0) {
        this.teacherList = res.data;
      }
    },
    //新增意见反馈
    async addFeedWithStudent(params = {}) {
      let res = await service.addFeedWithStudent(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    this.queryTeacherWithStudentId(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
