<template>
  <nav class="nav">
    <div class="nav-item" v-for="(menu, index) in menuList" :key="index" @click="handleMenuClick(menu.url)">
      <template></template>
        <img :src="menu.icon" :alt="roleType" :data-schoolId="schoolId">
        <div class="text-ellipsis">{{ menu.name }}</div>
    </div>
  </nav>  
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "qmenu",
  data() {
    return {
      //做一个好人
      menuList: [
        {
          name: "通知公告",
          url: "/notice",
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
          url: "/clock",
          icon: "./static/image/men-icon-3@2x.png"
        },
        {
          name: "新鲜速报",
          url: "/fresh",
          icon: "./static/image/men-icon-8@2x.png"
        },
        {
          name: "班级相册",
          url: "",
          icon: "./static/image/men-icon-2@2x.png"
        },
        {
          name: "班级管理",
          url: "/class",
          icon: "./static/image/men-icon-1@2x.png"
        },
        {
          name: "老师管理",
          url: "/teacher",
          icon: "./static/image/men-icon-4@2x.png"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["roleType", "schoolId"])
  },
  methods: {
    handleMenuClick(url) {
      this.$emit("change", url);
    }
  }
};
</script>
<style lang="less" scoped>
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
</style>
