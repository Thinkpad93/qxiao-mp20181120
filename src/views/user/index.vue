<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class></div>
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
    return {};
  }
};
</script>
<style lang="less" scoped>
.snail {
  font-size: 30px;
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

