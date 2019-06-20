<template>
  <div class="page">
    <div class="page-bd">
      <!-- 角色选择 -->
      <div class="flex a-i-c home-user gradient-two">
        <div class="flex a-i-c">
          <div class="avatar">
            <img :src="photo" width="60" height="60" radius="50">
          </div>
          <div class="pl-20">
            <h3 class="mb-20" size-18>{{ name }}</h3>
            <p size-12>知识是智慧的火炬</p>
          </div>
        </div>
      </div>
      <!-- 角色选择 -->
      <!-- 日期选择 -->
      <van-popup v-model="popupShowDate" position="bottom">
        <van-datetime-picker
          v-model="startDate"
          type="date"
          @cancel="popupShowDate = false"
          @confirm="handleDateConfirm"
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
        <div @click="popupShowDate = true">
          <span class="mr-10">{{ query.date }}</span>
          <van-icon name="arrow-down" size="16px"></van-icon>
        </div>
        <div @click="popupShow = true">
          <span class="mr-10">{{ className }}</span>
          <van-icon name="arrow-down" size="16px"></van-icon>
        </div>
      </div>
      <van-tabs v-model="tabActive" :line-height="2">
        <van-tab title="在家表现">
          <div class="container">
            <div class="mod">
              <!-- 数据分析 -->
              <qxChart id="homeOption" :option="homeOption" @on-click="handleClick"/>
            </div>
          </div>
        </van-tab>
        <van-tab title="在校表现">
          <div class="container">
            <!-- 数据分析 -->
            <div class="mod">
              <qxChart id="schoolOption" :option="schoolOption" @on-click="handleClick"/>
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
import Cookies from "js-cookie";
import service from "@/api";
import dayjs from "dayjs";
import qxChart from "@/components/Myecharts";
import qxFooter from "@/components/Footer";
import classList from "@/mixins/classList";
import { mapState } from "vuex";
export default {
  name: "singleTeacher",
  mixins: [classList],
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
        series: [
          {
            name: "在家表现",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            data: []
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
        series: [
          {
            name: "在校表现",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            data: []
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", {
      photo: state => state.info.photo,
      name: state => state.info.name,
      openId: state => state.info.openId
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
    handleClick(params) {
      //tab
      let tabIndex = this.tabActive;
      //行为Id
      let id = params.data.id;
      this.$router.push({
        path: "/single/view",
        query: {
          id,
          tabIndex,
          ...this.query
        }
      });
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
        obj.datas[0] = data[i]["excellent"]; // 优秀
        obj.datas[1] = data[i]["ordinary"]; // 一般
        obj.datas[2] = data[i]["good"]; // 良好
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
        this.homeOption.series[0].data = this.analysis(res.data);
      }
    },
    //查询在校表现
    async queryLessonWithSchool(params = {}) {
      let res = await service.queryLessonWithSchool(params);
      if (res.errorCode === 0) {
        this.popupShowDate = false;
        this.popupShow = false;
        this.schoolOption.series[0].data = this.analysis(res.data);
      }
    }
  },
  mounted() {
    this.queryActionWithHome(this.query);
    this.queryLessonWithSchool(this.query);
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
</style>

