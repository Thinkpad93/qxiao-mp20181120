<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="roleType == 1 || roleType == 4">
        <router-link to="/recipe/add" class="release">
          <img src="@/assets/image/release-icon.png" alt>
        </router-link>
      </template>
      <figure
        class="figure figure-skin-two"
        v-for="(recipe, index) in recipeData"
        :key="index"
        @click="handleJump(recipe)"
      >
        <div class="figure-bd">
          <div class="figure-info">
            <figcaption size-18 class="text-ellipsis">{{ recipe.title }}</figcaption>
            <div class="metedata flex">
              <span class="name">{{ recipe.name }}</span>
              <time class="time">{{ recipe.postTime }}</time>
            </div>
            <div
              class="figure-thumb-medium"
              v-if="recipe.topImage"
              :style="{backgroundImage: `url(${recipe.topImage})`}"
            ></div>
            <p class="line-clamp">{{ recipe.textContent | brReplace }}</p>
          </div>
        </div>
        <div class="figure-ft">
          <div class="figure-icon">
            <i class="iconfont icon-chakan"></i>
            <b>{{ recipe.readCount }}</b>
          </div>
        </div>
      </figure>
      <div class="empty" v-if="!recipeData.length">
        <img src="@/assets/image/kong.png" alt>
        <p size-18>暂无营养食谱</p>
      </div>
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
        openId: this.$store.state.wx.openId,
        studentId: null
      },
      roleType: this.$store.state.users.roleType || this.$route.query.roleType,
      recipeData: []
    };
  },
  filters: {
    brReplace(value) {
      if (!value) return "";
      return value.replace(/<br\/>/g, "");
    }
  },
  methods: {
    handleJump(recipe) {
      this.$router.push({
        path: "/recipe/show",
        query: { recipeId: recipe.recipeId }
      });
    },
    //食谱列表查询
    async recipeQuery(params = {}) {
      if (this.roleType == 3) {
        this.query.studentId =
          this.$store.state.student.studentId || this.$route.query.studentId;
      } else {
        this.query.studentId = 0;
      }
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
