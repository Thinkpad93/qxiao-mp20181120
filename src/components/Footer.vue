<template>
  <div class="footer">
    <div class="item">
      <router-link :to="{path: '/single', query: routeParams}">
        <div>小Q表现</div>
      </router-link>
    </div>
    <div class="item">
      <router-link :to="{path: '/wisdom', query: routeParams}">
        <div>小Q智慧</div>
      </router-link>
    </div>
    <div class="item">
      <router-link :to="{path: '/home', query:routeParams}">
        <div>小Q班级</div>
      </router-link>
    </div>
    <div class="item">
      <router-link :to="{path:'/user', query:routeParams}">
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
  },
  computed: {
    routeParams() {
      return this.$route.query;
    }
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
