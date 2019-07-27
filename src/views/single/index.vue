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
          <div>
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
      <!-- dialog -->
      <!-- popup -->
      <van-popup v-model="popupShow" position="bottom">
        <van-datetime-picker
          ref="datetime"
          @cancel="popupShow = false"
          @confirm="handleShowDatePicker"
          v-model="currentDate"
          type="date"
          :formatter="formatter"
        ></van-datetime-picker>
      </van-popup>
      <!-- popup -->
      <div class="wrap">
        <!-- 用户 -->
        <div class="flex a-i-c home-user gradient-two" @click="handleRoleJump">
          <div class="flex a-i-c">
            <template v-if="name">
              <div class="avatar-circle flex a-i-c j-c-c">
                <img :src="photo" width="60" height="60" radius="50" v-if="photo" />
                <!-- 如果用户没有上传头像 -->
                <img src="@/assets/child-default@2x.png" width="60" height="60" radius="50" v-else />
              </div>
              <div class="js-user-change">
                <h3 class="mb-20" size-18>
                  {{ name }}
                  <small>Q星: {{ totalStarCount }}</small>
                </h3>
                <p size-12>您的坚持和鼓励是开启孩子好习惯的钥匙</p>
              </div>
            </template>
            <template v-else>
              <div class="avatar-circle">
                <img src="@/assets/child-default@2x.png" width="60" height="60" radius="50" />
              </div>
              <p class="ml-20">尚未有关注孩子，点击添加。</p>
            </template>
          </div>
          <van-icon name="arrow" size="16px"></van-icon>
        </div>
        <!-- 用户 -->
        <van-tabs v-model="active" :line-height="2">
          <van-tab title="在家表现">
            <div class="container">
              <div class="mod">
                <!-- 今天的 -->
                <router-link :to="{path: '/actionHistory'}" tag="div" class="action-today flex">
                  <div class="cell-bd">
                    <time size-16>{{ query.day }}</time>
                    <span>日获得Q星{{ start }}颗</span>
                  </div>
                  <div class="cell-ft">
                    <van-icon name="arrow" size="16px"></van-icon>
                  </div>
                </router-link>
                <div class="action-cells">
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
                          color="#febf56"
                          void-color="#e5eee0"
                          :readonly="rateReadonly"
                          @change="handleChangeRate(index)"
                        ></van-rate>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="empty">
                      <img src="@/assets/kong.png" alt />
                      <p class="mt-30">好的行为习惯从添加开始哟</p>
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
                    <img src="@/assets/action-icon-1@2x.png" width="20" height="20" />
                    <span class="ml-10">行为管理</span>
                  </router-link>
                  <router-link to="/prize">
                    <img src="@/assets/prize-icon-1@2x.png" width="20" height="20" />
                    <span class="ml-10">奖励兑换</span>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="mod no-radius" ref="mod">
              <div class="echarts-head flex a-i-c j-c-c mb-30">
                <span>近一周在家表现</span>
              </div>
              <!-- 一周数据分析 -->
              <qxChart id="homeStat" :option="homeOption" />
            </div>
          </van-tab>
          <van-tab title="在校表现">
            <div class="container">
              <div class="mod">
                <div class="flex j-c-c a-i-c action-today mb-30" @click="popupShow = true">
                  <div class="flex a-i-c">
                    <time class="mr-20" size-16>{{ query.day }}</time>
                    <van-icon name="arrow-down" size="14px"></van-icon>
                  </div>
                </div>
                <div class="action-table flex">
                  <div class="flex-1">课程</div>
                  <div class="flex-1 text-center">课堂表现</div>
                  <div class="flex-1 text-right">近期成绩</div>
                </div>
                <div class="action-cells">
                  <div
                    class="action-cell course flex a-i-c j-c-s-b"
                    v-for="(item, index) in lessonsList"
                    :key="index"
                  >
                    <div class="action-cell-hd">
                      <div @click="jumpExamPaper(item, index)">{{ item.title }}</div>
                      <!-- 课堂时间 -->
                      <span size-12>{{ item.startTime }}-{{ item.endTime }}</span>
                    </div>
                    <div class="action-cell-bd flex a-i-c j-c-c" @click="jumpCourseView(item)">
                      <van-rate
                        v-model="item.starCount"
                        :count="5"
                        :size="22"
                        color="#febf56"
                        void-color="#e5eee0"
                        readonly
                      ></van-rate>
                    </div>
                    <div class="action-cell-ft pr-40">
                      <span @click="jumpExamPaper(item, index)">{{ item.scoreRank }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mod no-radius">
              <div class="echarts-head flex a-i-c j-c-c mb-30">
                <span>近一周在校表现</span>
              </div>
              <!-- 一周数据分析 -->
              <qxChart id="stateMent" :option="stateMentOption" />
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
import { urlSearch } from "@/utils/urlSearch";
import service from "@/api";
import formatter from "@/mixins/date-formatter";
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
  mixins: [pageMixin, echartMixin, formatter],
  data() {
    return {
      popupShow: false,
      currentDate: new Date(),
      rateReadonly: false,
      showNumber: 0,
      active: 0,
      tabActive: 0,
      query: {
        openId: this.$store.state.user.info.openId,
        day: dayjs().format("YYYY-MM-DD")
      },
      actionView: {},
      myActions: [], //我的行为列表
      lessonsList: [],
      remark: {}
    };
  },
  computed: {
    ...mapState("user", {
      name: state => state.info.name,
      photo: state => state.info.photo,
      openId: state => state.info.openId,
      studentId: state => state.info.studentId,
      classId: state => state.info.classId,
      gradeId: state => state.info.gradeId,
      totalStarCount: state => state.info.totalStarCount,
      isBindBracelet: state => state.info.isBindBracelet, // 0未绑定手环 1绑定
      experience: state => state.info.experience,
      tel: state => state.info.tel,
      push: state => state.info.push
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
              path: "/child/add"
            });
          })
          .catch(() => {});
      }
    },
    handleRoleJump() {
      if (this.roleType == 1 || this.roleType == 2 || this.roleType == 4) {
        this.$router.push({
          path: "/role"
        });
      } else {
        this.$router.push({
          path: "/child",
          query: {
            search: "single"
          }
        });
      }
    },
    //rate事件
    async handleChangeRate(index) {
      let action = this.myActions[index];
      if (action) {
        let { studentId, actionId, actionType, starCount } = action;
        let obj = Object.assign({}, this.query, {
          studentId,
          actionId,
          actionType,
          starCount
        });
        //行为打星
        this.rateReadonly = true;
        let res = await service.actionStrike(obj);
        if (res.errorCode === 0) {
          let { totalStarCount, star } = res.data;
          this.rateReadonly = false;
          action.starCount = star;
          //更新星星数量
          let _cookie = Cookies.getJSON("info");
          let obj = Object.assign({}, _cookie, { totalStarCount });
          this.$store.dispatch("user/setInfo", obj).then(data => {
            if (data.success === "ok") {
            }
          });
        }
      }
    },
    //显示更多我的行为
    handleShowMoreActions() {
      return (this.showNumber =
        this.showNumber === this.myActions.length ? 5 : this.myActions.length);
    },
    //查看行为说明
    handleActionMore(params = {}) {
      let { title, starCount, ...args } = params;
      this.actionQuery(args);
    },
    //选择年月日
    handleShowDatePicker(value) {
      let now = dayjs(new Date(value).getTime()).format("YYYY-MM-DD");
      this.query.day = now;
      this.lessonList();
    },
    jumpExamPaper(params = {}, index = 0) {
      let gradeId = this.gradeId;
      let { lessonId } = params;
      this.$router.push({
        path: "/examPaper",
        query: {
          gradeId,
          lessonId
        }
      });
    },
    jumpCourseView(params) {
      //如果没有绑定手环
      if (this.isBindBracelet == 0) {
        this.$router.push({
          path: "/bracelet"
        });
      } else {
        this.$router.push({
          path: "/course/view",
          query: {
            title: params.title
          }
        });
      }
    },
    //行为列表查询
    async actionListQuery() {
      let obj = {
        day: this.query.day,
        studentId: this.$store.state.user.info.studentId,
        openId: this.$store.state.user.info.openId
      };
      let res = await service.actionListQuery(obj);
      if (res.errorCode === 0) {
        this.myActions = res.data.myActions;
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
    //在校表现课程列表查询(关联课程表)
    async lessonList() {
      let obj = {
        day: this.query.day,
        studentId: this.studentId,
        classId: this.classId
      };
      let res = await service.lessonList(obj);
      if (res.errorCode === 0) {
        this.lessonsList = res.data;
        this.popupShow = false;
      }
    },
    //查询最新Q星数
    async queryStar(params = {}) {
      console.log("查询最新Q星数");
      let res = await service.queryStar(params);
      if (res.errorCode === 0) {
        let _cookie = Cookies.getJSON("info");
        let totalStarCount = res.data; //Q星数
        let obj = Object.assign({}, _cookie, { totalStarCount });
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
          }
        });
      }
    }
  },
  mounted() {
    this.homeStatQuery();
    this.stateMentList();
    if (Object.keys(this.$route.query).length || this.push == "true") {
      //查询最新Q星数
      this.queryStar({ studentId: this.studentId });
    }
  },
  activated() {
    this.actionListQuery();
    this.lessonList();
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/welcome") {
      window.toast.clear();
    }
    next();
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
    margin-left: 20px;
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
  padding-bottom: 20px;
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
  text-align: center;
  padding: 30px 30px 0 30px;
}

.show-more {
  color: #999;
}

.disc {
  padding-left: 20px;
  list-style-type: disc;
}
</style>
