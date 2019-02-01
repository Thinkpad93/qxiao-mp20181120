<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>{{ albumInfo.title }}</h1>  
        <div class="article-head flex">
          <div class="article-cell">
            <time style="color:#8d8d8d;">{{ albumInfo.postTime }}</time>    
          </div>
        </div> 
        <div class="album-content flex">
          <div class="item" 
            v-for="(pic, index) in albumInfo.items" 
            :key="index" 
            @click="handlePreviewImage(index, albumInfo.items)">
            <img :src="pic.imageUrl" alt="">
          </div>
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
      query: {
        openId: this.$store.getters.openId,
        channelId: this.$route.query.channelId
      },
      albumInfo: {}
    };
  },
  methods: {
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
.article {
  padding: 30px;
  word-wrap: break-word;
  background-color: #fff;
  h1 {
    margin-bottom: 10px;
  }
}
.album-content {
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 20px;
  .item {
    text-align: center;
    position: relative;
    width: 25%;
    height: 200px;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
