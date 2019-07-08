<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="roleType != 3">
        <qxRelease url="/recipe/add" />
      </template>
      <!-- list -->
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :offset="100"
        @load="onLoad"
      >
        <van-swipe-cell
          ref="swipeCell"
          :right-width="60"
          v-for="(recipe, index) in list"
          :key="index"
          :disabled="roleType == 3"
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
      </van-list>
      <div class="empty" v-if="!list.length">
        <img src="@/assets/kong.png" alt />
        <p>暂无营养食谱</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import qxRelease from "@/components/Release";
export default {
  name: "recipe",
  components: {
    qxRelease
  },
  data() {
    return {
      loading: false,
      finished: false,
      totalPage: 1, //总页数
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.studentId,
        page: 1,
        pageSize: 10
      },
      roleType: this.$store.state.user.info.roleType,
      list: []
    };
  },
  methods: {
    onLoad() {
      if (this.query.page < this.totalPage) {
        //加载数据
        this.query.page += 1;
        service.recipeQuery(this.query).then(res => {
          if (res.errorCode === 0) {
            let list = res.data.data;
            this.totalPage = res.data.totalPage;
            this.query.page = res.data.page;
            // 加载状态结束
            this.loading = false;
            for (let i = 0; i < list.length; i++) {
              this.list.push(list[i]);
            }
          }
        });
      } else {
        // 数据全部加载完成
        console.log("数据全部加载完成");
        this.loading = false;
        this.finished = true;
      }
    },
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
                  this.list.splice(index, 1);
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
      this.$router.push({
        path: "/recipe/show",
        query: { recipeId, studentId }
      });
    },
    //食谱列表查询
    async recipeQuery(params = {}) {
      let res = await service.recipeQuery(params);
      if (res.errorCode === 0) {
        this.list = res.data.data;
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
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
