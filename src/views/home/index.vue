<template>
  <div class="page">
    <nav class="nav">
      <div class="nav-item" v-for="(menu, index) in menuList" :key="index" @click="go">
        <img :src="menu.icon" alt="">
        <div class="text-ellipsis">{{ menu.name }}</div>
      </div>
    </nav>
    <footer class="footer">
      <div class="">
        <a href="javascript:;">首页</a>
      </div>
      <div class="">
        <a href="javascript:;">我的</a>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      menuList: [
        {
          name: "通知公告做一个好人",
          url: "",
          icon: "./static/image/men-icon-7@2x.png"
        },
        {
          name: "营养食谱",
          url: "",
          icon: "./static/image/men-icon-9@2x.png"
        },
        {
          name: "亲子作业",
          url: "",
          icon: "./static/image/men-icon-5@2x.png"
        },
        {
          name: "考勤记录",
          url: "",
          icon: "./static/image/men-icon-3@2x.png"
        },
        {
          name: "新鲜速报",
          url: "",
          icon: "./static/image/men-icon-8@2x.png"
        },
        {
          name: "班级相册",
          url: "",
          icon: "./static/image/men-icon-2@2x.png"
        },
        {
          name: "班级管理",
          url: "",
          icon: "./static/image/men-icon-1@2x.png"
        },
        {
          name: "老师管理",
          url: "",
          icon: "./static/image/men-icon-4@2x.png"
        }
      ]
    };
  },
  methods: {
    go() {
      this.$router.push({ path: "/fresh" });
      console.log(this.$router.push);
    }
  }
};
</script>
<style lang="less">
.nav {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  &-item {
    width: 25%;
    min-width: 0; /*解决方案*/
    height: 168px;
    text-align: center;
    &:active {
      background-color: #f2f2f2;
    }
    img {
      width: 114px;
      height: 114px;
    }
  }
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  display: flex;
  background-color: #fff;
  > div {
    height: 100px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
