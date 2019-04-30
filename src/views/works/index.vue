<template>
  <div class="flex-page">
    <div class="flex-bd">
      <van-tabs v-model="active" :line-height="2">
        <van-tab title="优秀作品">
          <!-- 学生个人作品 -->
          <div class="my-works mb-20">
            <div class="my-works-hd flex a-i-c">
              <h4>我的上榜</h4>
              <div class="flex">
                <span>更多</span>
                <van-icon name="arrow" size="16px"></van-icon>
              </div>
            </div>
            <div class="my-works-bd flex">
              <div class="item" v-for="item in 3" :key="item">
                <div class></div>
              </div>
            </div>
          </div>
          <div class="all-works">
            <div class="all-works-hd">
              <h4>优秀作品展</h4>
            </div>
            <div class="all-works-bd">
              <div class="flex">
                <div class="addax"></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="我的上传">
          <div class="time-works mt-20">
            <div class="item" v-for="(item, index) in 1" :key="index">
              <time size-16>2019年4月30号</time>
              <div class="flex f-w-w" style="margin-left:-5px;margin-right:-5px;">
                <div class="suni-box mt-30" v-for="(suni, i) in 6" :key="i">
                  <div class="suni">
                    <img src="@/assets/works.png" alt>
                    <div class="works-status" size-12>审核中</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" to="/works/add">上传作品</van-button>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { ImagePreview } from "vant";
export default {
  name: "works",
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style lang="less" scoped>
.time-works {
  background-color: #fff;
  .item {
    padding: 30px 20px;
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
    .suni-box {
      width: 25%;
      padding: 0 10px;
    }
    .suni {
      position: relative;
      overflow: hidden;
    }
    .works-status {
      color: #fff;
      padding: 6px 10px;
      border-radius: 20px;
      position: absolute;
      right: 6%;
      bottom: 6px;
      background-color: #252525;
    }
  }
}
</style>
