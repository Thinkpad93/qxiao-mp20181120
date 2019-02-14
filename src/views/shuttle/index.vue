<template>
  <div class="page">
    <div class="page-hd"></div>
    <div class="page-bd">
      <template v-if="shuttleData.length">
        <div class="table">
          <div class="table-head">
            <div class="tr">
              <div class="th">
                <i></i>
                <span size-14>已打卡待接送</span>
              </div>
              <div class="th">
                <i></i>
                <span size-14>未打卡</span>
              </div>
              <div class="th">
                <i></i>
                <span size-14>缺勤或已接走</span>
              </div>
            </div>
          </div>
          <div class="table-body">
            <div class="tr">
              <div class="td" v-for="(item, index) in shuttleData" :key="index">
                <div>
                  <img :src="item.photo">
                  <div class>
                    <span>{{ item.studentName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cells" style="margin-top:15px;">
          <div class="cell" v-for="(item, index) in classClockData" :key="index">
            <div class="cell-hd">
              <label for class="label">
                {{ item.studentName }}
                <template v-if="item.clockFlag">已打卡</template>
                <template v-else>未打卡</template>
              </label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ item.postTime }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- 空提示 -->
        <div class="empty">
          <img src="@/assets/image/kong.png" alt>
          <p size-17>功能开发中</p>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import moment from "moment"; //
import service from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "shuttle",
  data() {
    return {
      query: {
        openId: this.$store.getters.openId,
        classId: this.$store.getters.classId,
        date: moment().format("YYYY-MM-DD")
      },
      shuttleData: [],
      classClockData: []
    };
  },
  methods: {
    //实时接送接口
    async realShuttle(params = {}) {
      let res = await service.realShuttle(params);
      if (res.errorCode === 0) {
        this.shuttleData = res.data;
      }
    },
    //查询班级当天打卡记录
    async classClockQuery() {
      let { openId, classId } = this.query;
      let res = await service.classClockQuery({ openId, classId });
      if (res.errorCode === 0) {
        this.classClockData = res.data;
      }
    }
  },
  activated() {
    this.classClockQuery();
    this.realShuttle(this.query);
  }
};
</script>
<style lang="less">
.table {
  background-color: #fff;
  .tr {
    display: flex;
    flex-wrap: wrap;
  }
}
.table-head {
  padding: 20px 0;
  .th {
    flex: 1;
    text-align: center;
    font-size: 0;
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      vertical-align: top;
      background-color: aquamarine;
    }
  }
}
.table-body {
  .td {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 200px;
    position: relative;
    text-align: center;
    background-color: #8d8d8d;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 20px;
    }
  }
}
</style>
