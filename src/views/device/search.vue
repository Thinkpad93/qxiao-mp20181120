<template>
  <div class="page">
    <div class="page-bd">
      <div class="schedule">
        <div class="schedule-body"></div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "braceletSearch",
  data() {
    return {
      scheduleVOs: [
        {
          list: [
            {
              day: 1,
              pitchId: 1,
              title: "英语"
            },
            {
              day: 1,
              pitchId: 2,
              title: ""
            },
            {
              day: 1,
              pitchId: 3,
              title: "英语"
            },
            {
              day: 1,
              pitchId: 4,
              title: ""
            },
            {
              day: 1,
              pitchId: 5,
              title: "英语"
            },
            {
              day: 1,
              pitchId: 6,
              title: ""
            },
            {
              day: 1,
              pitchId: 7,
              title: ""
            }
          ]
        },
        {
          list: [
            {
              day: 2,
              pitchId: 1,
              title: "信息"
            },
            {
              day: 2,
              pitchId: 2,
              title: "信息"
            },
            {
              day: 2,
              pitchId: 3,
              title: ""
            },
            {
              day: 2,
              pitchId: 4,
              title: ""
            },
            {
              day: 2,
              pitchId: 5,
              title: ""
            },
            {
              day: 2,
              pitchId: 6,
              title: ""
            },
            {
              day: 2,
              pitchId: 7,
              title: ""
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
</style>