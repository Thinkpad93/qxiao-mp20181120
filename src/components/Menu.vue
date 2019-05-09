<template>
  <nav class="nav">
    <div
      class="langur"
      v-for="(menu, index) in computedMenu"
      :key="index"
      @click="chanage(menu.url)"
    >
      <img :src="menu.icon" width="57" height="57">
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
      //roleType: this.$store.state.user.info.roleType,
      //type: this.$store.state.user.info.type,
      //学校类型
      recipeList: [
        {
          name: "营养食谱",
          url: "/recipe",
          icon: "./static/image/men-icon-9@2x.png"
        }
      ],
      shuttleList: [
        {
          name: "实时接送",
          url: "/shuttle",
          icon: "./static/image/men-icon-6@2x.png"
        }
      ],
      clockList: [
        {
          name: "考勤记录",
          url: "/clock",
          icon: "./static/image/men-icon-3@2x.png"
        }
      ],
      //学校
      schoolList: [
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
        }
      ],
      //作业
      homeworkList: [],
      //共用的菜单
      menuList: [
        {
          name: "通知公告",
          url: "/notice",
          icon: "./static/image/men-icon-7@2x.png"
        },
        {
          name: "亲子作业",
          url: "/homeWork",
          icon: "./static/image/men-icon-5@2x.png"
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
    ...mapState("user", {
      type: state => state.info.type,
      roleType: state => state.info.roleType
    }),
    computedMenu() {
      //幼儿园 0   小学 1
      if (this.type == 0) {
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
              .concat(this.shuttleList);
            break;
          case 3:
            return this.menuList.concat(this.recipeList).concat(this.clockList);
            break;
          default:
            return this.menuList
              .concat(this.recipeList)
              .concat(this.clockList)
              .concat(this.schoolList);
            break;
        }
      } else if (this.type == 1) {
        switch (parseInt(this.roleType)) {
          case 1:
            return this.menuList.concat(this.schoolList);
            break;
          case 2:
            return this.menuList.concat(this.teacherList);
            break;
          case 3:
            return this.menuList;
            break;
          default:
            return this.menuList.concat(this.schoolList);
            break;
        }
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
    height: 168px;
    text-align: center;
  }
}
</style>
