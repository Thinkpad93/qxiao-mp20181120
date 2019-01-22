<template>
  <div class="page">
    <div class="page-bd">
      <figure class="figure" v-for="(recipe, index) in recipeData" :key="index">
        <router-link  :to="{ path: '/recipe/show', query: { recipeId: recipe.recipeId} }">
          <h3 class="text-ellipsis">{{ recipe.title }}</h3>
          <div style="color:#8d8d8d;">
            <time>{{ recipe.postTime }}</time>
          </div>  
          <template v-if="recipe.topImage">
            <div class="pic" :style="{backgroundImage: `url(${recipe.topImage})`}"></div>
          </template>   
          <p class="line-clamp">{{ homework.textContent }}</p>
          <div class="metedata" style="color:#8d8d8d;">
            <span>{{ recipe.classReadCount }}人阅读</span>
          </div>                                   
        </router-link>
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
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        openId: this.$store.getters.openId
      },
      recipeData: []
    };
  },
  methods: {
    handleLoadingMore(e) {},
    //食谱列表查询
    async recipeQuery(params = {}) {
      let res = await service.recipeQuery(params);
      if (res.errorCode === 0) {
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.isLoading = false;
        this.recipeData = res.data.data;
      }
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleLoadingMore);
  },
  mounted() {
    this.recipeQuery(this.query);
    document.addEventListener("scroll", this.handleLoadingMore);
  }
};
</script>
<style lang="less">
.figure {
  margin-bottom: 30px;
  background-color: #fff;
  > a {
    position: relative;
    padding: 0 30px;
    display: block;
  }
  &:active {
    background-color: #f2f2f2;
  }
  h3 {
    position: relative;
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
