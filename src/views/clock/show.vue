<template>
  <div class="page">
    <div class="page-hd">
      <div class="class-mod">
        <van-button
          type="info"
          round
          size="small"
          style="min-width:100px;"
          @click="dialogVisible = true"
        >{{ className }}</van-button>
      </div>
    </div>
    <div class="pae-bd">
      <!-- 修改学生考勤状态 -->
      <van-dialog
        title="考勤状态修改"
        v-model="dialogVisible"
        show-cancel-button
        @cancel="dialogVisible = false"
      >
        <div class="cells" style="padding:15px 0 15px 0;">
          <div class="cell min-h100">
            <div class="cell-hd">
              <label class="label">请假</label>
            </div>
            <div class="cell-bd"></div>
          </div>
          <div class="cell min-h100">
            <div class="cell-hd">
              <label class="label">缺勤</label>
            </div>
            <div class="cell-bd"></div>
          </div>
          <div class="cell min-h100">
            <div class="cell-hd">
              <label class="label">漏打卡</label>
            </div>
            <div class="cell-bd"></div>
          </div>
        </div>
      </van-dialog>
      <!-- 修改学生考勤状态 -->
      <div class="table">
        <div class="table-head">
          <div class="tr">
            <div class="th">
              <i style="background-color:#92cd36;"></i>
              <span size-14>表示已打卡</span>
            </div>
            <div class="th">
              <i style="background-color:#febf56;"></i>
              <span size-14>表示未打卡</span>
            </div>
            <div class="th">
              <i style="background-color:#f46557;"></i>
              <span size-14>表示其它</span>
            </div>
          </div>
        </div>
        <div class="table-body">
          <div class="tr">
            <div class="td">
              <div>
                <div class></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 打卡记录列表 -->
      <div class="cells" style="margin-top:15px;">
        <div class="cell">
          <div class="cell-hd"></div>
          <div class="cell-bd"></div>
          <div class="cell-ft"></div>
        </div>
      </div>
      <!-- 打卡记录列表 -->
      <!-- <div class="class-edit-head">
        <button class="btn btn-primary">{{ className }}</button>
      </div>-->
      <!-- <van-tabs v-model="active" :line-height="2" @click="handleTabClick">
        <van-tab title="未打卡">
          <div class="cells-title">未打卡列表({{ list.length }})</div>
          <div class="cells">
            <div class="cell min-h120" v-for="(item, index) in list" :key="index">
              <div class="cell-bd">
                <p>{{ item.studentName }}</p>
              </div>
              <div class="cell-ft">
                <span>{{ item.postTime }}</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已打卡">
          <div class="cells-title">已打卡列表({{ list.length }})</div>
          <div class="cells">
            <div class="cell min-h120" v-for="(item, index) in list" :key="index">
              <div class="cell-bd">
                <p>{{ item.studentName }}</p>
              </div>
              <div class="cell-ft">
                <span>{{ item.postTime }}</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>-->
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "clockShow",
  data() {
    return {
      dialogVisible: false,
      active: 0,
      className: this.$route.query.className,
      list: [],
      query: {
        type: 0, //0-缺勤 1-出勤
        date: this.$route.query.date,
        classId: this.$route.query.classId
      }
    };
  },
  methods: {
    handleTabClick(index) {
      this.query.type = index;
      this.queryAttendance(this.query);
    },
    //考勤统计详情
    async queryAttendance(params = {}) {
      let res = await service.queryAttendance(params);
      if (res.errorCode === 0) {
        this.list = res.data.info;
      }
    }
  },
  activated() {
    this.queryAttendance(this.query);
  }
};
</script>
<style lang="less" scoped>
.class-mod {
  text-align: center;
  padding: 20px 0;
  background-color: #fff;
}
.table {
  background-color: #fff;
  .tr {
    display: flex;
    flex-wrap: wrap;
  }
}
.table-head {
  padding: 24px 0;
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
    color: #fff;
    background-color: #fff;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      bottom: 0;
      border-left: 1px solid #e5e5e5;
      color: #e5e5e5;
      transform-origin: 0 0;
      transform: scaleX(0.5);
    }
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #e5e5e5;
      color: #e5e5e5;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
    &-success {
      background-color: #92cd36;
    }
    &-default {
      background-color: #febf56;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    span {
      display: inline-block;
      margin-top: 20px;
    }
  }
}
</style>
