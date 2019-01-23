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
                <div class="">
                  <span>{{ item.studentName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cells">
          <div class="cell" v-for="(item, index) in 2" :key="index">
            <div class="cell-bd">
              <p class="cell-p">刘备已打卡</p>
            </div>
            <div class="cell-ft">16:40:20</div>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- 空提示 -->
        <div class="empty">
          <img src="@/assets/image/kong.png" alt="">
          <p size-17>功能开发中</p>
        </div>              
      </template>
    </div> 
  </div>  
</template>
<script>
import service from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "shuttle",
  data() {
    return {
      query: {
        openId: this.$store.getters.openId,
        classId: this.$store.getters.classId,
        date: "2019-01-16"
      },
      shuttleData: []
    };
  },
  methods: {
    async realShuttle(params = {}) {
      let res = await service.realShuttle(params);
      if (res.errorCode === 0) {
        this.shuttleList = res.data;
      }
    }
  },
  activated() {
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
    width: 25%;
    height: 200px;
    position: relative;
    background-color: #8d8d8d;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      border-right: 1px solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
  }
}
</style>
