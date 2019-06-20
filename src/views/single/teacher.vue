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
        <!-- <p>班级</p> -->
        <div>
          <span class="mr-10">{{ query.day }}</span>
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
              <qxChart id="homeOption" :option="homeOption"/>
              <!-- <div class="cells">
                <div class="cell circle" v-for="(item, index) in list" :key="index">
                  <div class="cell-hd">
                    <label class="label">{{ item.title }}</label>
                  </div>
                  <div class="cell-bd">
                    <van-circle
                      v-for="(items, i) in item.circle"
                      :key="i"
                      v-model="items.rate"
                      :rate="items.rate"
                      :speed="100"
                      :text="items.rate.toFixed(0) + '%'"
                      size="50px"
                      :color="items.color"
                      layer-color="#ebedf0"
                      :stroke-width="70"
                      class="ml-20"
                    ></van-circle>
                  </div>
                </div>
              </div>-->
            </div>
          </div>
        </van-tab>
        <van-tab title="在校表现"></van-tab>
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
      currentRate: 0,
      popupShow: false,
      tabActive: 0,
      query: {
        classId: this.$store.state.user.info.classId,
        day: dayjs().format("YYYY-MM-DD")
      },
      homeOption: {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center",
          show: false
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["阅读", "书法", "家务", "作息", "做作业"],
          show: false
        },
        series: [
          {
            name: "在家表现",
            type: "pie",
            radius: "75%",
            center: ["50%", "50%"],
            data: [
              { value: 33, name: "阅读" },
              { value: 10, name: "书法" },
              { value: 34, name: "家务" },
              { value: 35, name: "作息" },
              { value: 48, name: "做作业" }
            ]
          }
        ]
      }
      // list: [
      //   {
      //     count: 2,
      //     title: "阅读",
      //     circle: [
      //       {
      //         rate: 80,
      //         color: "#16d0ff"
      //       },
      //       {
      //         rate: 15,
      //         color: "#3699ff"
      //       },
      //       {
      //         rate: 13,
      //         color: "#07c160"
      //       }
      //     ]
      //   },
      //   {
      //     count: 20,
      //     title: "书法",
      //     circle: [
      //       {
      //         rate: 10,
      //         color: "#16d0ff"
      //       },
      //       {
      //         rate: 15,
      //         color: "#3699ff"
      //       },
      //       {
      //         rate: 13,
      //         color: "#07c160"
      //       }
      //     ]
      //   },
      //   {
      //     count: 42,
      //     title: "做作业",
      //     circle: [
      //       {
      //         rate: 10,
      //         color: "#16d0ff"
      //       },
      //       {
      //         rate: 15,
      //         color: "#3699ff"
      //       },
      //       {
      //         rate: 13,
      //         color: "#07c160"
      //       }
      //     ]
      //   }
      // ]
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
    handleClassConfirm(value, index) {},
    //查询在家表现
    async queryActionWithHome(params = {}) {
      let res = await service.queryActionWithHome(params);
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    //this.queryActionWithHome(this.query);
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
.circle {
  min-height: 160px;
  .cell-bd {
    text-align: right;
  }
}
</style>

