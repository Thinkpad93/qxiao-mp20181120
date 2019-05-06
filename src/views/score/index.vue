<template>
  <div class="flex-page">
    <div class="flex-hd">
      <van-tabs :line-height="2" v-model="actives" @click="handleTab">
        <van-tab :title="item.title" v-for="item in tabList" :key="item.lessonId"></van-tab>
      </van-tabs>
    </div>
    <div class="flex-bd">
      <div class="score" v-for="(item, index) in list" :key="index">
        <template v-if="index === 0">
          <div class="score-content mt-20 mb-20">
            <p class="mb-20" size-17>{{ item.stageTitle }}</p>
            <div class>
              <span>班级: {{ item.scoreRank }}</span>
              <span>学校: {{ item.schoolRank }}</span>
              <span>同城: {{ item.regionRank }}</span>
            </div>
            <strong class="mt-20 mb-20">{{ item.score }}分</strong>
            <div>
              <van-button round type="info" size="small" @click="jump(item)">试卷讲解</van-button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="item flex j-c-s-b a-i-c mb-20">
            <div class="info">
              <p class="mb-20">{{ item.stageTitle }}</p>
              <a href="javascript:void(0);" @click="jump(item)">试卷讲解</a>
            </div>
            <div class="goal">{{ item.score }}分</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "score",
  data() {
    return {
      actives: 0,
      query: {
        openId: this.$store.state.user.info.openId, 
        studentId: this.$store.state.user.info.openStudentId,
        lessonId: this.$route.query.lessonId,
        page: 1,
        pageSize: 20
      },
      tabList: [],
      list: []
    };
  },
  methods: {
    handleTab() {
      let lesson = this.tabList[this.actives];
      if (lesson) {
        this.query.lessonId = lesson.lessonId;
        this.lessonScoreQuery(this.query);
      }
    },
    jump(item) {
      let { lessonId, stageId } = item;
      this.$router.push({
        path: "/examPaper",
        query: {
          lessonId,
          stageId
        }
      });
    },
    //查询课程列表
    async lessonInfoQuery() {
      let res = await service.lessonInfoQuery({});
      if (res.errorCode === 0) {
        this.tabList = res.data;
      }
    },
    //课程成绩查询列表
    async lessonScoreQuery(params = {}) {
      let res = await service.lessonScoreQuery(params);
      if (res.errorCode === 0) {
        this.list = res.data.data || [];
      }
    }
  },
  mounted() {
    this.lessonInfoQuery();
    this.lessonScoreQuery(this.query);
  }
};
</script>
<style lang="less" scoped>
.score {
  &-content {
    text-align: center;
    padding: 30px 0;
    min-height: 310px;
    background-color: #fff;
    box-shadow: 0 1px 10px 0 rgba(204, 204, 204, 0.5);

    strong {
      display: inline-block;
      font-size: 50px;
      color: #ff4d67;
    }
  }
  .item {
    margin: 0 20px;
    min-height: 120px;
    padding: 0 30px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 1px 10px 0 rgba(204, 204, 204, 0.5);
    a {
      color: #92cd36;
    }
  }
}
</style>
