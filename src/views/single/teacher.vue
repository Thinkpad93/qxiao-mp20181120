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
      <!-- 日期选择 -->
      <van-popup v-model="popupShowDate" position="bottom">
        <van-datetime-picker
          v-model="startDate"
          type="date"
          @cancel="popupShowDate = false"
          @confirm="handleDateConfirm"
          :formatter="formatter"
        ></van-datetime-picker>
      </van-popup>
      <!-- 日期选择 -->
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
            <p>行为使用人数汇总</p>
            <div class="mod">
              <div class="flex j-c-c a-i-c today" @click="popupShowDate = true">
                <time class="mr-20" size-16>{{ query.date }}</time>
                <van-icon name="arrow-down" size="14px"></van-icon>
              </div>
              <!-- 数据分析 -->
              <qxChart id="homeOption" height="300px" :option="homeOption" />
            </div>
            <p>行为详细使用分析</p>
          </div>
        </van-tab>
        <van-tab title="在校表现">
          <div class="container">
            <div class="mod">
              <div class="flex j-c-c a-i-c today" @click="popupShowDate = true">
                <time class="mr-20" size-16>{{ query.date }}</time>
                <van-icon name="arrow-down" size="14px"></van-icon>
              </div>
              <!-- 数据分析 -->
              <!-- <qxChart id="schoolOption" height="300px" :option="schoolOption" /> -->
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
    qxFooter
  },
  data() {
    return {
      popupShowDate: false,
      popupShow: false,
      startDate: new Date(),
      tabActive: 0,
      query: {
        classId: this.$store.state.user.info.classId,
        date: dayjs().format("YYYY-MM-DD")
      },
      roleList: [],
      homeOption: {
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
      }
      // schoolOption: {
      //   tooltip: {
      //     trigger: "item",
      //     triggerOn: "click",
      //     formatter: function(a) {
      //       return (
      //         a["name"] +
      //         "<br/>优秀: " +
      //         a["data"].datas[0] +
      //         "人" +
      //         "<br/>良好: " +
      //         a["data"].datas[1] +
      //         "人" +
      //         "<br/>一般: " +
      //         a["data"].datas[2] +
      //         "人"
      //       );
      //     }
      //   },
      //   legend: {
      //     orient: "horizontal",
      //     left: "center",
      //     bottom: 0,
      //     data: [],
      //     show: true
      //   },
      //   series: [
      //     {
      //       name: "在校表现",
      //       type: "pie",
      //       radius: "80%",
      //       center: ["50%", "40%"],
      //       data: [],
      //       itemStyle: {
      //         normal: {
      //           label: {
      //             show: true,
      //             position: "inside",
      //             formatter: function(a) {
      //               return a["name"] + ": " + a["value"] + "人";
      //             }
      //           }
      //         }
      //       }
      //     }
      //   ]
      // }
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
    //角色跳转
    jumpRole() {
      if (this.roleType == 1 || this.roleType == 2 || this.roleType == 4) {
        this.$router.push({
          path: "/role"
        });
      }
    },
    handleDateConfirm(value, index) {
      this.query.date = dayjs(value).format("YYYY-MM-DD");
      if (this.tabActive == 0) {
        this.queryActionWithHome(this.query);
      } else {
        this.queryLessonWithSchool(this.query);
      }
    },
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      if (this.tabActive == 0) {
        this.queryActionWithHome(this.query);
      } else {
        this.queryLessonWithSchool(this.query);
      }
    },
    analysis(data) {
      var end_obj = [];
      for (var i in data) {
        var obj = { name: "", datas: [] };
        obj.name = data[i].name;
        obj.value = data[i]["count"];
        obj.id = data[i]["id"];
        obj.actionType = data[i]["actionType"];
        obj.datas[0] = data[i]["excellent"]; // 优秀
        obj.datas[1] = data[i]["good"]; // 良好
        obj.datas[2] = data[i]["ordinary"]; // 一般
        end_obj.push(obj);
      }
      return end_obj;
    },
    //查询在家表现
    async queryActionWithHome(params = {}) {
      let res = await service.queryActionWithHome(params);
      if (res.errorCode === 0) {
        this.popupShowDate = false;
        this.popupShow = false;
        if (res.data.length) {
          this.homeOption.series[0].data = this.analysis(res.data);
          this.homeOption.legend.data = res.data.map(item => item.name);
        } else {
          this.homeOption.series[0].data = [];
          this.homeOption.legend.data = [];
        }
      }
    }
    //查询在校表现
    // async queryLessonWithSchool(params = {}) {
    //   let res = await service.queryLessonWithSchool(params);
    //   if (res.errorCode === 0) {
    //     this.popupShowDate = false;
    //     this.popupShow = false;
    //     if (res.data.length) {
    //       this.schoolOption.series[0].data = this.analysis(res.data);
    //       this.schoolOption.legend.data = res.data.map(item => item.name);
    //     } else {
    //       this.schoolOption.series[0].data = [];
    //       this.schoolOption.legend.data = [];
    //     }
    //   }
    // }
  },
  mounted() {
    this.queryActionWithHome(this.query);
    //this.queryLessonWithSchool(this.query);
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
  padding: 30px 0 30px 0;
}
.container {
  margin-top: 10px;
}
.mod {
  height: auto;
  padding-bottom: 30px;
  background-color: #fff;
  box-shadow: 0 1px 20px 0 rgba(204, 204, 204, 0.4);
}
</style>

