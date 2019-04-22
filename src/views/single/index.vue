<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- -->
      <div
        class="van-overlay"
        style="z-index: 900;background-color: rgba(0, 0, 0, 0);height: calc(100% - 50px)"
        @click="overlay"
        v-if="query.studentId == 0"
      ></div>
      <!-- dialog -->
      <van-dialog v-model="dialogVisible" title="行为说明">
        <div class="actionView">
          <h4>{{ actionView.textContent }}</h4>
          <p v-for="(item, index) in actionView.rules" :key="index">
            <span>{{ item.ruleText }}</span>
            <van-rate
              v-model="item.stressFlag"
              color="#f44"
              void-color="#eee"
              readonly
              :count="1"
              v-if="item.stressFlag"
            />
          </p>
        </div>
      </van-dialog>
      <div class="wrap">
        <!-- 用户 -->
        <div class="home-user">
          <img :src="photo" width="50" height="50" radius="50">
          <div class="js-user-change">
            <p class="ml-10">添加孩子，记录孩子成长表现</p>
          </div>
        </div>
        <van-tabs v-model="active" :line-height="2">
          <van-tab title="在家表现">
            <div class="container">
              <div class="mod">
                <!-- 今天的 -->
                <router-link
                  :to="{path: '/actionHistory', query: this.$route.query}"
                  tag="div"
                  class="action-today"
                >
                  <time>{{ query.day }}</time>
                  <span>{{ start }}颗Q星</span>
                </router-link>
                <div class="action-cells">
                  <div class="action-cell" v-for="(item, index) in myActions" :key="index">
                    <div class="action-cell-hd">
                      <span @click="handleActionMore(item)">
                        {{ item.title }}
                        <van-icon name="question-o" size="16px"></van-icon>
                      </span>
                    </div>
                    <div class="action-cell-bd">
                      <van-rate
                        v-model="item.starCount"
                        :count="5"
                        :size="22"
                        color="#09e2bb"
                        void-color="#e5eee0"
                        :readonly="statu === 1"
                        @change="handleChangeRate"
                      ></van-rate>
                    </div>
                  </div>
                </div>
                <div class="dhole">
                  <router-link :to="{path: '/action', query: this.$route.query}">
                    <img src="@/assets/action-icon-1@2x.png" width="20" height="20">
                    <span class="ml-10">行为管理</span>
                  </router-link>
                  <router-link :to="{path: '/prize', query: this.$route.query}">
                    <img src="@/assets/prize-icon-1@2x.png" width="20" height="20">
                    <span class="ml-10">奖励兑换</span>
                  </router-link>
                </div>
              </div>
              <div class="mod">
                <!-- 一周数据分析 -->
                <!-- <ve-line :data="chartData" :settings="chartSettings"></ve-line> -->
              </div>
            </div>
          </van-tab>
          <van-tab title="在校表现">
            <div class="container">
              <div class="mod">
                <div class="action-today">
                  <time>{{ query.day }}</time>
                </div>
                <div class="action-cells">
                  <div class="action-cell" v-for="item in lessonList" :key="item.lessonId">
                    <div class="hd">
                      <span>{{ item.title }}</span>
                    </div>
                    <div class="action-cell-bd">
                      <van-rate
                        v-model="item.startCount"
                        :count="5"
                        :size="22"
                        color="#09e2bb"
                        void-color="#e5eee0"
                        readonly
                      ></van-rate>
                    </div>
                    <div class="ft">
                      <span>{{ item.scoreRank }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mod">
                <!-- 一周数据分析 -->
                <ve-line :data="chartData" :settings="chartSettings"></ve-line>
              </div>
            </div>
          </van-tab>
          <van-tab title="成长分析">
            <div class="container">
              <div class="mod">
                <div class="remark">
                  <div class="remark-cell">
                    <p>孩子好奇心旺盛，对周围一切新奇刺激的玩意都充满着无止境的探索欲望，极具意象色彩的人，总是在某个角落弹奏着恰好好处的弦律。</p>
                  </div>
                  <div class="remark-cell">
                    <p>好好学习，天天向上! 一切皆有可能。</p>
                  </div>
                </div>
              </div>
              <div class="mod">
                <div class="snail">
                  <div class="snail-left">
                    <img src="@/assets/snail-icon@2x.png" alt width="20" height="20">
                    <div class="ml-10">竞争力(广州)</div>
                  </div>
                  <div class="snail-right">
                    <span class="mr-10">60</span>
                    <img src="@/assets/arrow-up@2x.png" alt width="8" height="18">
                  </div>
                </div>
              </div>
              <div class="mod">
                <van-tabs v-model="actives">
                  <van-tab title="个性分析">
                    <p>缺乏耐性急躁、好斗、说话欠考虑、三分钟热度、以自我为中心、粗枝大叶、瞻前不顾后</p>
                  </van-tab>
                  <van-tab title="学习分析"></van-tab>
                </van-tabs>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="flex-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import qxFooter from "@/components/Footer";
import pageMixin from "@/mixins/page";
import dayjs from "dayjs";
export default {
  name: "home",
  components: {
    qxFooter
  },
  mixins: [pageMixin],
  data() {
    return {
      active: 0,
      actives: 0,
      chartSettings: {
        metrics: ["访问用户", "下单用户"],
        dimension: ["日期"]
      },
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      photo: this.$store.state.user.info.photo,
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.openStudentId,
        day: dayjs().format("YYYY-MM-DD")
      },
      actionView: {},
      myActions: [], //我的行为列表
      lessonList: [
        {
          title: "语文",
          lessonId: 1,
          startCount: 2,
          scoreRank: 5
        },
        {
          title: "数学",
          lessonId: 2,
          startCount: 5,
          scoreRank: 80
        }
      ],
      statu: 0 //今天是否已经打了
    };
  },
  computed: {
    //计算已选择的星星数
    start() {
      let n = 0;
      this.myActions.forEach(element => (n += element.starCount));
      return n;
    }
  },
  methods: {
    overlay() {
      if (this.query.studentId == 0) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "请先添加孩子哦"
          })
          .then(() => {
            this.$router.push({
              path: "/child"
            });
          })
          .catch(() => {});
      }
    },
    //rate事件
    handleChangeRate(count) {
      let flag = false;
      let len = this.myActions.length;
      let actionArray = [];
      this.myActions.forEach(element => {
        let { starCount, ...args } = element;
        //说明该行为已经打了
        if (starCount != 0) {
          flag = true;
          len -= 1;
        }
      });
      if (flag && len === 0) {
        this.myActions.forEach(element => {
          let { starCount, actionId, actionType } = element;
          if (starCount != 0) {
            actionArray.push({ starCount, actionId, actionType });
          }
        });
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定完成评价？确定后无法更改"
          })
          .then(() => {
            let obj = Object.assign({}, this.query, { actionArray });
            this.actionStrike(obj);
          });
      }
    },
    //查看行为说明
    handleActionMore(params = {}) {
      let { title, starCount, ...args } = params;
      this.actionQuery(args);
    },
    //行为打星
    async actionStrike(params = {}) {
      let res = await service.actionStrike(params);
      if (res.errorCode === 0) {
        this.actionListQuery(this.query);
      }
    },
    //行为列表查询
    async actionListQuery(params = {}) {
      let res = await service.actionListQuery(params);
      if (res.errorCode === 0) {
        this.myActions = res.data.myActions;
        this.statu = res.data.statu;
      }
    },
    //按行为查询已选中的规则
    async actionQuery(params = {}) {
      let res = await service.actionQuery(params);
      if (res.errorCode === 0) {
        this.dialogVisible = true;
        this.actionView = res.data;
      }
    },
    //学生课程列表查询
    async lessonQuery(params = {}) {
      let res = await service.lessonQuery(params);
      if (res.errorCode === 0) {
        this.lessonList = res.data;
      }
    },
    //在家表现一周查询
    async homeStatQuery(params = {}) {
      let res = await service.homeStatQuery(params);
    },
    //课堂表现一周查询
    async lessonStatQuery(params = {}) {
      let res = await service.lessonStatQuery(params);
    }
  },
  mounted() {
    this.actionListQuery(this.query);
    //this.lessonQuery(this.query);
  }
};
</script>
<style lang="less" scoped>
.home-user {
  display: flex;
  align-items: center;
  padding: 30px 30px 40px 30px;
  background-color: #fff;
}
.container {
  padding: 20px;
}
.mod {
  height: auto;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #fff;
}

.action-today {
  text-align: center;
}

.action-cells {
  min-height: 200px;
}

.action-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 20px 0;
  &-hd {
    min-width: 200px;
  }
  &-bd {
    flex: 1;
    display: flex;
    justify-content: center;
  }
}
.dhole {
  display: flex;
  > a {
    font-size: 28px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.actionView {
  padding: 30px;
  p {
    display: flex;
    align-items: center;
  }
}

.snail {
  height: 80px;
  width: calc(100% - 60px);
  display: flex;
  margin: 30px auto;
  align-items: center;
  padding: 0 20px;
  border-radius: 8px;
  justify-content: space-between;
  background-color: #fff;
  &-left {
    display: flex;
    align-items: center;
  }
  &-right {
    display: flex;
    align-items: center;
  }
}
</style>
