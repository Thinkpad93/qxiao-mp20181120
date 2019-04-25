<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- video视频区域 -->
      <div class="video-mod">
        <div class="video-mask">
          <van-icon name="play-circle" size="40px"></van-icon>
        </div>
      </div>
      <van-tabs v-model="actives" :line-height="2">
        <van-tab title="简介">
          <div class="section mb-20 mt-20">
            <h3 class="mb-20">华南师范大学附属小学</h3>
            <p>二年级上学期期中考试有助于学生创造性发挥，比较注重课改评价理念的践行。</p>
            <span>下载量：160</span>
          </div>
          <div class="section">
            <h4 class="mb-20">试卷说明：</h4>
            <p>
              总体而言，该试卷知识覆盖面较广，信息量大，贴近学生生活，
              既考查了学生的语言积累，又检测了运用的能力。
              题量偏大，偏难。依据课标，尊重教材。
              同时，有一些题目如六题、七题、九题没有单一的答案，
              有助于学生创造性发挥，比较注重课改评价理念的践行。
            </p>
            <p>
              对许嵩的歌，我从高中开始一直喜欢，到大学后怕别人说幼稚非主流就慢慢不去听。
              明明自己喜欢女色却装作正人君子，喜欢放肆却一本正经。
              其实很多人都很虚伪，明明很喜欢的东西为害怕别人的评论而随波逐流。
              总假装把自己放在道德制高点其实自己什么也不是。
            </p>
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
          <van-button type="info" class="no-radius">下载试卷10元/套</van-button>
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
      }
    },
    //查询试卷评论
    async examPaperCommentQuery() {
      let res = await service.examPaperCommentQuery(params);
    },
    //提交试卷评论
    async examPaperComment() {
      let res = await service.examPaperComment(params);
    }
  },
  mounted() {
    this.commentList = examPaperComment();
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
  margin: 10px 0;
  p {
    line-height: 1.6;
  }
}
.comment-ft {
  color: #7d7e80;
}
</style>
