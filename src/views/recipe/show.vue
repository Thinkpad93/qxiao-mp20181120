<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>{{ info.title }}</h1>
        <div class="article-hd">
          <div class="article-cell">
            <time>{{ info.postTime }}</time>
          </div>
          <div class="article-cell">
            <i class="iconfont icon-chakan"></i>
            <b>{{ info.readCount }}</b>
          </div>
        </div>
        <div size-16 class="article-content">
          <p v-html="info.textContent"></p>
          <template v-if="info.images">
            <p v-for="(img, index) in info.images" :key="index">
              <img :src="img.imageUrl">
            </p>
          </template>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "recipeShow",
  data() {
    return {
      query: {
        openId: this.$store.state.wx.openId || this.$route.query.openId,
        recipeId: this.$route.query.recipeId
      },
      info: {}
    };
  },
  methods: {
    //食谱详情查询
    async recipeDetail(params = {}) {
      let res = await service.recipeDetail(params);
      if (res.errorCode === 0) {
        this.info = res.data;
      }
    }
  },
  activated() {
    this.recipeDetail(this.query);
  }
};
</script>
<style lang="less">
</style>
