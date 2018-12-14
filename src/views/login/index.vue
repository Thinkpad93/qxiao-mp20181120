<template>
  <div class="container">
    <div class="section">
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
              <input type="input" class="input" pattern="[0-9]*" placeholder="请输入手机号" autofocus v-model="form.tel">
            </div>
            <div class="cell-ft">
              <a href="javascript:;">获取验证码</a>
            </div>
          </div>
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <img class="ignore" src="@/assets/image/password-icon@2x.png" alt="">
            </div>
            <div class="cell-bd">
              <input type="password" class="input" placeholder="请输入密码" maxlength="50" v-model="form.verifyCode">
            </div>
          </div>          
        </div>
        <div class="btn-area">
          <a href="javascript:;" class="btn btn-primary" @click="handleLogin">登陆</a>
        </div>
      </div>
      <div class="bottom">
        <div class="">
          <span>我是老师</span>
        </div>
        <div class="">
          <span>我是园长</span>
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
      form: {
        tel: "",
        verifyCode: ""
      }
    };
  },
  methods: {
    handleLogin() {},
    //用户登录
    async userTeleLogin(params = {}) {
      let res = await service.userTeleLogin(params);
    }
  }
};
</script>
<style lang="less" scoped>
.container {
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
.section {
  width: 80%;
  margin: 152px auto 0 auto;
}
.form {
  background-color: #fff;
  z-index: 10;
  min-height: 600px;
  border-radius: 8px;
}
.top {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 50px;
}
.bottom {
  display: flex;
  justify-content: space-between;
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
