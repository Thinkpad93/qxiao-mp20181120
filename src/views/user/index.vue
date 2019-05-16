<template>
  <div class="page">
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker></van-picker>
      </van-popup>
      <div class="user-info gradient-one">
        <div class="snail flex a-i-c j-c-s-b">
          <div class="snail-left flex a-i-c">
            <img src="@/assets/snail-icon@2x.png" alt width="20" height="20">
            <div class="ml-10">竞争力(广州)</div>
          </div>
          <div class="snail-right flex a-i-c">
            <span class="mr-10">60</span>
            <img src="@/assets/arrow-up@2x.png" alt width="8" height="18">
          </div>
        </div>
        <router-link to="/child" tag="div" class="avatar">
          <img :src="photo" width="60" height="60" radius="50">
        </router-link>
        <div class="info-box">
          <div class>
            <h3 size-17 class="username" v-if="openStudentName">{{ openStudentName }}</h3>
          </div>
          <div class="info-meta pt-20">
            <div class>Q星: {{ totalStarCount }}</div>
            <!-- <div class="mr-10">积分: 800</div> -->
          </div>
        </div>
      </div>
      <van-cell
        size="large"
        :title="cell.title"
        is-link
        :to="cell.to"
        v-for="(cell, index) in userMenu"
        :key="index"
      ></van-cell>
    </div>
    <div class="page-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import qxFooter from "@/components/Footer";
import { mapState } from "vuex";
export default {
  name: "user",
  components: {
    qxFooter
  },
  data() {
    return {
      popupShow: false,
      query: {
        studentId: this.$store.state.user.info.openStudentId,
        openId: this.$store.state.user.info.openId
      },
      roleList: [],
      studentList: [],
      userMenu: [
        {
          title: "我的个性计划",
          to: "/myPersonality"
        },
        {
          title: "我的学习计划",
          to: "/myStudy"
        },
        {
          title: "我的作品",
          to: "/works"
        },
        {
          title: "我的手环",
          to: "/myBraclet"
        },
        {
          title: "我的收藏",
          to: "/collection"
        },
        {
          title: "我的下载",
          to: "/myDownload"
        },
        {
          title: "我的课表",
          to: "/mySchedule"
        },
        {
          title: "帮助中心",
          to: "/helpCenter"
        }
      ]
    };
  },
  computed: {
    ...mapState("user", {
      openStudentName: state => state.info.openStudentName,
      photo: state => state.info.photo,
      totalStarCount: state => state.info.totalStarCount
    })
  },
  methods: {
    //角色切换
    // tagClick() {
    //   //只有一种角色
    //   if (this.roleList.length === 1 && this.roleList[0].roleType == 3) {
    //     return;
    //   }
    //   let _cookie = Cookies.getJSON("info");
    //   //选择要切换的角色
    //   let single = this.roleList.find(item => item.roleType != this.roleType);
    //   let { id, roleType, classId, className, studentId } = single;
    //   let obj = null;
    //   if (this.roleType != 9) {
    //     obj = Object.assign({}, _cookie, {
    //       id,
    //       roleType,
    //       classId,
    //       className,
    //       studentId
    //     });
    //   } else {
    //     obj = Object.assign({}, _cookie, { id, roleType });
    //   }
    //   this.$store.dispatch("user/setInfo", obj).then(data => {
    //     if (data.success === "ok") {
    //       //toast.clear();
    //     }
    //   });
    // },
  }
};
</script>
<style lang="less" scoped>
.user-info {
  color: #fff;
  position: relative;
  height: 390px;
  margin-bottom: 100px;
  text-align: center;
}
.snail {
  position: absolute;
  left: 50%;
  bottom: -75px;
  height: 150px;
  width: calc(100% - 60px);
  padding: 0 20px;
  border-radius: 20px;
  color: #2e2e2e;
  background-color: #fff;
  box-shadow: 0px 0px 12px 4px rgba(204, 204, 204, 0.5);
  transform: translateX(-50%);
}
.switch-children {
  color: #fff;
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  height: 60px;
  padding: 0 30px;
  align-items: center;
  border-radius: 30px 0 0 30px;
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-50%);
}

.avatar {
  padding-top: 30px;
  padding-bottom: 25px;
}
</style>

