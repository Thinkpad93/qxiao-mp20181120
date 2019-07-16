<template>
  <div class="page">
    <div class="page-bd">
      <!-- 角色选择 -->
      <div class="flex a-i-c home-user gradient-two" @click="jumpRole">
        <div class="flex a-i-c">
          <div class="avatar">
            <img :src="photo" width="60" height="60" radius="50" />
          </div>
          <div class="pl-20">
            <h3 class="mb-20" size-18>{{ name }}</h3>
            <p size-12>知识是智慧的火炬</p>
          </div>
        </div>
        <van-icon name="arrow" size="16px"></van-icon>
      </div>
      <!-- 角色选择 -->
      <!-- 日期选择 1 -->
      <van-popup v-model="popupOne" position="bottom">
        <calendar :zero="true" :value="valueOne" :range="true" :lunar="true" @select="selectOne"></calendar>
      </van-popup>
      <!-- 日期选择 1 -->
      <!-- 日期选择 2 -->
      <van-popup v-model="popupTwo" position="bottom">
        <calendar :zero="true" :value="valueTwo" :range="true" :lunar="true" @select="selectTwo"></calendar>
      </van-popup>
      <!-- 日期选择 2 -->
      <!-- 周月选择 -->
      <van-popup v-model="popupWeek" position="bottom">
        <van-picker
          :columns="classList"
          show-toolbar
          value-key="className"
          @cancel="popupWeek = false"
          @confirm="handleClassConfirm"
        ></van-picker>
      </van-popup>
      <!-- 班级选择菜单 -->
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="classList"
          show-toolbar
          value-key="className"
          @cancel="popupShow = false"
          @confirm="handleClassConfirm"
        ></van-picker>
      </van-popup>
      <!-- 班级选择菜单 -->
      <div class="classId flex a-i-c j-c-s-b">
        <p>班级</p>
        <div @click="popupShow = true">
          <span class="mr-10">{{ className }}</span>
          <van-icon name="arrow-down" size="16px"></van-icon>
        </div>
      </div>
      <van-tabs v-model="tabActive" :line-height="2">
        <van-tab title="在家表现">
          <div class="container">
            <p class="pl-20 mt-30 mb-30">行为使用人数汇总</p>
            <div class="mod">
              <div class="flex j-c-c a-i-c today">
                <!-- <div class="classId flex a-i-c j-c-c" style="padding:0">
                  <div @click="popupWeek = true">
                    <span class="mr-10">月</span>
                    <van-icon name="arrow-down" size="16px"></van-icon>
                  </div>
                </div> -->
                <div class="flex a-i-c" @click="popupOne = true">
                  <time size-16>{{ query.startDate }}</time>
                  <span style="padding:0 4px;">至</span>
                  <time class="mr-20" size-16>{{ query.endDate }}</time>
                  <van-icon name="arrow-down" size="14px"></van-icon>
                </div>
              </div>
              <!-- 数据分析 -->
              <qxChart id="homeOption" height="300px" :option="homeOption" @on-click="handleClick" />
            </div>
            <p class="pl-20 mt-30 mb-30">行为详细使用分析</p>
            <div class="mod" style="padding-bottom:0">
              <!-- 数据表格 -->
              <div class="el-table">
                <table class="fixedTable" style="width:160%;">
                  <thead>
                    <tr>
                      <td>行为</td>
                      <td class="fixedColumn"></td>
                      <td>
                        <van-rate v-model="count" :size="14" :count="5" color="#09e2bb" readonly></van-rate>
                      </td>
                      <td>
                        <van-rate v-model="count" :size="14" :count="4" color="#09e2bb" readonly></van-rate>
                      </td>
                      <td>
                        <van-rate v-model="count" :size="14" :count="3" color="#09e2bb" readonly></van-rate>
                      </td>
                      <td>
                        <van-rate v-model="count" :size="14" :count="2" color="#09e2bb" readonly></van-rate>
                      </td>
                      <td>
                        <van-rate v-model="count" :size="14" :count="1" color="#09e2bb" readonly></van-rate>
                      </td>
                      <td>0星</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in actionTable" :key="index">
                      <td>{{ item.name }}</td>
                      <td class="fixedColumn"></td>
                      <td @click="jumpDetails(item, 5)">{{ item.five + '人' }}</td>
                      <td @click="jumpDetails(item, 4)">{{ item.four + '人' }}</td>
                      <td @click="jumpDetails(item, 3)">{{ item.three + '人' }}</td>
                      <td @click="jumpDetails(item, 2)">{{ item.two + '人' }}</td>
                      <td @click="jumpDetails(item, 1)">{{ item.one + '人' }}</td>
                      <td @click="jumpDetails(item, 0)">{{ item.zero + '人' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 在家表现统计 -->
            <div class="flex mt-30 mb-30" size-12>
              <div class="flex-1 text-center">
                班级总人数：
                <span style="color:#f36969">{{ actionObj.allNumber + "人" }}</span>
              </div>
              <div class="flex-1 text-center">
                使用行为人数：
                <span style="color:#f36969">{{ actionObj.userNumber + "人" }}</span>
              </div>
              <div class="flex-1 text-center">
                未使用人数：
                <span style="color:#f36969">{{ actionObj.unUser + "人" }}</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="在校表现">
          <div class="container">
            <p class="pl-20 mt-30 mb-30">手环使用人数汇总</p>
            <div class="mod" style="padding-bottom:0">
              <div class="flex j-c-c a-i-c today">
                <!-- <div class="classId flex a-i-c j-c-s-b" style="padding:0">
                  <div>
                    <span class="mr-10">月</span>
                    <van-icon name="arrow-down" size="16px"></van-icon>
                  </div>
                </div> -->
                <div class="flex a-i-c" @click="popupTwo = true">
                  <time size-16>{{ querys.startDate }}</time>
                  <span style="padding:0 4px;">至</span>
                  <time class="mr-20" size-16>{{ querys.endDate }}</time>
                  <van-icon name="arrow-down" size="14px"></van-icon>
                </div>
              </div>
              <!-- 数据表格 -->
              <div class="el-table">
                <table class="fixedTable" style="width:160%;">
                  <thead>
                    <tr>
                      <td>课程</td>
                      <td class="fixedColumn"></td>
                      <td>
                        <van-rate v-model="count" :size="14" :count="5" color="#09e2bb" readonly></van-rate>
                      </td>
                      <td>
                        <van-rate v-model="count" :size="14" :count="4" color="#09e2bb" readonly></van-rate>
                      </td>
                      <td>
                        <van-rate v-model="count" :size="14" :count="3" color="#09e2bb" readonly></van-rate>
                      </td>
                      <td>
                        <van-rate v-model="count" :size="14" :count="2" color="#09e2bb" readonly></van-rate>
                      </td>
                      <td>
                        <van-rate v-model="count" :size="14" :count="1" color="#09e2bb" readonly></van-rate>
                      </td>
                      <td>0星</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in lessonTable" :key="index">
                      <td>{{ item.name }}</td>
                      <td class="fixedColumn"></td>
                      <td @click="jumpDetails(item)">{{ item.five + '人' }}</td>
                      <td @click="jumpDetails(item)">{{ item.four + '人' }}</td>
                      <td @click="jumpDetails(item)">{{ item.three + '人' }}</td>
                      <td @click="jumpDetails(item)">{{ item.two + '人' }}</td>
                      <td @click="jumpDetails(item)">{{ item.one + '人' }}</td>
                      <td @click="jumpDetails(item)">{{ item.zero + '人' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- 在校表现统计 -->
            <div class="flex mt-30 mb-30" size-12>
              <div class="flex-1 text-center">
                班级总人数：
                <span style="color:#f36969">{{ lessonObj.allNumber + "人" }}</span>
              </div>
              <div class="flex-1 text-center">
                使用手环人数：
                <span style="color:#f36969">{{ lessonObj.userNumber + "人" }}</span>
              </div>
              <div class="flex-1 text-center">
                未使用人数：
                <span style="color:#f36969">{{ lessonObj.unUser + "人" }}</span>
              </div>
<<<<<<< HEAD
              <!-- 数据分析 -->
              <qxChart
                id="schoolOption"
                height="300px"
                :option="schoolOption"
                @on-click="handleClick"
              />
=======
>>>>>>> open-dev-190710
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="page-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import dayjs from "dayjs";
import calendar from "@/components/calendar";
import qxChart from "@/components/Myecharts";
import qxFooter from "@/components/Footer";
import classList from "@/mixins/classList";
import formatter from "@/mixins/date-formatter";
import { mapState } from "vuex";
export default {
  name: "singleTeacher",
  mixins: [classList, formatter],
  components: {
    qxChart,
    qxFooter,
    calendar
  },
  data() {
    return {
      count: 5,
      popupWeek: false,
      popupOne: false,
      popupTwo: false,
      popupShow: false, //班级选择
      tabActive: 0, //tab
      valueOne: [
        dayjs()
          .format("YYYY-MM-DD")
          .split("-"),
        dayjs()
          .format("YYYY-MM-DD")
          .split("-")
      ], //默认日期
      valueTwo: [
        dayjs()
          .format("YYYY-MM-DD")
          .split("-"),
        dayjs()
          .format("YYYY-MM-DD")
          .split("-")
      ], //默认日期
      query: {
        classId: this.$store.state.user.info.classId,
        startDate: dayjs().format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD")
      },
      querys: {
        classId: this.$store.state.user.info.classId,
        startDate: dayjs().format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD")
      },
      actionObj: {},
      lessonObj: {},
      actionTable: [], //在家表格数据
      lessonTable: [], //在校表格数据
      homeOption: {
        tooltip: {
          trigger: "item",
          triggerOn: "click",
          formatter: function(a) {
            return a["name"] + "<br/>人数: " + a["value"];
          }
        },
        legend: {
          icon: "circle",
          itemWidth: 12,
          itemHeight: 12,
          orient: "horizontal",
          left: "center",
          bottom: 0,
          data: [],
          show: true
        },
        series: [
          {
            name: "在家表现",
            type: "pie",
            hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果
            radius: "80%",
            center: ["50%", "42%"],
            data: [],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  formatter: function(a) {
                    return a["name"] + ": " + a["value"] + "人";
                  }
                }
              }
            }
          }
        ]
      },
      schoolOption: {
        tooltip: {
          trigger: "item",
          triggerOn: "click",
          formatter: function(a) {
            return (
              a["name"] +
              "<br/>优秀: " +
              a["data"].datas[0] +
              "人" +
              "<br/>良好: " +
              a["data"].datas[1] +
              "人" +
              "<br/>一般: " +
              a["data"].datas[2] +
              "人"
            );
          }
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: 0,
          data: [],
          show: true
        },
        series: [
          {
            name: "在校表现",
            type: "pie",
            radius: "80%",
            center: ["50%", "40%"],
            data: [],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  formatter: function(a) {
                    return a["name"] + ": " + a["value"] + "人";
                  }
                }
              }
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", {
      photo: state => state.info.photo,
      name: state => state.info.name,
      openId: state => state.info.openId,
      roleType: state => state.info.roleType
    }),
    className: {
      get() {
        return this.$store.state.user.info.className;
      },
      set(newValue) {
        return (this.$store.state.user.info.className = newValue);
      }
    }
  },
  methods: {
    //在家表现选择日期范围
    selectOne(begin, end) {
      //begin end (Array)
      if (begin && end) {
        this.query.startDate = begin.join("-");
        this.query.endDate = end.join("-");
        this.queryPieChart(this.query);
        this.queryActionList(this.query);
        this.queryStudentDetail(this.query);
      }
    },
    //在校表现选择日期范围
    selectTwo(begin, end) {
      if (begin && end) {
        this.querys.startDate = begin.join("-");
        this.querys.endDate = end.join("-");
        this.queryLessonInSchool(this.querys);
        this.queryLessonStudentStatistics(this.querys);
      }
    },
    //角色跳转
    jumpRole() {
      if (this.roleType != 3) {
        this.$router.push({
          path: "/role"
        });
      }
    },
<<<<<<< HEAD
    handleClick(params) {
      let tabIndex = this.tabActive;
      let { datas, value, ...args } = params.data;
      this.$router.push({
        path: "/single/view",
        query: {
          tabIndex,
          ...args,
          ...this.query
        }
      });
    },
    handleDateConfirm(value, index) {
      this.query.date = dayjs(value).format("YYYY-MM-DD");
      if (this.tabActive == 0) {
        this.queryActionWithHome(this.query);
=======
    //详情页跳转
    jumpDetails(params = {}, number = 5) {
      let obj = {};
      let tabIndex = this.tabActive;
      if (tabIndex == 0) {
        let { actionId, actionType } = params;
        obj = Object.assign({}, this.query, { tabIndex, actionId, actionType, number });
>>>>>>> open-dev-190710
      } else {
        let { lessonId } = params;
        obj = Object.assign({}, this.querys, { tabIndex, lessonId });
      }
      this.$router.push({
        path: "/single/view",
        query: obj
      });
    },
    //班级选择
    handleClassConfirm(value, index) {
      this.className = value.className;
      if (this.tabActive == 0) {
        this.query.classId = value.classId;
        this.queryPieChart(this.query);
        this.queryActionList(this.query);
        this.queryStudentDetail(this.query);
      } else {
        this.querys.classId = value.classId;
        this.queryLessonInSchool(this.querys);
        this.queryLessonStudentStatistics(this.querys);
      }
    },
    //查询在家表现（表格）
    async queryActionList(params = {}) {
      let res = await service.queryActionList(params);
      if (res.errorCode === 0) {
        this.actionTable = res.data;
      }
    },
    //查询在家表现（图表）
    async queryPieChart(params = {}) {
      let res = await service.queryPieChart(params);
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.popupOne = false;
        if (res.data.length) {
          this.homeOption.series[0].data = res.data;
          this.homeOption.legend.data = res.data.map(item => item.name);
        }
      }
    },
<<<<<<< HEAD
    //查询在校表现
    async queryLessonWithSchool(params = {}) {
      let res = await service.queryLessonWithSchool(params);
      if (res.errorCode === 0) {
        this.popupShowDate = false;
        this.popupShow = false;
        if (res.data.length) {
          this.schoolOption.series[0].data = this.analysis(res.data);
          this.schoolOption.legend.data = res.data.map(item => item.name);
        } else {
          this.schoolOption.series[0].data = [];
          this.schoolOption.legend.data = [];
        }
=======
    //使用情况（在家）
    async queryStudentDetail(params = {}) {
      let res = await service.queryStudentDetail(params);
      if (res.errorCode === 0) {
        this.actionObj = res.data;
      }
    },
    //查询在校表现（表格）
    async queryLessonInSchool(params = {}) {
      let res = await service.queryLessonInSchool(params);
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.popupTwo = false;
        this.lessonTable = res.data;
      }
    },
    //使用情况（在校）
    async queryLessonStudentStatistics(params = {}) {
      let res = await service.queryLessonStudentStatistics(params);
      if (res.errorCode === 0) {
        this.lessonObj = res.data;
>>>>>>> open-dev-190710
      }
    }
  },
  mounted() {
<<<<<<< HEAD
    this.queryActionWithHome(this.query);
    this.queryLessonWithSchool(this.query);
=======
    //在家查询
    this.queryPieChart(this.query);
    this.queryActionList(this.query);
    this.queryStudentDetail(this.query);
    //在校查询
    this.queryLessonInSchool(this.querys);
    this.queryLessonStudentStatistics(this.querys);
>>>>>>> open-dev-190710
  }
};
</script>
<style lang="less" scoped>
.home-user {
  color: #fff;
  height: 180px;
  padding: 0 30px;
  position: relative;
  justify-content: space-between;
}
.classId {
  margin-bottom: 10px;
  background-color: #fff;
}
.today {
  padding: 30px;
}
.mod {
  height: auto;
  padding-bottom: 30px;
  background-color: #fff;
  box-shadow: 0 1px 20px 0 rgba(204, 204, 204, 0.4);
}

.el-table {
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
}
.fixedTable td {
  color: #96d723;
  text-align: center;
  padding: 24px 0;
  min-width: 240px;
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  background-color: #fff;
}
.fixedTable th {
  text-align: center;
  padding: 20px 0;
}
.fixedTable td:first-child {
  color: #444;
  position: absolute;
  z-index: 3;
}
.fixedTable td:nth-child(even) {
  background-color: #fafafa;
}

.fixedColumn {
  min-width: 240px;
  border: none;
}
</style>

