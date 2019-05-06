<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- video视频区域 -->
      <div class="video-mod">
        <!-- <div class="video-mask">
          <van-icon name="play-circle" size="40px"></van-icon>
        </div>-->
        <div class="video-main">
          <video ref="video" src="@/assets/video01.mp4" controls></video>
        </div>
      </div>
      <van-tabs v-model="actives" :line-height="2">
        <van-tab title="简介">
          <div class="section mb-20 mt-20">
            <h3 class="mb-20">{{ info.schoolName }}</h3>
            <p>{{ info.title }}</p>
            <span>下载量：{{ info.downloadCount }}</span>
          </div>
          <div class="section">
            <h4 class="mb-20">试卷说明：</h4>
            <p>{{ info.textContent }}</p>
          </div>
        </van-tab>
        <van-tab title="评价">
          <div class="comment-box mt-20">
            <div class="comment-cell" v-for="(item, index) in commentList" :key="index">
              <div class="comment-hd flex a-i-c">
                <img :src="item.photo" width="40" height="40" radius="50">
                <span class="ml-20">{{ item.name }}</span>
              </div>
              <div class="comment-bd">
                <p>{{ item.textContent }}</p>
              </div>
              <div class="comment-ft">
                <time>{{ item.postTime }}</time>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="flex-ft">
      <div class="handle flex a-i-c">
        <div class="handle-comment">
          <van-icon name="comment-o" size="20px"></van-icon>
          <div size-12>评论</div>
        </div>
        <div class="handle-share">
          <van-icon name="share" size="20px"></van-icon>
          <div size-12>转发</div>
        </div>
        <div class="handle-down">
          <van-button type="info" class="no-radius">试卷{{ info.fee }}元/套</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { examPaperComment } from "@/mock";
export default {
  name: "",
  data() {
    return {
      actives: 0,
      query: {
        openId: this.$store.state.user.info.openId,
        paperId: this.$route.query.paperId
      },
      form: {
        studentId: this.$store.state.user.info.openStudentId,
        textContent: ""
      },
      info: {},
      commentList: []
    };
  },
  methods: {
    //试卷详情查询
    async examPaperDetail(params = {}) {
      let res = await service.examPaperDetail(params);
      if (res.errorCode === 0) {
        this.info = res.data;
      }
    },
    //查询试卷评论
    async examPaperCommentQuery(params = {}) {
      let res = await service.examPaperCommentQuery(params);
      if (res.errorCode === 0) {
        this.commentList = res.data;
      }
    },
    //提交试卷评论
    async examPaperComment(params = {}) {
      let res = await service.examPaperComment(params);
    }
  },
  mounted() {
    this.examPaperDetail(this.query);
    this.examPaperCommentQuery(this.query);
    //this.commentList = examPaperComment();
  }
};
</script>
<style lang="less" scoped>
.video-mod {
  min-height: 360px;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 10px 0 rgba(204, 204, 204, 0.5);
}
.video-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.video-main {
  height: 100%;
}
.section {
  padding: 30px;
  background-color: #fff;
  p {
    line-height: 1.6;
    margin-bottom: 20px;
  }
  span {
    color: #7d7e80;
  }
}
.handle {
  background-color: #fff;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    z-index: 2;
  }
  > div {
    flex: 1;
    text-align: center;
  }
}
.comment-box {
  background-color: #fff;
}
.comment-cell {
  padding: 20px 30px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    z-index: 2;
  }
}
.comment-hd {
  color: #7d7e80;
}
.comment-bd {
  margin: 20px 0;
  p {
    line-height: 1.6;
  }
}
.comment-ft {
  color: #7d7e80;
}
</style>
