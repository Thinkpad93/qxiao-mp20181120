<template>
  <div class="page">
    <div class="page-bd">
      <div class="schedule">
        <div class="schedule-hd"></div>
        <div class="schedule-bd">
          <div class="flex f-w-w" style="margin-left: -10px; margin-right: -10px;">
            <div class="schedule-figure" v-for="(item, index) in actionList" :key="index">
              <div class="ch-gradient">
                <p>{{ item.name }}</p>
                <div class="rate-group">
                  <div class="rate-group-item flex j-c-s-b">
                    <van-rate v-model="count1" :size="16" :count="1" color="#09e2bb" readonly></van-rate>
                    <sapn>16人</sapn>
                  </div>
                  <div class="rate-group-item flex j-c-s-b">
                    <van-rate v-model="count2" :size="16" :count="2" color="#09e2bb" readonly></van-rate>
                    <sapn>6人</sapn>
                  </div>
                  <div class="rate-group-item flex j-c-s-b">
                    <van-rate v-model="count3" :size="16" :count="3" color="#09e2bb" readonly></van-rate>
                    <sapn>0人</sapn>
                  </div>
                  <div class="rate-group-item flex j-c-s-b">
                    <van-rate v-model="count4" :size="16" :count="4" color="#09e2bb" readonly></van-rate>
                    <sapn>1人</sapn>
                  </div>
                  <div class="rate-group-item flex j-c-s-b">
                    <van-rate v-model="count5" :size="16" :count="5" color="#09e2bb" readonly></van-rate>
                    <sapn>3人</sapn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="schedule-ft"></div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "schedule",
  data() {
    return {
      count5: 5,
      count4: 4,
      count3: 3,
      count2: 2,
      count1: 1,
      actionList: [
        {
          name: "阅读"
        },
        {
          name: "听妈妈的话"
        },
        {
          name: "固定列"
        },
        {
          name: "打扫房间"
        },
        {
          name: "睡觉听故事仔"
        },
        {
          name: "跑步"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.schedule-bd {
  padding: 20px;
}
.schedule-figure {
  width: 50%;
  padding: 0 20px;
  margin-bottom: 20px;
  background-color: transparent;
}
.ch-gradient {
  height: 380px;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  > p {
    font-size: 36px;
    margin-bottom: 30px;
  }
}
.rate-group-item {
  margin-bottom: 8px;
}
</style>
