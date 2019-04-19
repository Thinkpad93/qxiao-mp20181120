<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="roleType == 1 || roleType == 4">
        <router-link
          :to="{path: '/recipe/add', query: {openId:this.$route.query.openId}}"
          class="release"
        >
          <van-icon name="description" size="24px"></van-icon>
        </router-link>
      </template>
      <van-swipe-cell
        ref="swipeCell"
        :right-width="60"
        v-for="(recipe, index) in recipeData"
        :key="index"
        :disabled="roleType == 3 || roleType == 2"
        :on-close="onClose(recipe, index)"
      >
        <van-cell-group>
          <figure class="figure figure-skin-two" @click="go(recipe)">
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
                <van-icon name="eye-o" size="16px"></van-icon>
                <b>{{ recipe.readCount }}</b>
              </div>
            </div>
          </figure>
        </van-cell-group>
        <span slot="right" style="line-height: 80px;">删除</span>
      </van-swipe-cell>
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
      long: 0,
      time: 0,
      query: {
        openId: this.$route.query.openId,
        studentId: this.$route.query.studentId
      },
      roleType: this.$route.query.roleType,
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
    onClose(recipe, index) {
      return (clickPosition, instance) => {
        switch (clickPosition) {
          case "right":
            this.$dialog
              .confirm({
                title: "提示",
                message: "确定删除该条食谱吗？"
              })
              .then(async () => {
                let obj = {
                  openId: this.query.openId,
                  recipeId: recipe.recipeId
                };
                //删除速报
                let res = await service.recipeDelete(obj);
                if (res.errorCode === 0) {
                  instance.close();
                  this.recipeData.splice(index, 1);
                }
              })
              .catch(() => {
                instance.close();
              });
            break;
        }
      };
    },
    go(recipe) {
      let { studentId, recipeId } = recipe;
      let openId = this.query.openId;
      this.$router.push({
        path: "/recipe/show",
        query: {
          studentId,
          recipeId,
          openId
        }
      });
    },
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
<style lang="less" scoped>
</style>
