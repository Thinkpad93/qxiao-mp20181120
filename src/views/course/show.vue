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
            <h3 class="mb-20">阅读说明:</h3>
            <p>华南师范大学附属小学</p>
            <span>下载量: 160</span>
            <span>满意度: 98%</span>
          </div>
          <div class="section">
            <h4 class="mb-20">课程说明:</h4>
            <p>
              指导精读。就是说在每句阅读时，
              先理解每字的意思，然后通解一句之意，
              又通解一章之意，相接连作去，明理演文，一举两得”这是传统的三步精读法。
              它是培养学生阅读能力最主要最基本的手段。
            </p>
          </div>
        </van-tab>
        <van-tab title="评价">
          <div class="comment-box mt-20">
            <div class="comment-header flex a-i-c">
              <p size-16>评论</p>
            </div>
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
        <div class="handle-share">
          <van-icon name="share" size="20px"></van-icon>
          <div size-12>转发</div>
        </div>
        <div class="handle-comment">
          <van-icon name="like-o" size="20px"></van-icon>
          <div size-12>收藏</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { examPaperComment } from "@/mock";
export default {
  name: "courseShow",
  data() {
    return {
      actives: 0,
      commentList: []
    };
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
  min-height: 88px;
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
.comment-header {
  min-height: 100px;
  padding: 0 30px;
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
