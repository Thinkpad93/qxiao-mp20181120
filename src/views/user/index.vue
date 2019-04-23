<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="user-info">
        <div class="avatar">
          <img :src="photo" width="50" height="50" radius="50">
        </div>
        <div class="info-box">
          <h3 class="username" size-17>{{ openStudentName }}</h3>
          <div class="info-meta flex">
            <div class="mr-10">Q星: 500</div>
            <div class="mr-10">积分: 800</div>
          </div>
        </div>
      </div>
      <div class="snail">
        <div class="snail-left">
          <img src="@/assets/snail-icon@2x.png" alt width="20" height="20">
          <div class="ml-10">竞争力(广州)</div>
        </div>
        <div class="snail-right">
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
  display: flex;
  align-items: center;
  height: 220px;
  padding-left: 30px;
  background-image: url("~@/assets/user-center-bg@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.info-box {
  margin-left: 30px;
}
.info-meta {
  padding-top: 30px;
}

.snail {
  height: 80px;
  width: calc(100% - 60px);
  display: flex;
  margin: 30px auto;
  align-items: center;
  padding: 0 20px;
  border-radius: 8px;
  justify-content: space-between;
  background-color: #fff;
  &-left {
    display: flex;
    align-items: center;
  }
  &-right {
    display: flex;
    align-items: center;
  }
}
</style>

