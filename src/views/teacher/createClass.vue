<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells-title">基础信息</div>
      <div class="cells mb-20">
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">学校</label>
          </div>
          <div class="cell-bd">
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入学校名称"
                v-model="form.schoolName"
                @input="handleSearch($event)"
              >
            </div>
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">班级</label>
          </div>
          <div class="cell-bd">
            <div class="cell-bd">
              <input class="input" placeholder="请输入班级名称" v-model="form.className">
            </div>
          </div>
        </div>
      </div>
      <div class="cells">
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">老师姓名</label>
          </div>
          <div class="cell-bd">
            <div class="cell-bd">
              <input class="input" placeholder="请输入老师姓名" maxlength="5" v-model="form.teacherName">
            </div>
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">手机号</label>
          </div>
          <div class="cell-bd">
            <input
              class="input"
              type="number"
              pattern="[0-9]*"
              placeholder="请输入手机号"
              v-model="form.tel"
            >
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-bd">
            <input class="input text-left" maxlength="6" placeholder="请输入验证码" v-model="form.code">
          </div>
          <div class="cell-ft">
            <a href="javascript:void(0);" style="color:#92cd36" @click="handleSecond">获取验证码</a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-ft">
      <van-button size="large" type="info" class="no-radius" @click="handleSubmit">提交</van-button>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { isPhone } from "@/utils/validator";
export default {
  name: "createClass",
  data() {
    return {
      form: {
        schoolName: "",
        id: 0,
        className: "",
        teacherName: "",
        tel: "",
        code: "",
        openId: this.$route.query.openId
      },
      schoolList: []
    };
  },
  methods: {
    handleSearch(e) {
      //console.log(e.target.value);
      //e.target.value && this.querySchoolName(e.target.value);
    },
    handleSecond() {
      if (isPhone(this.form.tel)) {
        this.telVeriftCode(this.form.tel);
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    handleSubmit() {
      let { schoolName, className, teacherName, tel, code } = this.form;
      if (schoolName == "") {
        this.$toast("请输入学校名称");
        return false;
      }
      if (className == "") {
        this.$toast("请输入班级名称");
        return false;
      }
      if (teacherName == "") {
        this.$toast("请输入老师姓名");
        return false;
      }
      if (code == "") {
        this.$toast("请填写手机验证码");
        return false;
      }
      if (isPhone(tel)) {
        console.log(this.form);
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    //获取验证码
    async telVeriftCode(tel) {
      let res = await service.telVeriftCode({ tel });
      if (res.errorCode === 0) {
        this.$toast("验证码已经发送，请注意查收");
      }
    },
    //查询学校模板
    async querySchoolName(schoolName) {
      let res = await service.querySchoolName({ schoolName });
      if (res.errorCode === 0) {
      }
    },
    //创建班级
    async addPlaySchoolWithTemplate(params = {}) {
      let res = await service.addPlaySchoolWithTemplate(params);
      if (res.errorCode === 0) {
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
