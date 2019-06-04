<template>
  <div class="page">
    <div class="page-bd">
      <div
        class="van-overlay"
        style="z-index: 900;background-color: rgba(0, 0, 0, 0);height: calc(100% - 50px)"
        @click="overlay"
        v-if="studentId == 0"
      ></div>
      <!-- dialog -->
      <van-dialog v-model="dialogVisible">
        <div class="actionView">
          <div class="flex">
            <strong>行为说明:</strong>
            <div class="ml-20">{{ actionView.textContent }}</div>
          </div>
          <div class>
            <strong>评价标准</strong>
            <ul class="ml-20 disc">
              <li v-for="(item, index) in actionView.rules" :key="index">{{ item.ruleText }}</li>
            </ul>
          </div>
        </div>
      </van-dialog>
      <div class="wrap">
        <!-- 用户 -->
        <router-link to="/child" tag="div" class="home-user gradient-two">
          <div class="flex a-i-c">
            <template v-if="openStudentName">
              <img :src="openPhoto" width="60" height="60" radius="50" v-if="openPhoto">
              <!-- 如果用户没有上传头像 -->
              <img src="@/assets/child-default@2x.png" width="60" height="60" radius="50" v-else>
              <div class="js-user-change">
                <h3 class="mb-20" size-18>
                  {{ openStudentName }}
                  <small>Q星: {{ totalStarCount }}</small>
                </h3>
                <p size-12>行动养成习惯，习惯形成性格。</p>
              </div>
            </template>
            <template v-else>
              <img src="@/assets/child-default@2x.png" width="60" height="60" radius="50">
              <p class="ml-20">尚未有关注孩子，点击添加。</p>
            </template>
          </div>
          <van-icon name="arrow" size="16px"></van-icon>
        </router-link>
        <van-tabs v-model="active" :line-height="2">
          <van-tab title="在家表现">
            <div class="container">
              <div class="mod">
                <!-- 今天的 -->
                <router-link :to="{path: '/actionHistory'}" tag="div" class="action-today flex">
                  <div class="cell-bd">
                    <time size-16>{{ query.day }}</time>
                    <span>今日表现{{ start }}颗Q星</span>
                  </div>
                  <div class="cell-ft">
                    <van-icon name="arrow" size="16px"></van-icon>
                  </div>
                </router-link>
                <div class="action-cells" @click.stop="handleStatus">
                  <!-- 无数据提示 -->
                  <template v-if="myActions.length">
                    <div
                      class="action-cell flex a-i-c j-c-s-b"
                      v-for="(item, index) in myActions.slice(0, showNumber)"
                      :key="index"
                    >
                      <div class="action-cell-bd flex a-i-c j-c-s-b">
                        <div class="action-cell-label" @click.stop="handleActionMore(item)">
                          <span>{{ item.title }}</span>
                        </div>
                        <van-rate
                          class="action-cell-rate"
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
                  </template>
                  <template v-else>
                    <div class="bracelets">
                      <img src="@/assets/action@2x.png">
                      <p class="mt-30">好的行为习惯从添加开始哟~</p>
                    </div>
                  </template>
                </div>
                <!-- 查看更多 -->
                <div
                  class="flex j-c-c mb-30 show-more"
                  @click="handleShowMoreActions"
                  v-if="myActions.length > 5"
                >
                  <template v-if="showNumber == 5">
                    <van-icon name="arrow-down" size="14px"></van-icon>
                    <span class="ml-10">点击展开更多</span>
                  </template>
                  <template v-else>
                    <van-icon name="arrow-up" size="14px"></van-icon>
                    <span class="ml-10">点击收起</span>
                  </template>
                </div>
                <div class="dhole flex">
                  <router-link to="/action">
                    <img src="@/assets/action-icon-1@2x.png" width="20" height="20">
                    <span class="ml-10">行为管理</span>
                  </router-link>
                  <router-link to="/prize">
                    <img src="@/assets/prize-icon-1@2x.png" width="20" height="20">
                    <span class="ml-10">奖励兑换</span>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="mod no-radius" ref="mod">
              <div class="echarts-head flex a-i-c j-c-s-b mb-20">
                <span>近一周在家表现</span>
              </div>
              <!-- 一周数据分析 -->
              <qxChart id="homeStat" :option="homeOption"/>
            </div>
          </van-tab>
          <van-tab title="在校表现">
            <div class="container">
              <div class="mod">
                <div class="action-today mb-20">
                  <time size-16>{{ query.day }}</time>
                </div>
                <div class="action-table flex">
                  <div class="flex-1 f-w">课程</div>
                  <div class="flex-1 text-center f-w">课堂表现</div>
                  <div class="flex-1 text-right f-w">近期成绩</div>
                </div>
                <div class="action-cells">
                  <div
                    class="action-cell course flex a-i-c j-c-s-b"
                    v-for="item in lessonList"
                    :key="item.lessonId"
                  >
                    <div class="action-cell-hd">
                      <span @click="jumpScore(item.lessonId)">{{ item.title }}</span>
                    </div>
                    <div class="action-cell-bd flex a-i-c j-c-c" @click="jumpCourseView">
                      <van-rate
                        v-model="item.starCount"
                        :count="5"
                        :size="22"
                        color="#09e2bb"
                        void-color="#e5eee0"
                        readonly
                      ></van-rate>
                    </div>
                    <div class="action-cell-ft pr-40">
                      <span @click="jumpScore(item.lessonId)">{{ item.scoreRank }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mod no-radius">
              <div class="echarts-head flex a-i-c j-c-s-b mb-20">
                <span>近一周在校表现</span>
              </div>
              <!-- 一周数据分析 -->
              <qxChart id="stateMent" :option="stateMentOption"/>
            </div>
          </van-tab>
          <van-tab title="成长分析">
            <div class="container">
              <div class="remark">
                <div class="remark-hd flex j-c-s-b a-i-c">
                  <div class="remark-left flex a-i-c">
                    <img src="@/assets/remark-icon@2x.png" width="20" height="20">
                    <span class="ml-10">评语</span>
                  </div>
                  <router-link to="/remark" tag="div" class="remark-right flex a-i-c">
                    <span>往期评语</span>
                    <van-icon name="arrow" size="16px"></van-icon>
                  </router-link>
                </div>
                <div class="remark-bd">
                  <!-- 没有数据展示 -->
                  <template v-if="Object.keys(remark).length">
                    <div class="flex mb-20">
                      <span>老师:</span>
                      <p class="ml-20">{{ remark.teacherText }}</p>
                    </div>
                    <div class="flex mb-20">
                      <span>系统:</span>
                      <p class="ml-20">{{ remark.sysText }}</p>
                    </div>
                    <div class="remark-time">{{ remark.sysTime }}</div>
                  </template>
                  <template v-else>
                    <p class="text-center mt-30 mb-30">您暂时还没有评语哦~</p>
                  </template>
                </div>
              </div>
              <div class="snail flex j-c-s-b a-i-c mb-20">
                <div class="flex a-i-c">
                  <img src="@/assets/snail-icon@2x.png" alt width="20" height="20">
                  <div class="ml-10">竞争力(广州)</div>
                </div>
                <div class="flex a-i-c">
                  <span class="mr-10">80</span>
                  <img src="@/assets/arrow-up@2x.png" alt width="8" height="18">
                </div>
              </div>
              <div class="mod">
                <van-tabs v-model="tabActive" :line-height="2">
                  <van-tab title="个性分析">
                    <div class="eland">
                      <p class="mt-10">缺乏耐性急躁、好斗、说话欠考虑、三分钟热度、以自我为中心、粗枝大叶、瞻前不顾后</p>
                      <van-button
                        round
                        type="info"
                        size="small"
                        to="/personality-plan"
                        style="width:200px;"
                      >定制个性计划</van-button>
                    </div>
                  </van-tab>
                  <van-tab title="学习分析">
                    <div class="eland">
                      <p
                        class="mt-10"
                      >思想觉悟高，积极要求进步，团结同学，尊敬师长，乐于帮助他人，文明礼貌，学习刻苦认真，成绩优异，积极参加各项活动，热爱劳动，深受师生喜爱。</p>
                      <van-button
                        round
                        type="info"
                        size="small"
                        to="/study-plan"
                        style="width:200px;"
                      >定制学习计划</van-button>
                    </div>
                  </van-tab>
                </van-tabs>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="page-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import qxFooter from "@/components/Footer";
import qxChart from "@/components/Myecharts";
import pageMixin from "@/mixins/page";
import echartMixin from "@/mixins/echarts";
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "home",
  components: {
    qxFooter,
    qxChart
  },
  mixins: [pageMixin, echartMixin],
  data() {
    return {
      showNumber: 0,
      active: 0,
      tabActive: 0,
      query: {
        day: dayjs().format("YYYY-MM-DD")
      },
      actionView: {},
      myActions: [], //我的行为列表
      lessonList: [],
      remark: {},
      statu: 0 //今天是否已经打了
    };
  },
  computed: {
    ...mapState("user", {
      openStudentName: state => state.info.openStudentName,
      openPhoto: state => state.info.openPhoto,
      openId: state => state.info.openId,
      studentId: state => state.info.openStudentId,
      totalStarCount: state => state.info.totalStarCount
    }),
    //计算已选择的星星数
    start() {
      let n = 0;
      this.myActions.forEach(element => (n += element.starCount));
      return n;
    }
  },
  methods: {
    overlay() {
      if (this.studentId == 0) {
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
    //
    handleStatus() {
      //今天已经打过星星
      if (this.statu == 1) {
        this.$dialog
          .alert({
            title: "提示",
            message: "今天已经评价过啦，明天继续坚持~"
          })
          .then(() => {
            // on close
          });
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
            message: "今天又向前跨一步了，提交无法更改哦~"
          })
          .then(() => {
            let obj = Object.assign({}, this.query, {
              actionArray,
              openId: this.openId,
              studentId: this.studentId
            });
            this.actionStrike(obj);
          });
      }
    },
    //显示更多我的行为
    handleShowMoreActions() {
      if (this.showNumber === this.myActions.length) {
        this.showNumber = 5;
      } else {
        this.showNumber = this.myActions.length;
      }
    },
    //查看行为说明
    handleActionMore(params = {}) {
      let { title, starCount, ...args } = params;
      this.actionQuery(args);
    },
    jumpScore(lessonId) {
      this.$router.push({
        path: "/score",
        query: {
          lessonId
        }
      });
    },
    jumpCourseView() {
      this.$router.push({
        path: "/course/view"
      });
    },
    //行为打星
    async actionStrike(params = {}) {
      let res = await service.actionStrike(params);
      if (res.errorCode === 0) {
        let { totalStarCount, statu } = res.data;
        this.statu = statu;
        //更新星星数量
        //this.actionListQuery();
        let _cookie = Cookies.getJSON("info");
        let obj = Object.assign({}, _cookie, { totalStarCount });
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
          }
        });
      }
    },
    //行为列表查询
    async actionListQuery() {
      let obj = {
        day: this.query.day,
        studentId: this.studentId,
        openId: this.openId
      };
      let res = await service.actionListQuery(obj);
      if (res.errorCode === 0) {
        this.myActions = res.data.myActions;
        this.statu = res.data.statu;
        this.showNumber = this.myActions.length;
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
    async lessonQuery() {
      let obj = {
        day: this.query.day,
        studentId: this.studentId,
        openId: this.openId
      };
      let res = await service.lessonQuery(obj);
      if (res.errorCode === 0) {
        this.lessonList = res.data;
      }
    },
    //最新评语
    async newRemarkQuery() {
      let res = await service.newRemarkQuery({
        openId: this.openId,
        studentId: this.studentId
      });
      if (res.errorCode === 0) {
        this.remark = res.data || {};
      }
    },
    //查询课程列表
    async lessonInfoQuery(params = {}) {
      let res = await service.lessonInfoQuery(params);
      if (res.errorCode === 0) {
        this.lessonDefault = res.data;
      }
    }
  },
  mounted() {
    this.homeStatQuery();
    this.stateMentList();
    this.newRemarkQuery();
    this.lessonInfoQuery();
  },
  activated() {
    this.actionListQuery();
    this.lessonQuery();
  }
};
</script>
<style lang="less" scoped>
.home-user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 180px;
  padding: 0 30px;
  color: #fff;
  .js-user-change {
    margin-left: 30px;
  }
}
.container {
  padding: 30px;
}
.mod {
  height: auto;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 1px 20px 0 rgba(204, 204, 204, 0.4);
}
.action-table {
  padding: 0 30px;
}
.action-today {
  text-align: center;
  padding: 30px 20px 0 20px;
  i {
    color: #999;
  }
}
.action-cells {
  padding: 20px 0;
}
.course {
  padding: 0 30px;
}
.action-cell {
  position: relative;
  margin: 30px 0;
  i {
    vertical-align: top;
  }
  &-bd {
    flex: 1;
  }
  &-label {
    margin-left: 75px;
  }
  &-rate {
    margin-right: 130px;
  }
}
.dhole {
  min-height: 100px;
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
  line-height: 1.6;
}

.snail {
  height: 80px;
  padding: 0 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 1px 20px 0 rgba(204, 204, 204, 0.3);
}

.remark {
  border-radius: 20px;
  margin-bottom: 20px;
  text-align: justify;
  background-color: #fff;
  box-shadow: 0 1px 20px 0 rgba(204, 204, 204, 0.3);
  &-hd {
    height: 80px;
    padding: 0 20px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
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
  &-right {
    color: #7d7e80;
  }
  &-bd {
    padding: 30px;
    min-height: 120px;
  }
  &-time {
    color: #b5b5b5;
    text-align: right;
  }
  span {
    display: inline-block;
  }
  p {
    flex: 1;
    line-height: 1.4;
  }
}

.eland {
  padding: 30px;
  text-align: center;
  p {
    margin-bottom: 60px;
    text-align: left;
    line-height: 1.6;
  }
}

.echarts-head {
  padding: 30px 30px 0 30px;
}

.show-more {
  color: #999;
}

.bracelets {
  padding: 70px 0;
  color: #999;
  text-align: center;
  img {
    width: 366px;
    height: 204px;
  }
}

.disc {
  padding-left: 20px;
  list-style-type: disc;
}
</style>
