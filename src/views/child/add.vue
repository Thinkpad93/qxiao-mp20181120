<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label class="label">姓名</label>
          </div>
          <div class="cell-bd">
            <input class="input" placeholder="请输入姓名" maxlength="5" v-model="form.studentName">
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
        <div class="cell">
          <div class="cell-hd">
            <label class="label">家长手机号码</label>
          </div>
          <div class="cell-bd">
            <input class="input" pattern="[0-9]*" placeholder="请输入手机号" v-model="form.tel">
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
      <van-button type="info" size="large" class="no-radius" @click="handleSubmit">添加</van-button>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "",
  mixins: [sex, relation],
  data() {
    return {
      form: {
        openId: this.$store.state.user.info.openId,
        studentName: "",
        sex: 1,
        tel: "",
        relation: 1
      }
    };
  },
  methods: {
    handleSubmit() {
      let { studentName, tel } = this.form;
      if (studentName == "") {
        this.$toast("请输入姓名");
        return;
      }
      if (isPhone(tel)) {
        this.addStudentWithOpen(this.form);
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    async addStudentWithOpen(params = {}) {
      let res = await service.addStudentWithOpen(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
