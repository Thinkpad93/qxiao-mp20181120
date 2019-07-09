<template>
  <nav class="nav">
    <div
      class="langur"
      v-for="(menu, index) in computedMenu"
      :key="index"
      @click="chanage(menu.url)"
    >
      <img :src="menu.icon" width="57" height="57" />
      <div class="text-ellipsis">{{ menu.name }}</div>
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "qmenu",
  data() {
    return {
      //学校类型
      recipeList: [
        {
          name: "营养食谱",
          url: "/recipe",
          icon: require("../assets/men-icon-9@2x.png")
        }
      ],
      shuttleList: [
        {
          name: "实时接送",
          url: "/shuttle",
          icon: require("../assets/men-icon-6@2x.png")
        }
      ],
      clockList: [
        {
          name: "考勤记录",
          url: "/clock",
          icon: require("../assets/men-icon-3@2x.png")
        }
      ],
      //学校
      schoolList: [
        {
          name: "班级管理",
          url: "/class",
          icon: require("../assets/men-icon-1@2x.png")
        },
        {
          name: "老师管理",
          url: "/teacher",
          icon: require("../assets/men-icon-4@2x.png")
        }
      ],
      //老师
      teacherList: [
        {
          name: "学生管理",
          url: "/student",
          icon: require("../assets/men-icon-10@2x.png")
        }
      ],
      feedList: [
        {
          name: "反馈",
          url: "/feed",
          icon: require("../assets/men-icon-11@2x.png")
        }
      ],
      //共用的菜单
      menuList: [
        {
          name: "通知",
          url: "/notice",
          icon: require("../assets/men-icon-7@2x.png")
        },
        {
          name: "作业",
          url: "/home-work",
          icon: require("../assets/men-icon-5@2x.png")
        },
        {
          name: "班级速报",
          url: "/fresh",
          icon: require("../assets/men-icon-8@2x.png")
        },
        {
          name: "班级相册",
          url: "/album",
          icon: require("../assets/men-icon-2@2x.png")
        }
      ]
    };
  },
  computed: {
    ...mapState("user", {
      type: state => state.info.type,
      roleType: state => state.info.roleType
    }),
    computedMenu() {
      switch (parseInt(this.roleType)) {
        case 1:
          return this.menuList
            .concat(this.recipeList)
            .concat(this.clockList)
            .concat(this.schoolList);
          break;
        case 2:
          return this.menuList
            .concat(this.recipeList)
            .concat(this.clockList)
            .concat(this.teacherList)
            .concat(this.shuttleList)
            .concat(this.feedList);
          break;
        case 3:
          return this.menuList
            .concat(this.recipeList)
            .concat(this.clockList)
            .concat(this.feedList);
          break;
        default:
          return this.menuList
            .concat(this.recipeList)
            .concat(this.clockList)
            .concat(this.schoolList);
          break;
      }
    }
  },
  methods: {
    chanage(url) {
      this.$emit("on-change", url);
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  .langur {
    width: 25%;
    min-width: 0; /*解决方案*/
    height: 180px;
    padding-top: 10px;
    text-align: center;
  }
}
</style>
