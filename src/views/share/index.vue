<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="qcode">
        <div class="qcode-box">
          <img src="@/assets/qcode.png" alt>
          <p>亲爱的用户您好，请按以下方法加入小Q智慧:</p>
          <ul>
            <li>1、长按识别二维码，关注小Q智慧公众号。</li>
            <li>2、进入公众号后，点击公众号页面的提示链接，按提示输入手机号码和验证码即可登录。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "share",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.qcode {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #cbf4fa;
  &-box {
    padding: 0 30px;
    text-align: center;
    img {
      width: 350px;
      height: 350px;
    }
    p {
      margin: 80px 0 40px 0;
      color: #9acb4d;
      font-weight: bold;
    }
    ul {
      line-height: 1.6;
      text-align: left;
    }
  }
}
</style>
