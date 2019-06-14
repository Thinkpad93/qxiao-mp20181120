<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="visibility">
        <div class="overlay" @click="visibility = false"></div>
        <div class="share-tip">
          <img src="@/assets/share-tip.png">
          <p size-18>请点击右上角按钮邀请好友吧</p>
        </div>
      </template>
      <!-- 用户 -->
      <router-link to="/child" tag="div" class="home-user gradient-two">
        <div class="flex a-i-c">
          <template v-if="openStudentName">
            <img :src="openPhoto" width="60" height="60" radius="50" v-if="openPhoto">
            <img src="@/assets/child-default@2x.png" width="60" height="60" radius="50" v-else>
            <div class="js-user-change">
              <h3 class="mb-20" size-18>
                {{ openStudentName }}
                <small>Q星: {{ totalStarCount }}</small>
              </h3>
              <p size-12>您的坚持和鼓励是开启孩子好习惯的钥匙</p>
            </div>
          </template>
          <template v-else>
            <img src="@/assets/child-default@2x.png" width="60" height="60" radius="50">
            <p class="ml-20">尚未有关注孩子，点击添加。</p>
          </template>
        </div>
        <van-icon name="arrow" size="16px"></van-icon>
      </router-link>
      <!-- 用户 -->
      <div class="snail flex a-i-c j-c-s-b">
        <div class="snail-left flex a-i-c">
          <img src="@/assets/snail-icon@2x.png" alt width="20" height="20">
          <div class="ml-10">综合竞争力排名</div>
        </div>
        <div class="snail-right flex a-i-c">
          <span class="mr-10">80</span>
          <img src="@/assets/arrow-up@2x.png" alt width="8" height="18">
        </div>
      </div>
      <van-cell class="mb-20" size="large" title="邀请亲人关注" is-link @click="visibility = true">
        <template slot="icon">
          <img src="@/assets/user-icon-6@2x.png" class="user-icon">
        </template>
      </van-cell>
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
import service from "@/api";
import qxFooter from "@/components/Footer";
import { mapState } from "vuex";
import wxapi from "@/config/wxapi";
import { API_ROOT } from "@/config/isdev";
export default {
  name: "user",
  components: {
    qxFooter
  },
  data() {
    return {
      visibility: false,
      query: {
        studentId: this.$store.state.user.info.openStudentId,
        openId: this.$store.state.user.info.openId
      },
      userMenu: [
        {
          title: "我的作品",
          to: "/works",
          icon: require("../../assets/user-icon-5@2x.png")
        },
        {
          title: "我的手环",
          to: "/bracelet",
          icon: require("../../assets/user-icon-7@2x.png")
        },
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
      totalStarCount: state => state.info.totalStarCount,
      patriarchId: state => state.info.patriarchId
    })
  },
  methods: {
    wxRegCallback() {
      //用于微信JS-SDK回调
      this.wxShareAppMessage();
    },
    wxShareAppMessage() {
      let option = {
        title: "亲爱的用户您好", // 分享标题
        desc: "快来一起关注孩子吧~", // 分享描述
        link: API_ROOT + "#/baby/share?classId=0&id=" + this.patriarchId, // 分享链接，根据自身项目决定是否需要split
        success: () => {
          that.$toast("分享成功");
        },
        error: () => {
          that.$toast("已取消分享");
        }
      };
      wxapi.wxShareAppMessage(option);
    }
  },
  mounted() {
    wxapi.wxRegister(this.wxRegCallback);
  }
};
</script>
<style lang="less" scoped>
.home-user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 180px;
  padding: 0 30px;
  color: #fff;
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
.user-icon {
  width: 60px;
  height: 60px;
  margin-right: 20px;
}
</style>

