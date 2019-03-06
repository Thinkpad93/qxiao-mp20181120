<template>
  <div class="page">
    <div class="page-bd">
      <div class="cover">
        <img src="@/assets/image/login-bg@2x.png" alt>
      </div>
      <form action ref="form" class="login-form">
        <div class="cells">
          <div class="form-top">
            <img src="@/assets/image/qlogocdr12.png" alt>
            <p size-18>小Q智慧</p>
          </div>
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <img class="ignore" src="@/assets/image/phone-icon@2x.png" alt>
            </div>
            <div class="cell-bd">
              <input
                type="number"
                class="input text-left"
                pattern="[0-9]*"
                placeholder="请输入手机号"
                autofocus
                v-model="form.tel"
              >
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
              >
            </div>
          </div>
        </div>
        <div class="btn-group">
          <a href="javascript:void(0);" class="btn btn-large btn-primary" @click="handleLogin">登陆</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { isPhone } from "@/utils/validator";
import { mapGetters } from "vuex";
export default {
  name: "login",
  data() {
    return {
      hidden: false,
      timer: null,
      second: 60,
      form: {
        tel: "",
        verifyCode: ""
      }
    };
  },
  computed: {
    ...mapGetters(["roleType"])
  },
  methods: {
    handleSecond() {
      if (isPhone(this.form.tel)) {
        this.hidden = true;
        this.timer = setInterval(() => {
          if (this.second === 1) {
            this.second = 60;
            this.hidden = false;
            window.clearInterval(this.timer);
          }
          this.second--;
        }, 1000);
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
    //获取验证码
    async telVeriftCode(tel) {
      let res = await service.telVeriftCode({ tel });
      if (res.errorCode === 0) {
        this.$toast("验证码已经发送，请注意查收");
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //用户登录
    async userTeleLogin(params = {}) {
      let res = await this.$store.dispatch("account/userTeleLogin", params);
      if (res.errorCode === 0) {
        //定时器清除
        this.second = 60;
        this.hidden = false;
        window.clearInterval(this.timer);
        let { roleType } = res.data;
        if (roleType !== 0) {
          this.form.tel = "";
          this.form.verifyCode = "";
        }
        switch (roleType) {
          case 0:
            this.$toast("此手机号码还没有录入");
            break;
          case 1:
            this.$router.push({ path: "/home" });
            break;
          case 2:
            this.$router.push({ path: "/home" });
            break;
          case 3:
            this.$router.push({ path: "/home" });
            break;
          case 4:
            //进入注册页面
            this.$router.push({
              path: "/schoolCreate"
            });
            break;
          case 5:
            //老师进入绑定幼儿园页面
            this.$router.push({
              path: "/schoolJoin"
            });
            break;
          case 6:
            //学生进入完善信息页面
            this.$router.push({
              path: "/baby/supply"
            });
            break;
          default:
            console.log("default");
        }
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    let { openId, photo } = this.$route.query;
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      if (openId || photo) {
        Cookies.set("openId", openId);
        Cookies.set("photo", photo);
        this.$store.commit("user/SET_OPENID", openId);
        this.$store.commit("user/SET_PHOTO", photo);
      }
    }
  }
};
</script>
<style lang="less">
.cover {
  height: 100vh;
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;
  background-color: #cbf4fa;
  img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
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
</style>
