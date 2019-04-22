<template>
  <div class="flex-page">
    <div class="flex-hd">
      <van-tabs :line-height="2" v-model="actives" @click="handleTab">
        <van-tab title="语文"></van-tab>
        <van-tab title="数学"></van-tab>
        <van-tab title="英语"></van-tab>
        <van-tab title="音乐"></van-tab>
        <van-tab title="美术"></van-tab>
      </van-tabs>
    </div>
    <div class="flex-bd">
      <!-- -->
      <div class="score-content mt-20 mb-20">
        <p>二年级上学期期中考试</p>
        <div class>
          <span>班级: top5%</span>
          <span>学校: top10%</span>
          <span>同城: top20%</span>
        </div>
        <strong>88分</strong>
        <div>
          <van-button round type="info" size="small">试卷讲解</van-button>
        </div>
      </div>
      <div class="score-list">
        <div class="item mb-20" v-for="(item, index) in list" :key="index">
          <div class="info">
            <p class="mb-20">{{ item.stageTitle }}</p>
            <router-link to="/examPaper">试卷讲解</router-link>
          </div>
          <div class="goal">{{ item.score }}分</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { scoreList } from "@/mock";
export default {
  name: "score",
  data() {
    return {
      actives: 0,
      list: []
    };
  },
  methods: {
    handleTab(index, title) {
      let n = Math.floor(Math.random() * 10);
      this.list = scoreList(n);
    },
    async lessonQuery(parms = {}) {
      let res = await service.lessonQuery(params);
    },
    async lessonScoreQuery(params = {}) {
      let res = await service.lessonScoreQuery(params);
    }
  },
  mounted() {
    this.list = scoreList();
  }
};
</script>
<style lang="less" scoped>
.score-content {
  min-height: 300px;
  background-color: #fff;
}
.score-list {
  padding: 0 20px;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 160px;
    padding: 0 30px;
    border-radius: 8px;
    background-color: #fff;
    a {
      color: #04b6ff;
    }
  }
}
</style>
