<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="roleType == 1">
        <router-link to="/recipe/add" class="release">
          <img src="@/assets/image/release-icon.png" alt>
        </router-link>
      </template>
      <template v-if="recipeData.length">
        <figure class="figure" v-for="(recipe, index) in recipeData" :key="index">
          <router-link :to="{ path: '/recipe/show', query: { recipeId: recipe.recipeId} }">
            <h3 class="text-ellipsis">{{ recipe.title }}</h3>
            <div class="time">
              <time>{{ recipe.postTime }}</time>
            </div>
            <template v-if="recipe.topImage">
              <div class="pic" :style="{backgroundImage: `url(${recipe.topImage})`}"></div>
            </template>
            <p class="line-clamp">{{ recipe.textContent }}</p>
            <div class="metedata">
              <div>
                <span>{{ recipe.name }}</span>
              </div>
              <div size-14 class="metedata-count"></div>
            </div>
          </router-link>
        </figure>
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
</style>
