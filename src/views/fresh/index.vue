<template>
  <div class="page">
    <div class="page-hd">
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;">
          <span>KC3班</span>
        </a>
      </div>
    </div>
    <div class="page-bd">
      <router-link to="/fresh/add" class="release">
        <img src="@/assets/image/release-icon.png" alt="">
      </router-link>
      <figure class="figure" v-for="(f, index) in 1" :key="index" @click="go">
        <h3 class="text-ellipsis">元素的内容应该与主内容相关</h3>
        <div style="color:#8d8d8d;">
          <time>09-22 10:15</time>
        </div>
        <img src="http://iph.href.lu/690x298" alt="">
        <p class="line-clamp">必须在描述并收藏数据的内容或特色，进而达成协助数据检索的目的。这种布局在移动端页面开发时候经常遇到</p>
        <div class="metedata" style="color:#8d8d8d;">
          <span>73人阅读</span>
          <span>留言8</span>
        </div>
      </figure>  
    </div>
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "fresh",
  data() {
    return {
      query: {
        openId: this.$store.getters.openId,
        classId: null
      }
    };
  },
  methods: {
    go() {
      this.$router.push({ path: "/fresh/show" });
    },
    //速报列表查询
    async freshQuery(params = {}) {
      let res = await service.freshQuery(params);
    }
  },
  activated() {}
};
</script>
<style lang="less" scoped>
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
}
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
}
.figure {
  padding: 0 30px;
  margin-bottom: 30px;
  background-color: #fff;
  &:active {
    background-color: #f2f2f2;
  }
  h3 {
    font-size: 36px;
    padding: 20px 0 0 0;
  }
  p {
    font-size: 28px;
  }
  img {
    width: 690px;
    height: 298px;
    margin: 20px 0;
  }
  .metedata {
    margin: 20px -30px 0 -30px;
    padding: 0 30px;
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f5f5f5;
  }
}
.release {
  display: block;
  position: fixed;
  right: 5%;
  bottom: 10%;
  z-index: 100;
}
</style>
