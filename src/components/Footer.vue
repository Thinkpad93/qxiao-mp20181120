<template>
  <div class="footer">
    <div class="item">
      <router-link :to="{path: '/home', query: { openId: '12456', studentId: 1 }}">
        <!-- <van-icon name="card" size="22px"></van-icon> -->
        <!-- <img src="@/assets/footer-icon-expression@2x.png" alt width="27" height="27"> -->
        <div>小Q表现</div>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/wisdom">
        <!-- <img src="@/assets/footer-icon-expression@2x.png" alt width="27" height="27"> -->
        <!-- <van-icon name="invition" size="22px"></van-icon> -->
        <div>小Q智慧</div>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/community">
        <!-- <img src="@/assets/footer-icon-expression@2x.png" alt width="27" height="27"> -->
        <!-- <van-icon name="coupon" size="22px"></van-icon> -->
        <div>小Q班级</div>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/user">
        <!-- <img src="@/assets/footer-icon-expression@2x.png" alt width="27" height="27"> -->
        <!-- <van-icon name="manager" size="22px"></van-icon> -->
        <div>个人中心</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "qxFooter",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.footer {
  font-size: 28px;
  display: flex;
  border-top: 1px solid #f6f8f9;
  background-color: #fff;
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    a {
      color: #d5dde0;
      display: block;
      text-align: center;
      &.router-link-active {
        color: #04b6ff;
      }
    }
  }
}
</style>
