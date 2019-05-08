<template>
  <div class="page">
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker></van-picker>
      </van-popup>
      <div class="user-info flex a-i-c">
        <router-link to="/child" tag="div" class="switch-children" v-if="roleType != 2">切换孩子</router-link>
        <router-link to="/personData" tag="div" class="avatar">
          <img :src="photo" width="50" height="50" radius="50">
        </router-link>
        <div class="info-box ml-30">
          <div class="flex a-i-c">
            <h3 size-17 class="username pr-20">{{ openStudentName }}</h3>
            <van-tag
              type="danger"
              v-if="roleType == 2 || roleType == 3 || roleType == 9"
              @click="tagClick"
            >{{ showRoleTypeText }}</van-tag>
          </div>
          <div class="info-meta flex pt-20">
            <div class="mr-10">Q星: 500</div>
            <!-- <div class="mr-10">积分: 800</div> -->
          </div>
        </div>
      </div>
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

      <router-link to="/myPersonality">
        <van-cell title="我的个性计划" is-link></van-cell>
      </router-link>
      <router-link to="/myStudy">
        <van-cell title="我的学习计划" is-link></van-cell>
      </router-link>
      <router-link to="/works">
        <van-cell title="我的作品" is-link></van-cell>
      </router-link>
      <router-link to="/myBraclet">
        <van-cell title="我的手环" is-link></van-cell>
      </router-link>
      <router-link to="/collection">
        <van-cell title="我的收藏" is-link></van-cell>
      </router-link>
      <router-link to="/myDownload">
        <van-cell title="我的下载" is-link></van-cell>
      </router-link>
      <router-link to="/mySchedule">
        <van-cell title="我的课表" is-link></van-cell>
      </router-link>
      <router-link to="/helpCenter">
        <van-cell title="帮助中心" is-link></van-cell>
      </router-link>
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
      roleList: []
    };
  },
  computed: {
    ...mapState("user", {
      openStudentName: state => state.info.openStudentName,
      photo: state => state.info.photo,
      openId: state => state.info.openId,
      roleType: state => state.info.roleType
    }),
    showRoleTypeText() {
      let text = "";
      if (this.roleType == 2) {
        text = "老师";
      } else if (this.roleType == 3 || this.roleType == 9) {
        text = "家长";
      }
      return text;
    }
  },
  methods: {
    tagClick() {
      const toast = this.$toast.loading({
        mask: true,
        message: "切换中...",
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续展示 toast
      });
      let _cookie = Cookies.getJSON("info");
      //获取当前角色
      let roleType = this.roleType;
      //选择要切换的角色
      let single = this.roleList.find(item => item.roleType != roleType);
      let { totalStarCount, ...args } = single;
      let obj = Object.assign({}, _cookie, args);
      this.$store.dispatch("user/setInfo", obj).then(data => {
        if (data.success === "ok") {
          toast.clear();
        }
      });
    },
    async queryRole(params = {}) {
      let res = await service.queryRole(params);
      if (res.errorCode === 0) {
        this.roleList = res.data;
      }
    }
  },
  mounted() {
    if (this.roleType == 2 || this.roleType == 3 || this.roleType == 9) {
      this.queryRole({ openId: this.openId });
    }
  }
};
</script>
<style lang="less" scoped>
.user-info {
  color: #fff;
  position: relative;
  height: 220px;
  padding-left: 30px;
  background-image: url("~@/assets/user-center-bg@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
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
</style>

