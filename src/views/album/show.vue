<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="roleType == 2">
        <a href="javascript:;" class="release" @click="handleBlumAdd">
          <img src="@/assets/image/release-icon.png" alt>
        </a>
      </template>
      <article class="article">
        <h1 size-24>{{ albumInfo.title }}</h1>
        <div class="article-hd flex">
          <div class="article-cell">
            <time style="color:#8d8d8d;">{{ albumInfo.postTime }}</time>
          </div>
        </div>
        <div class="album-content">
          <div class="grid-content clearfix">
            <div
              class="album-img"
              v-for="(pic, index) in albumInfo.items"
              :key="index"
              @click="handlePreviewImage(index, albumInfo.items)"
            >
              <img :src="pic.imageUrl">
            </div>
          </div>
        </div>
        <div class="empty" v-if="!albumInfo.items">
          <img src="@/assets/image/kong.png" alt>
          <p size-18>暂无~</p>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import service from "@/api";
export default {
  name: "albumDetail",
  data() {
    return {
      roleType: this.$store.state.roleType,
      query: {
        openId: this.$store.state.openId,
        channelId: this.$route.query.channelId
      },
      albumInfo: {}
    };
  },
  methods: {
    handleBlumAdd(e) {
      this.$router.push({
        path: "/album/add",
        query: { channelId: this.$route.query.channelId }
      });
    },
    //预览图片
    handlePreviewImage(index, images) {
      if (Array.isArray(images)) {
        let result = [];
        images.forEach(elem => {
          result.push(elem.imageUrl);
        });
        ImagePreview({
          images: result,
          startPosition: index
        });
      }
    },
    //相册照片或视频删除
    async imageDelete() {
      let res = await service.imageDelete(params);
      if (res.errorCode === 0) {
      }
    },
    //查询班级所属的相册栏目
    async albumChannelDetail(params = {}) {
      let res = await service.albumChannelDetail(params);
      if (res.errorCode === 0) {
        this.albumInfo = res.data;
      }
    }
  },
  mounted() {
    this.albumChannelDetail(this.query);
  }
};
</script>
<style lang="less">
.album-content {
  overflow: hidden;
}
.album-img {
  width: 160px;
  height: 160px;
  float: left;
  position: relative;
  overflow: hidden;
  margin-left: 10px;
  margin-bottom: 20px;
  img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
