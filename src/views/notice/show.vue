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
          <template v-if="info.images">
            <p v-for="(img, index) in info.images" :key="index">
              <img :src="img.imageUrl">
            </p>
          </template>          
          <p>{{ info.textContent }}</p>
        </section>
        <div class="class flex" style="color:#8d8d8d;">
          <span class="read">{{ info.classReadCount }}人阅读</span>
        </div>
      </article>
      <div class="cells-title">班级阅读情况</div>
      <div class="tab-warp">
        <div class="tab">
          <div class="tab-head">
            <a href="javascript:void(0);" :class="[ readFlag === 0 ? 'curr': '' ]" @click="handleTabClick(0)">已读({{ readCount }})</a>
            <a href="javascript:void(0);" :class="[ readFlag === 1 ? 'curr': '' ]" @click="handleTabClick(1)">未读({{ unreadCount }})</a>
          </div>
          <div class="tab-content">
            <div class="item">
              <div class="cell"></div>
            </div>
            <div class="item">
              <div class="cell"></div>
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
  name: "noticeShow",
  data() {
    return {
      readFlag: 0,
      query: {
        openId: this.$store.getters.openId, //用户openid
        noticeId: this.$route.params.id,
        classId: 0
      },
      readList: [],
      unreadList: [],
      info: {
        title: ""
      }
    };
  },
  readCount() {
    return this.readList.length;
  },
  unreadCount() {
    return this.unreadList.length;
  },
  methods: {
    handleTabClick(index) {
      this.readFlag = index;
      this.homeworkReaders();
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
    async noticeReaders() {
      let obj = Object.assign({}, this.query, { readFlag: this.readFlag });
      let res = await service.noticeReaders(obj);
      if (res.errorCode === 0) {
        if (this.readFlag) {
          this.unreadList = res.data.readers || []; //后端有可能返回null
        } else {
          this.readList = res.data.readers || []; //后端有可能返回null
        }
      }
    }
  },
  activated() {
    this.noticeDetail(this.query);
    this.noticeReaders();
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
.tab-warp {
  margin-top: 30px;
  margin-bottom: 30px;
  .tab-head {
    display: flex;
  }
  .tab-content {
    .item {
      position: relative;
      display: none;
    }
    .currs {
      display: block;
    }
    .cell {
      color: #252525;
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }
  .tab {
    font-size: 30px;
    background-color: #fff;
    a {
      width: 200px;
      height: 100px;
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
        width: 70%;
        height: 4px;
        background-color: #92cd36;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
