<template>
  <div class="page">
    <div class="page-hd">
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;" id="selectClass" @click="handleSelectClass">
          <span id="data1">KA1班</span>
          <!-- <span class="triangle_border_down_green"></span> -->
        </a>
      </div>
      <div class="tab">
        <a href="javascript:;" @click="handleTabClick(1)" :class="[query.type === 1 ? 'curr': '']">已签到人数</a>
        <a href="javascript:;" @click="handleTabClick(0)" :class="[query.type === 0 ? 'curr': '']">未签到人数</a>
      </div>
    </div>
    <div class="pae-bd">
      <div class="cells">
        <div class="cell" v-for="(item, index) in classClockList" :key="index">
          <div class="cell-bd">
            <p>{{ item.studentName }}</p>
          </div>
          <div class="cell-ft">
            <span v-for="(time, index) in item.time" :key="index">{{ time.postTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "clockShow",
  data() {
    return {
      classClockList: [],
      query: {
        type: 1,
        date: "2018-12-18",
        classId: this.$route.params.id
      }
    };
  },
  methods: {
    handleSelectClass() {
      this.$weui.picker(
        [{ label: "一年", value: 1 }, { label: "二年", value: 2 }],
        {
          onChange: result => {},
          onConfirm: result => {}
        }
      );
    },
    handleTabClick(index) {
      this.query.type = index;
      this.queryAttendance(this.query);
    },
    //考勤统计详情
    async queryAttendance(params = {}) {
      let res = await service.queryAttendance(params);
      if (res.errorCode === 0) {
        this.classClockList = res.data.info;
      }
    }
  },
  activated() {
    this.queryAttendance(this.query);
  }
};
</script>
<style lang="less">
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
}
#selectClass {
  position: relative;
}
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
}
.triangle_border_down_green {
  position: absolute;
  right: -16%;
  top: 50%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px;
  border-color: #9cd248 transparent transparent;
  transform: translateY(-50%);
}

.tab {
  display: flex;
  font-size: 30px;
  a {
    height: 100px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .curr {
    color: #92cd36;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      display: block;
      width: 50%;
      height: 4px;
      background-color: #92cd36;
      transform: translateX(-50%);
    }
  }
}
</style>
