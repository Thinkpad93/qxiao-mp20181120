<template>
  <footer class="footer">
    <div class="item">
      <router-link to="/home">
        <i class="iconfont icon-shouyefill"></i>
        <div>首页</div>
      </router-link>
    </div>
    <div class="item">
      <template>
        <router-link :to="{path: '/my', query: {role: role}}">
          <i class="iconfont icon-yonghufill"></i>
          <div>我的</div>
        </router-link>
      </template>
    </div>
  </footer>   
</template>
<script>
export default {
  name: "footers",
  data() {
    return {
      roleType: this.$store.getters.roleType
    };
  },
  computed: {
    role() {
      let str = "";
      if (this.roleType === 1) {
        str = "admin";
      } else if (this.roleType === 2) {
        str = "teacher";
      } else {
        str = "patroarch";
      }
      return str;
    }
  }
};
</script>
<style lang="less">
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  background-color: #fff;
  .item {
    height: 100px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #8d8d8d;
      display: block;
      text-align: center;
    }
    .router-link-active {
      color: #9acb4d;
    }
    i {
      font-size: 34px;
    }
  }
}
</style>
