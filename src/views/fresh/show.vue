<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>{{ info.title }}</h1>
        <div class="article-head flex">
          <div class="article-cell">
            <span style="color:#8d8d8d;">{{ info.schoolName }}</span>
          </div>
          <div class="article-cell">
            <time style="color:#8d8d8d;">{{ info.postTime }}</time>    
          </div>
        </div>
        <section size-16 class="article-content">
          <p>{{ info.textContent }}</p>
          <template v-if="info.images">
            <p v-for="(img, index) in info.images" :key="index">
              <img :src="img.imageUrl">
            </p>
          </template>          
        </section>
        <div class="class flex" style="color:#8d8d8d;">
          <span class="read">{{ info.classReadCount }}人阅读</span>
          <span class="zan">{{ info.classCommentCount }}人评论</span>
        </div>
      </article>
      <div class="comment">
        <div class="comment-hd flex">
          <span>留言({{ commentList.length }})</span>
          <a href="javascript:;" style="color:#44649f;">写留言</a>
        </div>
        <div class="comment-bd">
          <div class="cells">
            <div class="cell" 
              v-for="(comm, index) in commentList" :key="index">
              <div class="cell-hd">
                <!-- <img class="icon" src="@/assets/image/109951163721579973.jpg" alt=""> -->
              </div>   
              <div class="cell-bd">
                <span style="color:#44649f;">{{ comm.name }}</span>
                <p></p>
              </div>           
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "freshShow",
  data() {
    return {
      query: {
        openId: this.$store.getters.openId,
        freshId: parseInt(this.$route.query.freshId),
        classId: parseInt(this.$route.query.classId)
      },
      info: {},
      commentList: []
    };
  },
  methods: {
    //速报详情
    async freshDetail(params = {}) {
      let res = await service.freshDetail(params);
      if (res.errorCode === 0) {
        this.info = res.data;
      }
    },
    //速报评论发表
    async freshCommentAdd(params = {}) {
      let res = await service.freshCommentAdd(params);
      if (res.errorCode === 0) {
      }
    },
    //速报评论人员列表
    async freshCommentQuery(params = {}) {
      let res = await service.freshCommentQuery(params);
      if (res.errorCode === 0) {
        this.commentList = res.data.contents;
      }
    }
  },
  activated() {
    //this.freshCommentQuery(this.query);
    this.freshDetail(this.query);
  }
};
</script>
<style lang="less">
.article {
  padding: 30px;
  word-wrap: break-word;
  background-color: #fff;
  h1 {
    margin-bottom: 20px;
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
.class {
  justify-content: space-between;
}
.comment {
  font-size: 30px;
  margin-top: 20px;
  background-color: #fff;
  &-hd {
    padding: 0 30px;
    height: 80px;
    align-items: center;
    justify-content: space-between;
  }
  &-bd {
    .cell {
      padding-top: 20px;
      padding-bottom: 20px;
    }
    p {
      margin-top: 10px;
    }
    .icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
}
</style>
