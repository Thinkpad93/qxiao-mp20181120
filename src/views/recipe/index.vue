<template>
  <div class="page">
    <div class="page-bd">
      <figure class="figure" v-for="(f, index) in 1" :key="index" @click="go">
        <h3 class="text-ellipsis">9月25日至9月30日食谱</h3>
        <div>
          <time>09-22 10:15</time>
        </div>
        <img src="http://iph.href.lu/690x298" alt="">
        <p class="line-clamp">星期二： 早餐【 肠粉】午餐【蒸白米饭 土豆焖鸡】</p>
        <div class="metedata">
          <span>73人阅读</span>
        </div>
      </figure>  
    </div>
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "recipe",
  data() {
    return {
      query: {
        openId: this.$store.getters.openId
      }
    };
  },
  methods: {
    go() {
      this.$router.push({ path: "/fresh/show" });
    },
    //食谱列表查询
    async recipeQuery(params = {}) {
      let res = await service.recipeQuery(params);
    }
  },
  activated() {
    this.recipeQuery(this.query);
  }
};
</script>
<style lang="less">
.figure {
  padding: 0 30px;
  margin-bottom: 30px;
  background-color: #fff;
  &:active {
    background-color: #f2f2f2;
  }
  h3 {
    font-weight: bold;
    font-size: 36px;
    padding: 20px 0 10px 0;
  }
  p {
    font-size: 30px;
    margin: 10px 0 20px 0;
    line-height: 1.5;
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
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid #f5f5f5;
    span {
      margin-right: 30px;
    }
  }
}
</style>
