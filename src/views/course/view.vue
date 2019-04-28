<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="gazelle">
        <p>小Q手环提醒你，{{ openStudentName }}本堂课的表现</p>
        <div class="mt-20 mb-20">
          <van-rate
            v-model="startCount"
            :count="5"
            :size="20"
            color="#09e2bb"
            void-color="#e5eee0"
            readonly
          ></van-rate>
        </div>
        <p>
          你可以点击
          <a href="javascript:void(0);">课程回顾</a>，回顾本堂课程知识
        </p>
      </div>
      <div class="cells-title">
        <p>小Q手环数据分析</p>
      </div>
      <div class="cells">
        <div class="cell min-100">
          <div class="cell-bd">
            <p>活跃时间</p>
          </div>
          <div class="cell-ft">15分钟</div>
        </div>
        <div class="cell min-100">
          <div class="cell-bd">
            <p>前20分钟表现</p>
          </div>
          <div class="cell-ft">A</div>
        </div>
        <div class="cell min-100">
          <div class="cell-bd">
            <p>后20分钟表现</p>
          </div>
          <div class="cell-ft">A</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "courseView",
  data() {
    return {
      startCount: 5,
      openStudentName: this.$store.state.user.info.openStudentName
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.gazelle {
  padding: 40px 0;
  text-align: center;
  background-color: #fff;
}
</style>
