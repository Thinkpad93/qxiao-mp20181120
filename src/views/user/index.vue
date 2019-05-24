<template>
  <div class="page">
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker></van-picker>
      </van-popup>
      <div class="flex a-i-c user-info gradient-two">
        <router-link to="/child" tag="div" class="flex a-i-c">
          <img :src="openPhoto" width="60" height="60" radius="50">
          <div class="js-user-change">
            <h3 size-18 class="mb-20 username">{{ openStudentName }}</h3>
            <div class="info-meta">
              <div class>Q星: {{ totalStarCount }}</div>
            </div>
          </div>
        </router-link>
        <!-- <div class="snail flex a-i-c j-c-s-b">
          <div class="snail-left flex a-i-c">
            <img src="@/assets/snail-icon@2x.png" alt width="20" height="20">
            <div class="ml-10">竞争力(广州)</div>
          </div>
          <div class="snail-right flex a-i-c">
            <span class="mr-10">60</span>
            <img src="@/assets/arrow-up@2x.png" alt width="8" height="18">
          </div>
        </div>-->
        <!-- <div class="avatar">
          <template v-if="openPhoto">
            <img :src="openPhoto" width="60" height="60" radius="50">
            <div class="info-box">
              <h3 size-17 class="mt-20 username">{{ openStudentName }}</h3>
              <div class="info-meta mt-20">
                <div class>Q星: {{ totalStarCount }}</div>
                <div class="mr-10">积分: 800</div>
              </div>
            </div>
          </template>
          <template v-else>
            <img
              src="@/assets/child-default@2x.png"
              width="80"
              height="80"
              radius="50"
              class="mt-20"
            >
          </template>
        </div>-->
      </div>
      <div class="snail flex a-i-c j-c-s-b">
        <div class="snail-left flex a-i-c">
          <img src="@/assets/snail-icon@2x.png" alt width="20" height="20">
          <div class="ml-10">竞争力(广州)</div>
        </div>
        <div class="snail-right flex a-i-c">
          <span class="mr-10">80</span>
          <img src="@/assets/arrow-up@2x.png" alt width="8" height="18">
        </div>
      </div>
      <van-cell
        class="a-i-c"
        size="large"
        :title="cell.title"
        is-link
        :to="cell.to"
        v-for="(cell, index) in userMenu"
        :key="index"
      >
        <template slot="icon">
          <img :src="cell.icon" class="user-icon">
        </template>
      </van-cell>
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
      userMenu: [
        // {
        //   title: "我的小孩",
        //   to: "/child",
        //   icon: require("../../assets/user-icon-2@2x.png")
        // },
        {
          title: "我的作品",
          to: "/works",
          icon: require("../../assets/user-icon-5@2x.png")
        },
        {
          title: "我的手环",
          to: "/bracelet",
          icon: require("../../assets/user-icon-2@2x.png")
        },
        {
          title: "我的个性计划",
          to: "/personality-plan",
          icon: require("../../assets/user-icon-3@2x.png")
        },
        {
          title: "我的学习计划",
          to: "/study-plan",
          icon: require("../../assets/user-icon-4@2x.png")
        },
        // {
        //   title: "我的收藏",
        //   to: "/collection"
        // },
        // {
        //   title: "我的下载",
        //   to: "/myDownload"
        // },
        // {
        //   title: "我的课表",
        //   to: "/mySchedule"
        // },
        {
          title: "帮助中心",
          to: "/help-center",
          icon: require("../../assets/user-icon-2@2x.png")
        }
      ]
    };
  },
  computed: {
    ...mapState("user", {
      openStudentName: state => state.info.openStudentName,
      openPhoto: state => state.info.openPhoto,
      totalStarCount: state => state.info.totalStarCount
    })
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.user-info {
  padding: 0 30px;
  color: #fff;
  position: relative;
  height: 180px;
  // margin-bottom: 100px;
  .js-user-change {
    margin-left: 30px;
  }
}
.snail {
  height: 80px;
  width: calc(100% - 60px);
  margin: 30px auto;
  padding: 0 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 20px 0 rgba(204, 204, 204, 0.3);
  // position: absolute;
  // left: 50%;
  // bottom: -75px;
  // height: 150px;
  // width: calc(100% - 60px);
  // padding: 0 20px;
  // border-radius: 20px;
  // color: #2e2e2e;
  // background-color: #fff;
  // box-shadow: 0px 0px 12px 4px rgba(204, 204, 204, 0.5);
  // transform: translateX(-50%);
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
  // padding-top: 30px;
  // padding-bottom: 25px;
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
}

.user-icon {
  width: 60px;
  height: 60px;
  margin-right: 20px;
}
</style>

