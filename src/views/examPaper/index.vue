<template>
  <div class="page">
    <div class="page-bd">
      <van-swipe-cell
        ref="swipeCell"
        :right-width="60"
        v-for="(item, index) in list"
        :key="index"
        :disabled="true"
        :on-close="onClose(item, index)"
      >
        <van-cell-group>
          <figure class="figure figure-skin-one" @click="jump(item)">
            <div class="figure-bd">
              <div
                class="figure-thumb-small"
                v-if="item.image"
                :style="{backgroundImage: `url(${item.image})`}"
              ></div>
              <div class="figure-info">
                <figcaption class="text-ellipsis">
                  <span size-18>{{ item.title }}</span>
                </figcaption>
                <p size-15 class="text-ellipsis">{{ item.stageTitle}}</p>
                <div class="metedata flex">
                  <span class="name">下载量: {{ item.downloadCount }}</span>
                  <van-button round type="info" size="mini" style="width:80px;">点击收看</van-button>
                </div>
              </div>
            </div>
          </figure>
        </van-cell-group>
      </van-swipe-cell>
      <div class="empty" v-if="!list.length">
        <img src="@/assets/kong.png" alt>
        <p>暂无试卷内容~</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "examPaper",
  data() {
    return {
      query: {
        openId: this.$store.state.user.info.openId,
        lessonId: this.$route.query.lessonId,
        stageId: this.$route.query.stageId,
        page: 1,
        pageSize: 20
      },
      list: []
    };
  },
  methods: {
    onClose() {
      return (clickPosition, instance) => {};
    },
    jump(params) {
      let { paperId } = params;
      this.$router.push({
        path: "/examPaper/show",
        query: {
          paperId
        }
      });
      console.log(params);
    },
    //试卷列表查询
    async examPaperQuery(params = {}) {
      let res = await service.examPaperQuery(params);
      if (res.errorCode === 0) {
        this.list = res.data.data || [];
      }
    }
  },
  mounted() {
    this.examPaperQuery(this.query);
  }
};
</script>
<style lang="less" scoped>
.metedata {
  justify-content: space-between;
  align-items: center;
}
</style>
