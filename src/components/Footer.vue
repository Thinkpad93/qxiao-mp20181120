<template>
  <div class="footer">
    <div class="item">
      <router-link to="/single">
        <div>小Q表现</div>
      </router-link>
    </div>
    <!-- <div class="item">
      <router-link to="/wisdom">
        <div>小Q智慧</div>
      </router-link>
    </div>-->
    <div class="item">
      <router-link to="/home">
        <div>小Q班级</div>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/user">
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
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  font-size: 28px;
  display: flex;
  background-color: #fff;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    z-index: 2;
  }
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    a {
      display: block;
      text-align: center;
      &.router-link-active {
        color: #92cd36;
      }
    }
  }
}
</style>
