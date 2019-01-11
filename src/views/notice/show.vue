<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>{{ info.title }}</h1>
        <div class="article-head flex">
          <div class="article-cell">
            <img src="@/assets/image/109951163721579973.jpg" alt="">
          </div>
          <div class="article-cell">
            <p>刘家明(园长)</p>
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
      </article>
      <div class="cells-title">班级阅读情况</div>
      <!-- <div class="cells">
        <div class="tab">
          <a href="javascript:;" class="curr" @click="handleTabClick(0)">已读</a>
          <a href="javascript:;" @click="handleTabClick(1)">未读</a>
        </div>
        <div class="tab-content">
          <div class="item">
            <div class="cell" v-for="(t, index) in 4" :key="index">
              <div class="cell-hd">
                <img class="icon" src="@/assets/image/109951163721579973.jpg" alt="">
              </div>
              <div class="cell-bd">
                <p>李明敏</p>
              </div>
              <div class="cell-ft">
                <span :style="{ color: index % 2 === 0 ? '#92cd36': '#ff87b7'}">未确认通知</span>
              </div>
            </div>
          </div>
          <div class="item"></div>
        </div>
      </div> -->
    </div>  
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "noticeShow",
  data() {
    return {
      query: {
        openId: this.$store.getters.openId, //用户openid
        noticeId: this.$route.params.id,
        classId: 0
      },
      read: {
        openId: this.$store.getters.openId, //用户openid
        noticeId: this.$route.params.id,
        classId: 0,
        readFlag: 0
      },
      readList: [],
      info: {
        title: ""
      }
    };
  },
  methods: {
    handleTabClick(index) {
      this.read.readFlag = index;
    },
    //公告通知详情
    async noticeDetail(params = {}) {
      let loading = this.$weui.loading("加载中");
      let res = await service.noticeDetail(params);
      if (res.errorCode === 0) {
        loading.hide();
        this.info = res.data;
      }
    },
    //公告阅读人员查询
    async noticeReaders(params = {}) {
      let res = await service.noticeReaders(params);
      if (res.errorCode === 0) {
        this.readList = res.data;
      }
    }
  },
  activated() {
    this.noticeDetail(this.query);
    this.noticeReaders(this.read);
  }
};
</script>
<style lang="less">
.article {
  padding: 30px 30px 10px 30px;
  word-wrap: break-word;
  background-color: #fff;
  h1 {
    margin-bottom: 20px;
  }
}
.article-head {
  align-items: center;
  .article-cell {
    margin-right: 20px;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
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
.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.tab {
  display: flex;
  font-size: 30px;
  background-color: #fff;
  a {
    height: 100px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .curr {
    color: #92cd36;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      display: block;
      width: 50%;
      height: 4px;
      background-color: #92cd36;
      transform: translateX(-50%);
    }
  }
}
.tab-content {
  .cell {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
