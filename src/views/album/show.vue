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
      </article>
    </div>
  </div>  
</template>
<script>
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
.article-content {
  text-align: justify;
  p {
    margin: 20px 0;
    line-height: 1.4;
  }
  img {
    max-width: 100%;
  }
}
</style>
