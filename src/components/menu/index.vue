<template>
  <nav class="nav">
    <div
      class="nav-item"
      v-for="(menu, index) in computedMenu"
      :key="index"
      @click="handleMenuClick(menu.url)"
    >
      <img :src="menu.icon" :alt="roleType">
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
      //园长
      patroarList: [
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
      ],
      //老师
      teacherList: [
        {
          name: "学生管理",
          url: "/student",
          icon: "./static/image/men-icon-10@2x.png"
        },
        {
          name: "实时接送",
          url: "/shuttle",
          icon: "./static/image/men-icon-6@2x.png"
        }
      ],
      //共用的菜单
      menuList: [
        {
          name: "通知公告",
          url: "/notice",
          icon: "./static/image/men-icon-7@2x.png"
        },
        {
          name: "营养食谱",
          url: "/recipe",
          icon: "./static/image/men-icon-9@2x.png"
        },
        {
          name: "亲子作业",
          url: "/homework",
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
          url: "/album",
          icon: "./static/image/men-icon-2@2x.png"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["roleType"]),
    computedMenu() {
      if (this.roleType === 1) {
        return this.menuList.concat(this.patroarList);
      } else if (this.roleType === 2) {
        return this.menuList.concat(this.teacherList);
      } else if (this.roleType === 3) {
        return this.menuList;
      }
    }
  },
  methods: {
    handleMenuClick(url) {
      this.$emit("change", url);
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
    font-size: 28px;
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
