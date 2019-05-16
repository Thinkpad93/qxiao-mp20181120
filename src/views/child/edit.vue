<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label class="label">学生姓名</label>
          </div>
          <div class="cell-bd">
            <input class="input" placeholder="请输入姓名" maxlength="5" v-model="form.studentName">
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for class="label">手机号</label>
          </div>
          <div class="cell-bd">
            <input
              class="input"
              placeholder="请输入手机号"
              v-model="form.tel"
              readonly
              unselectable="on"
              @focus="this.blur()"
            >
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label for class="label">性别</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="form.sex">
              <option
                :value="option.id"
                v-for="(option,index) in sexList"
                :key="index"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label for class="label">关系</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="form.relation">
              <!-- 兼容性问题修改 -->
              <optgroup disabled hidden></optgroup>
              <option
                :value="option.id"
                v-for="(option,index) in relationList"
                :key="index"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleSubmit">保存修改</van-button>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "childEdit",
  mixins: [sex, relation],
  data() {
    return {
      form: {},
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$route.query.openStudentId
      }
    };
  },
  methods: {
    async handleSubmit() {
      let { studentName, tel, ...args } = this.form;
      if (studentName == "") {
        this.$toast("请完善学生名称");
      } else {
        let obj = Object.assign({}, args, { studentName });
        let res = await service.studentInfoUpdate(obj);
        if (res.errorCode === 0) {
          this.$router.go(-1);
        }
      }
    },
    //学生信息查询
    async studentQueryMe(params = {}) {
      let res = await service.studentQueryMe(params);
      if (res.errorCode === 0) {
        this.form = res.data;
      }
    }
  },
  mounted() {
    this.studentQueryMe(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
