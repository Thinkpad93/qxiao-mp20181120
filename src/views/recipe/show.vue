<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>{{ info.title }}</h1>  
        <div class="article-head flex">
          <div class="article-cell">
            <time style="color:#8d8d8d;">{{ info.postTime }}</time>    
          </div>
        </div>    
        <section size-16 class="article-content">
          <p>{{ info.textContent }}</p>     
          <template v-if="info.images">
            <p v-for="(img, index) in info.images" :key="index">
              <img :src="img.imageUrl">
            </p>
          </template>               
        </section>
        <div class="class flex" style="color:#8d8d8d;">
          <span class="read">{{ info.readCount }}人阅读</span>
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
        openId: this.$store.getters.openId || this.$route.query.openId,
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
.article {
  padding: 30px;
  word-wrap: break-word;
  background-color: #fff;
  h1 {
    margin-bottom: 20px;
  }
}
.article-content {
  text-align: justify;
  p {
    margin: 20px 0;
    line-height: 1.4;
  }
  img {
    max-width: 100%;
  }
}
</style>
