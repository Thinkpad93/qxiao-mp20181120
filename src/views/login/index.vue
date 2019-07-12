<template>
  <div class="flex-page">
    <div class="flex-bd cover">
      <!-- 提示语 -->
      <p class="tip text-center" v-if="studentId != 0">{{ name }}还没有加入班级</p>
      <form action ref="form" class="login-form">
        <div class="cells">
          <div class="form-top">
            <img src="@/assets/qlogocdr12.png" alt />
            <p size-18>小Q智慧</p>
          </div>
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <img class="ignore" src="@/assets/phone-icon@2x.png" alt />
            </div>
            <div class="cell-bd pl-20">
              <input
                type="number"
                class="input text-left"
                pattern="[0-9]*"
                placeholder="请输入手机号"
                autofocus
                v-model="form.tel"
              />
            </div>
            <div class="cell-ft">
              <a
                v-if="!hidden"
                href="javascript:void(0);"
                style="color:#92cd36"
                @click="handleSecond"
              >获取验证码</a>
              <span v-if="hidden" style="color:#8d8d8d;">{{ second }}s</span>
            </div>
          </div>
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-bd" style="padding-left:30px;">
              <input
                type="number"
                class="input text-left"
                pattern="[0-9]*"
                placeholder="请输入验证码"
                v-model="form.verifyCode"
              />
            </div>
          </div>
        </div>
        <div class="btn-group">
          <a href="javascript:void(0);" class="btn btn-large btn-primary" @click="handleLogin">登陆</a>
        </div>
        <div class="text-center">
          <span style="color:#84ce09" @click="handleTourist">未加入班级点击抢先体验</span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { isPhone } from "@/utils/validator";
import { mapState } from "vuex";
export default {
  name: "login",
  data() {
    return {
      hidden: false,
      timer: null,
      second: 60,
      form: {
        openId: this.$store.state.user.info.openId, //登陆openId
        tel: "",
        verifyCode: ""
      }
    };
  },
  computed: {
    ...mapState("user", {
      name: state => state.info.name,
      studentId: state => state.info.studentId
    })
  },
  methods: {
    handleSecond() {
      if (isPhone(this.form.tel)) {
        this.telVeriftCode(this.form.tel);
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    handleLogin() {
      if (this.form.tel === "") {
        this.$toast("请填写手机号");
        return false;
      }
      if (this.form.verifyCode === "") {
        this.$toast("请填写手机验证码");
        return false;
      }
      if (isPhone(this.form.tel)) {
        this.userTeleLogin(this.form);
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    //游客模式进入小Q班级
    async handleTourist() {
      let _cookie = Cookies.getJSON("info");
      let res = await service.experience({});
      if (res.errorCode === 0) {
        let obj = Object.assign({}, _cookie, res.data);
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
            this.$router.replace({ path: "/home" });
          }
        });
      } else {
        this.$toast("发生了错误，请重试");
      }
    },
    //获取验证码
    async telVeriftCode(tel) {
      let res = await service.telVeriftCode({ tel, codeType: 1 });
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
    //用户登录
    async userTeleLogin(params = {}) {
      let res = await service.userTeleLogin(params);
      if (res.errorCode === 0) {
        let { roleType } = res.data;
        //定时器清除
        this.second = 60;
        this.hidden = false;
        window.clearInterval(this.timer);
        this.$refs.form.reset();

        switch (roleType) {
          case 0:
            this.$toast("此手机号码还没有录入");
            break;
          case 1:
            this.$router.push({ path: "/home" });
            break;
          case 2:
          case 3:
            let _cookie = Cookies.getJSON("info");
            let obj = Object.assign({}, _cookie, res.data);
            this.$store.dispatch("user/setInfo", obj).then(data => {
              if (data.success === "ok") {
                this.$router.push({ path: "/home" });
              }
            });
            break;
          case 4:
            //进入注册页面
            this.$router.push({
              path: "/schoolCreate",
              query: {
                tel: res.data.tel,
                openId: this.$route.query.openId
              }
            });
            break;
          case 5:
            //老师进入绑定幼儿园页面
            this.$router.push({
              path: "/schoolJoin",
              query: {
                tel: res.data.tel,
                openId: this.$route.query.openId
              }
            });
            break;
          case 6:
            //学生进入完善信息页面
            this.$router.push({
              path: "/baby/supply",
              query: {
                tel: res.data.tel,
                openId: this.$route.query.openId
              }
            });
            break;
          default:
            this.$toast(`${res.errorMsg}`);
        }
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.cover {
  background-color: #cbf4fa;
}
.login-form {
  background-color: #fff;
  z-index: 10;
  width: 90%;
  min-height: 600px;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.form-top {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 50px;
}
.tip {
  color: #fff;
  padding: 20px 0;
  background-color: #f00;
}
</style>
