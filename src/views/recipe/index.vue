<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="roleType == 1">
        <router-link to="/recipe/add" class="release">
          <img src="@/assets/image/release-icon.png" alt="">
        </router-link>      
      </template>
      <template v-if="recipeData.length">
        <figure class="figure" v-for="(recipe, index) in recipeData" :key="index">
          <router-link  :to="{ path: '/recipe/show', query: { recipeId: recipe.recipeId} }">
            <h3 class="text-ellipsis">{{ recipe.title }}</h3>
            <div style="color:#8d8d8d;">
              <time>{{ recipe.postTime }}</time>
            </div>  
            <template v-if="recipe.topImage">
              <div class="pic" :style="{backgroundImage: `url(${recipe.topImage})`}"></div>
            </template>   
            <p class="line-clamp">{{ recipe.textContent }}</p>
            <div class="metedata" style="color:#8d8d8d;">
              <div>{{ recipe.name }}</div>
              <div size-14 class="metedata-count"></div>
            </div>                                   
          </router-link>
        </figure> 
      </template> 
      <template v-else>
        <!-- 空提示 -->
        <div class="empty">
          <img src="@/assets/image/kong.png" alt="">
        </div>
      </template>
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
      },
      roleType: this.$store.getters.roleType || this.$route.query.roleType,
      recipeData: []
    };
  },
  methods: {
    handleLoadingMore(e) {},
    //食谱列表查询
    async recipeQuery(params = {}) {
      let res = await service.recipeQuery(params);
      if (res.errorCode === 0) {
        this.recipeData = res.data;
      }
    }
  },
  mounted() {
    this.recipeQuery(this.query);
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
  .pic {
    width: 690px;
    height: 298px;
    margin: 20px 0;
    background-size: 100%;
    background-repeat: no-repeat;
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
  .metedata-count {
    font-size: 0;
    span {
      font-size: 28px;
      display: inline-block;
      margin-left: 10px;
    }
  }
}
</style>
