<template>
  <div class="flex-page">
    <div class="flex-bd">
      <van-swipe-cell
        ref="swipeCell"
        :right-width="60"
        v-for="(item, index) in list"
        :key="index"
        :disabled="true"
        :on-close="onClose(item, index)"
      >
        <van-cell-group>
          <figure class="figure figure-skin-one">
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
                  <span class="name">下载量{{ item.paperId }}</span>
                  <van-button type="primary" size="mini">上传成绩</van-button>
                </div>
              </div>
            </div>
          </figure>
        </van-cell-group>
      </van-swipe-cell>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { examPaperList } from "@/mock";
export default {
  name: "examPaper",
  data() {
    return {
      query: {
        openId: this.$store.state.user.info.openId
      },
      list: []
    };
  },
  methods: {
    onClose() {
      return (clickPosition, instance) => {};
    },
    async examPaperQuery(params = {}) {
      let res = await service.examPaperQuery(params);
      if (res.errorCode === 0) {
        this.pageData = res.data;
      }
    }
  },
  mounted() {
    this.list = examPaperList();
  }
};
</script>
<style lang="less" scoped>
.metedata {
  justify-content: space-between;
}
</style>
