<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="user-info flex a-i-c">
        <router-link to="/child" tag="div" class="switch-children">
          <van-icon name="replay" size="16px"></van-icon>切换孩子
        </router-link>
        <div class="avatar">
          <img :src="photo" width="50" height="50" radius="50">
        </div>
        <div class="info-box ml-30" v-if="openStudentName">
          <h3 size-17 class="username">{{ openStudentName }}</h3>
          <div class="info-meta flex pt-30">
            <div class="mr-10">Q星: 500</div>
            <div class="mr-10">积分: 800</div>
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
      <van-cell title="我的个性计划" is-link></van-cell>
      <van-cell title="我的学习计划" is-link></van-cell>
      <van-cell title="我的作品" is-link></van-cell>
      <van-cell title="我的收藏" is-link></van-cell>
      <van-cell title="我的下载" is-link></van-cell>
      <van-cell title="我的课表" is-link></van-cell>
      <van-cell title="帮助中心" is-link></van-cell>
    </div>
    <div class="flex-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>
<script>
import qxFooter from "@/components/Footer";
export default {
  name: "user",
  components: {
    qxFooter
  },
  data() {
    return {
      photo: this.$store.state.user.info.photo,
      openStudentName: this.$store.state.user.info.openStudentName
    };
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

