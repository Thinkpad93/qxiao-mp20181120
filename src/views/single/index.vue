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
          <h4>行为说明: {{ actionView.textContent }}</h4>
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
        <div class="home-user" @click="toChildList">
          <img :src="photo" width="50" height="50" radius="50">
          <div class="js-user-change">
            <p>{{ query.studentId == 0 ? '添加孩子，记录孩子成长表现': openStudentName }}</p>
          </div>
        </div>
        <van-tabs v-model="active" :line-height="2">
          <van-tab title="在家表现">
            <div class="container">
              <div class="mod">
                <!-- 今天的 -->
                <router-link :to="{path: '/actionHistory'}" tag="div" class="action-today">
                  <time>{{ query.day }}</time>
                  <span>{{ start }}颗Q星</span>
                </router-link>
                <div class="action-cells">
                  <div class="action-cell" v-for="(item, index) in myActions" :key="index">
                    <!-- <div class="action-cell-hd"></div> -->
                    <div class="action-cell-bd">
                      <div class="mr-40" @click="handleActionMore(item)">
                        <span>{{ item.title }}</span>
                        <van-icon name="question-o" size="16px"></van-icon>
                      </div>
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
                  <router-link :to="{path: '/action'}">
                    <img src="@/assets/action-icon-1@2x.png" width="20" height="20">
                    <span class="ml-10">行为管理</span>
                  </router-link>
                  <router-link :to="{path: '/prize'}">
                    <img src="@/assets/prize-icon-1@2x.png" width="20" height="20">
                    <span class="ml-10">奖励兑换</span>
                  </router-link>
                </div>
              </div>
              <div class="mod">
                <!-- 一周数据分析 -->
                <ve-line :data="chartData" :settings="chartSettings"></ve-line>
              </div>
            </div>
          </van-tab>
          <van-tab title="在校表现">
            <div class="container">
              <div class="mod">
                <table style="width: 100%">
                  <tr>
                    <th>课程</th>
                    <th>课堂表现</th>
                    <th>近期成绩</th>
                  </tr>
                </table>
                <div class="action-cells">
                  <div class="action-cell" v-for="item in lessonList" :key="item.lessonId">
                    <div class="action-cell-hd">
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
                    <div class="action-cell-ft">
                      <span>{{ item.scoreRank }}%</span>
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
                <div class="remark" v-for="(item, index) in remarkList" :key="index">
                  <div class="remark-bd">
                    <div class="remark-teacher" v-if="item.remarkType == 1">
                      <span>老师:</span>
                      <p>{{ item.textContent }}</p>
                    </div>
                    <div class="remark-sys" v-if="item.remarkType == 0">
                      <span>系统:</span>
                      <p>{{ item.textContent }}</p>
                    </div>
                    <div class="remark-time">{{ item.postTime }}</div>
                  </div>
                </div>
              </div>
              <div class="snail mb-20">
                <div class="snail-left">
                  <img src="@/assets/snail-icon@2x.png" alt width="20" height="20">
                  <div class="ml-10">竞争力(广州)</div>
                </div>
                <div class="snail-right">
                  <span class="mr-10">60</span>
                  <img src="@/assets/arrow-up@2x.png" alt width="8" height="18">
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
import { lessonList, remarkList } from "@/mock";
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
      openStudentName: this.$store.state.user.info.openStudentName,
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.openStudentId,
        day: dayjs().format("YYYY-MM-DD")
      },
      actionView: {},
      myActions: [], //我的行为列表
      lessonList: [],
      remarkList: [],
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
    toChildList() {
      this.$router.push({
        path: "/child"
      });
    },
    overlay() {
      if (this.query.studentId == 0) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "添加孩子信息，才能记录成长表现哦"
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
    this.lessonList = lessonList();
    this.remarkList = remarkList(2);
  }
};
</script>
<style lang="less" scoped>
.home-user {
  display: flex;
  align-items: center;
  padding: 30px 30px 20px 30px;
  background-color: #fff;
  .js-user-change {
    margin-left: 30px;
  }
}
.container {
  padding: 20px;
}
.mod {
  height: auto;
  padding: 20px;
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
  i {
    vertical-align: top;
  }

  &-bd {
    flex: 1;
    display: flex;
    align-items: center;
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
  padding: 0 20px;
  display: flex;
  align-items: center;
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

.remark {
  margin-bottom: 20px;
  text-align: justify;
  background-color: #fff;
  &-teacher {
    display: flex;
    margin-bottom: 30px;
  }
  &-sys {
    display: flex;
  }
  &-time {
    color: #b5b5b5;
    text-align: right;
  }
  span {
    display: inline-block;
    margin-right: 20px;
  }
  p {
    flex: 1;
    line-height: 1.4;
  }
}
</style>
