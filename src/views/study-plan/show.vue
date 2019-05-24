<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- video视频区域 -->
      <div class="video-mod">
        <div class="video-mask">
          <van-icon name="play-circle" size="40px"></van-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "studyPlanShow",
  data() {
    return {};
  },
  methods: {}
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
</style>
