<template>
  <div class="page">
    <div class="page-bd">
      <form action="" ref="form" class="form">
        <div class="cells">
          <div class="top">
            <img src="@/assets/image/qlogocdr12.png" alt="">
            <p size-18>小Q智慧</p>
          </div>
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <img class="ignore" src="@/assets/image/phone-icon@2x.png" alt="">
            </div>
            <div class="cell-bd">
              <input type="number" class="input text-left" pattern="[0-9]*" placeholder="请输入手机号" autofocus v-model="form.tel">
            </div>
            <div class="cell-ft">
              <a v-if="!hidden" href="javasrcript:;" style="color:#92cd36" @click="handleSecond">获取验证码</a>
              <span v-if="hidden" style="color:#8d8d8d;">{{ second }}s</span>
            </div>
          </div>
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <img class="ignore" src="@/assets/image/password-icon@2x.png" alt="">
            </div>
            <div class="cell-bd">
              <input type="password" class="input text-left" placeholder="请输入验证码" maxlength="6" v-model="form.verifyCode">
            </div>
          </div>          
        </div>
        <div class="btn-area">
          <a href="javascript:;" class="btn btn-primary" @click="handleLogin">登陆</a>
        </div>
      </form>
    </div>          
  </div>           
</template>
<script>
import service from "@/api";
import { isPhone } from "@/utils/validator";
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
  computed: {},
  methods: {
    handleSecond() {
      if (isPhone(this.form.tel)) {
        this.hidden = true;
        this.timer = setInterval(() => {
          if (this.second === 1) {
            this.second = 60;
            this.hidden = false;
            clearInterval(this.timer);
          }
          this.second--;
        }, 1000);
        this.telVeriftCode(this.form.tel);
      } else {
        this.$weui.topTips("请正确填写手机号");
      }
    },
    handleLogin() {
      if (this.form.tel === "") {
        this.$weui.topTips("请填写手机号");
        return false;
      }
      if (this.form.verifyCode === "") {
        this.$weui.topTips("请填写手机验证码");
        return false;
      }
      if (isPhone(this.form.tel)) {
        this.userTeleLogin(this.form);
      } else {
        this.$weui.topTips("请正确填写手机号");
      }
    },
    //获取验证码
    async telVeriftCode(tel) {
      let res = await service.telVeriftCode({ tel });
      if (res.errorCode === 0) {
        this.$weui.topTips(`验证码已经发送，请注意查收`);
      }
    },
    //用户登录
    async userTeleLogin(params = {}) {
      let res = await this.$store.dispatch("account/userTeleLogin", params);
      if (res.errorCode === 0) {
        let { roleType } = res.data;
        if (roleType !== 0) {
          this.form.tel = "";
          this.form.verifyCode = "";
        }
        switch (roleType) {
          case 0:
            this.$weui.alert("此手机号码还没有录入", () => {}, {
              title: "提示"
            });
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
            //园长进入注册幼儿园页面
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
        }
      } else if (res.errorCode === -1) {
        this.$weui.alert(`${res.errorMsg}`, () => {}, {
          title: "提示"
        });
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.page {
  background-image: url("../../../static/image/login-bg@2x.png");
  background-repeat: no-repeat;
  background-size: 100%;
  z-index: 10;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.page-bd {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 86;
  width: 90%;
  transform: translate(-50%, -50%);
}
.form {
  background-color: #fff;
  z-index: 10;
  min-height: 600px;
  border-radius: 10px;
  overflow: hidden;
}
.top {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 50px;
}
.bottom {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.cells {
  font-size: 32px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.cell {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 30px;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 44px;
    right: 44px;
    z-index: 2;
  }
}
.cell-bd {
  flex: 1;
}
.cell-bd {
  padding-left: 20px;
}
</style>
