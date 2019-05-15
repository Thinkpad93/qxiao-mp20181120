<template>
  <div class="page">
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="myActions"
          show-toolbar
          value-key="title"
          @cancel="popupShow = false"
          @confirm="handleActionConfirm"
        ></van-picker>
      </van-popup>
      <van-popup v-model="popupShows" position="bottom">
        <van-picker
          :columns="lessonDefault"
          show-toolbar
          value-key="title"
          @cancel="popupShows = false"
          @confirm="handleLessonConfirm"
        ></van-picker>
      </van-popup>
      <!-- -->
      <div
        class="van-overlay"
        style="z-index: 900;background-color: rgba(0, 0, 0, 0);height: calc(100% - 50px)"
        @click="overlay"
        v-if="query.studentId == 0"
      ></div>
      <!-- dialog -->
      <van-dialog v-model="dialogVisible" title="查看">
        <div class="cells" style="padding:15px 0 15px 0;">
          <div class="cell">
            <div class="cell-bd">
              <div class="mt-20">
                <strong>行为说明:</strong>
                {{ actionView.textContent }}
              </div>
              <div class="flex mt-20">
                <strong>评价标准:</strong>
                <div class="ml-20">
                  <p v-for="(item, index) in actionView.rules" :key="index">
                    <span>{{ item.ruleText }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-dialog>
      <div class="wrap">
        <!-- 用户 -->
        <div class="home-user">
          <img :src="photo" width="50" height="50" radius="50">
          <div class="js-user-change">
            <p>{{ query.studentId == 0 ? '添加孩子，记录孩子成长表现': openStudentName }}</p>
          </div>
        </div>
        <van-tabs v-model="active" :line-height="2" :key="1" :lazy-render="false">
          <van-tab title="在家表现">
            <div class="container">
              <div class="mod">
                <!-- 今天的 -->
                <router-link :to="{path: '/actionHistory'}" tag="div" class="action-today">
                  <time size-16>{{ query.day }}</time>
                  <span size-16>{{ start }}颗Q星</span>
                </router-link>
                <div class="action-cells">
                  <div
                    class="action-cell flex a-i-c j-c-s-b"
                    v-for="(item, index) in myActions"
                    :key="index"
                  >
                    <div class="action-cell-bd flex a-i-c j-c-s-b">
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
                <div class="dhole flex">
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
              <div class="mod" ref="mod">
                <div class="flex a-i-c j-c-s-b mb-20">
                  <span>近一周在家表现</span>
                  <van-button
                    round
                    type="info"
                    size="small"
                    @click="popupShow = true"
                  >{{ actionDefaultText }}</van-button>
                </div>
                <!-- 一周数据分析 -->
                <div id="homeStat" style="height:300px"></div>
              </div>
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
                    class="action-cell flex a-i-c j-c-s-b"
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
                    <div class="action-cell-ft">
                      <span @click="jumpScore(item.lessonId)">{{ item.scoreRank }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mod">
                <div class="flex a-i-c j-c-s-b mb-20">
                  <span>近一周在校表现</span>
                  <van-button
                    round
                    type="info"
                    size="small"
                    @click="popupShows = true"
                  >{{ lessonDefaultText }}</van-button>
                </div>
                <!-- 一周数据分析 -->
                <div id="stateMent" style="height:300px"></div>
              </div>
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
                  <div class="flex mb-20" v-if="remark.teacherText">
                    <span>老师:</span>
                    <p class="ml-20">{{ remark.teacherText }}</p>
                  </div>
                  <div class="flex mb-20" v-if="remark.sysText">
                    <span>系统:</span>
                    <p class="ml-20">{{ remark.sysText }}</p>
                  </div>
                  <div class="remark-time">{{ remark.sysTime }}</div>
                </div>
              </div>
              <div class="snail flex j-c-s-b a-i-c mb-20">
                <div class="flex a-i-c">
                  <img src="@/assets/snail-icon@2x.png" alt width="20" height="20">
                  <div class="ml-10">竞争力(广州)</div>
                </div>
                <div class="flex a-i-c">
                  <span class="mr-10">60</span>
                  <img src="@/assets/arrow-up@2x.png" alt width="8" height="18">
                </div>
              </div>
              <div class="mod">
                <van-tabs v-model="tabActive" :line-height="2" :key="2" :lazy-render="false">
                  <van-tab title="个性分析">
                    <div class="eland">
                      <p class="mb-20">缺乏耐性急躁、好斗、说话欠考虑、三分钟热度、以自我为中心、粗枝大叶、瞻前不顾后</p>
                      <van-button round type="info" size="small" to="/myPersonality">定制个性计划</van-button>
                    </div>
                  </van-tab>
                  <van-tab title="学习分析">
                    <div class="eland">
                      <p
                        class="mb-20"
                      >思想觉悟高，积极要求进步，团结同学，尊敬师长，乐于帮助他人，文明礼貌，学习刻苦认真，成绩优异，积极参加各项活动，热爱劳动，深受师生喜爱。</p>
                      <van-button round type="info" size="small" to="/myStudy">定制学习计划</van-button>
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
import service from "@/api";
import qxFooter from "@/components/Footer";
import pageMixin from "@/mixins/page";
import dayjs from "dayjs";
import { mapState } from "vuex";
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  name: "home",
  components: {
    qxFooter
  },
  mixins: [pageMixin],
  data() {
    return {
      popupShow: false,
      popupShows: false,
      homeEcharts: null,
      mentEcharts: null,
      active: 0,
      tabActive: 0,
      query: {
        day: dayjs().format("YYYY-MM-DD")
      },
      actionView: {},
      myActions: [], //我的行为列表
      lessonList: [],
      remark: {},
      statu: 0, //今天是否已经打了
      actionDefaultText: "选择",
      lessonDefault: [],
      lessonDefaultText: "选择"
    };
  },
  computed: {
    ...mapState("user", {
      openStudentName: state => state.info.openStudentName,
      openId: state => state.info.openId,
      studentId: state => state.info.openStudentId,
      photo: state => state.info.photo
    }),
    //计算已选择的星星数
    start() {
      let n = 0;
      this.myActions.forEach(element => (n += element.starCount));
      return n;
    }
  },
  methods: {
    handleActionConfirm(value, index) {
      let { actionId, actionType, title } = value;
      this.actionDefaultText = title;
      this.homeStatQuery(actionId, actionType);
    },
    handleLessonConfirm(value, index) {
      let { lessonId, title } = value;
      this.lessonDefaultText = title;
      this.stateMentList(lessonId);
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
            let obj = Object.assign({}, this.query, {
              actionArray,
              openId: this.openId,
              studentId: this.studentId
            });
            this.actionStrike(obj);
          });
      }
    },
    //查看行为说明
    handleActionMore(params = {}) {
      let { title, starCount, ...args } = params;
      this.actionQuery(args);
    },
    jumpScore(lessonId) {
      let { openId, studentId } = this.query;
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
    initHomeStat() {
      this.$nextTick(() => {
        this.homeEcharts = echarts.init(
          document.getElementById("homeStat"),
          "light"
        );
        this.homeEcharts.setOption({
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["个人表现", "班级平均值"]
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: "value"
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          series: [
            {
              data: [],
              type: "line",
              name: "个人表现",
              stack: "总量",
              smooth: true,
              areaStyle: {}
            },
            {
              data: [],
              type: "line",
              name: "班级平均值",
              stack: "总量",
              smooth: true,
              areaStyle: {}
            }
          ]
        });
      });
    },
    initStateMent() {
      this.$nextTick(() => {
        let modWidth = this.$refs.mod.offsetWidth;
        let dom = document.getElementById("stateMent");
        dom.style.width = modWidth - 20 + "px";
        this.mentEcharts = echarts.init(dom, "light");
        this.mentEcharts.setOption({
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["个人表现", "班级平均值"]
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: "value"
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          series: [
            {
              data: [],
              type: "line",
              name: "个人表现",
              stack: "总量",
              smooth: true,
              areaStyle: {}
            },
            {
              data: [],
              type: "line",
              name: "班级平均值",
              stack: "总量",
              smooth: true,
              areaStyle: {}
            }
          ]
        });
      });
    },
    //行为打星
    async actionStrike(params = {}) {
      let res = await service.actionStrike(params);
      if (res.errorCode === 0) {
        this.actionListQuery();
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
    },
    //在家表现一周查询
    async homeStatQuery(actionId = 1, actionType = 0) {
      let params = {
        studentId: this.studentId,
        actionId,
        actionType
      };
      let res = await service.homeStatQuery(params);
      if (res.errorCode === 0) {
        this.popupShow = false;
        let data = res.data;
        this.homeEcharts.setOption({
          xAxis: {
            data: data.day
          },
          series: [
            {
              data: data.myStartCount
            },
            {
              data: data.myStartCount
            }
          ]
        });
      }
    },
    //课堂表现一周查询
    async stateMentList(lessonId = 1) {
      let params = {
        openId: this.openId,
        studentId: this.studentId,
        lessonId
      };
      let res = await service.stateMentList(params);
      if (res.errorCode === 0) {
        this.popupShows = false;
        let data = res.data;
        this.mentEcharts.setOption({
          xAxis: {
            data: data.day
          },
          series: [
            {
              data: data.myStartCount
            },
            {
              data: data.aveStartCount
            }
          ]
        });
      }
    }
  },
  mounted() {
    this.initHomeStat();
    this.initStateMent();
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
  box-shadow: 0 1px 20px 0 rgba(204, 204, 204, 0.3);
}

.action-today {
  text-align: center;
}

.action-cell {
  position: relative;
  margin: 20px 0;
  i {
    vertical-align: top;
  }

  &-bd {
    flex: 1;
  }
}
.dhole {
  > a {
    font-size: 28px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.actionView {
  p {
    display: flex;
    align-items: center;
  }
}

.snail {
  height: 80px;
  padding: 0 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 20px 0 rgba(204, 204, 204, 0.3);
}

.remark {
  border-radius: 8px;
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
    text-align: left;
  }
}
</style>
