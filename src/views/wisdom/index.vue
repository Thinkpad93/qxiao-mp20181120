<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- layout one -->
      <div class="wisdom-user flex a-i-c j-c-c">
        <div class="wisdom-box">
          <div class="flex a-i-c j-c-c">
            <img :src="photo" width="50" height="50" radius="50">
            <div class="js-user-change ml-20">{{ openStudentName }}</div>
          </div>
          <p size-12 class="mt-20 mb-20">当你在平台上分享你的作品，不可思议的事件就会让你成长</p>
          <div size-12 class="text-center">
            <span>作品: 160幅</span>
            <span>上榜: 9幅</span>
          </div>
        </div>
      </div>
      <figure class="figure figure-skin-one" v-for="(item,index) in list" :key="index">
        <div class="figure-bd">
          <div
            class="figure-thumb-small"
            v-if="item.photo"
            :style="{backgroundImage: `url(${item.photo})`}"
          ></div>
          <div class="figure-info">
            <h3>{{ item.title }}</h3>
          </div>
        </div>
      </figure>
    </div>
    <div class="flex-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import qxFooter from "@/components/Footer";
import { wisdomList } from "@/mock";
export default {
  name: "wisdom",
  components: {
    qxFooter
  },
  data() {
    return {
      photo: this.$store.state.user.info.photo,
      openStudentName: this.$store.state.user.info.openStudentName,
      list: []
    };
  },
  methods: {},
  mounted() {
    this.list = wisdomList();
    console.log(this.list);
  }
};
</script>
<style lang="less" scoped>
.wisdom-user {
  color: #fff;
  position: relative;
  height: 240px;
  background-image: url("~@/assets/user-center-bg@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
