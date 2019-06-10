<template>
  <div class="flex-page">
    <div class="flex-bd">
      <van-popup v-model="popupShow" position="bottom"></van-popup>
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
                @blur="handleSearch($event)"
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
            <a
              href="javascript:void(0);"
              v-if="!hidden"
              style="color:#92cd36"
              @click="handleSecond"
            >获取验证码</a>
            <span v-if="hidden" style="color:#8d8d8d;">{{ second }}s</span>
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
      hidden: false,
      timer: null,
      second: 60,
      popupShow: false,
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
      this.querySchoolName(e.target.value);
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
        this.addPlaySchoolWithTemplate(this.form);
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    //获取验证码
    async telVeriftCode(tel) {
      let res = await service.telVeriftCode({ tel, codeType: 0 });
      if (res.errorCode === 0) {
        this.$toast("验证码已经发送，请注意查收");
        this.hidden = true;
        this.timer = setInterval(() => {
          if (this.second === 1) {
            this.second = 60;
            this.hidden = false;
            window.clearInterval(this.timer);
          }
          this.second--;
        }, 1000);
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
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
        this.second = 60;
        this.hidden = false;
        //定时器清除
        window.clearInterval(this.timer);
        let _cookie = Cookies.getJSON("info");
        let obj = Object.assign({}, _cookie, res.data);
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
            this.$router.push({
              path: "/teacher/success",
              query: {
                classId: res.data.classId
              }
            });
          }
        });
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
