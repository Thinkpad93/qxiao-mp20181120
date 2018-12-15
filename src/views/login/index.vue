<template>
  <div class="page">
    <div class="page-bd">
      <div class="form" data-type="">
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
              <input type="input" class="input text-left" pattern="[0-9]*" placeholder="请输入手机号" autofocus v-model="form.tel">
            </div>
            <div class="cell-ft">
              <a v-if="!hidden" href="javascript:;" @click="handleSecond">获取验证码</a>
              <span v-if="hidden">{{ second }}s</span>
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
      </div>
    </div>          
  </div>           
</template>
<script>
import service from "@/api";
export default {
  name: "login",
  data() {
    return {
      hidden: false,
      timer: null,
      second: 60,
      form: {
        tel: "13189680083",
        verifyCode: "926663"
      }
    };
  },
  methods: {
    handleSecond() {
      this.hidden = true;
      this.timer = setInterval(() => {
        if (this.second === 1) {
          this.second = 60;
          this.hidden = false;
          clearInterval(this.timer);
        }
        this.second--;
      }, 1000);
    },
    handleLogin() {
      this.$toast("加载中...");
      //this.userTeleLogin(this.form);
    },
    //用户登录
    async userTeleLogin(params = {}) {
      let res = await service.userTeleLogin(params);
      if (res.errorCode === 0) {
        let { roleType } = res.data;
        switch (roleType) {
          case 1:
            this.$router.replace({ path: "/home" });
            break;
          case 4:
            this.$router.replace({ path: "/createSchool" });
            break;
        }
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
  width: 80%;
  margin: 152px auto 0 auto;
}
.form {
  background-color: #fff;
  z-index: 10;
  min-height: 600px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.12), 0 0 12px 0 rgba(0, 0, 0, 0.04);
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
