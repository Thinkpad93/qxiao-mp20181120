<template>
  <div class="page">
    <div class="page-hd">
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;" id="selectClass" @click="handleSelectClass">
          <span id="data1">KA1班</span>
          <span class="triangle_border_down_green"></span>
        </a>
      </div>
    </div>
    <div class="pae-bd">
      <div class="cells">
        <div class="cell" v-for="(item, index) in 5" :key="index">
          <div class="cell-bd">
            <p>刘同学</p>
          </div>
          <div class="cell-ft">
            <p>08:02、16:32</p>
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
      query: {
        openId: "10086",
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
          onConfirm: (result, v) => {
            console.log(result);
            console.log(v);
          }
        }
      );
    },
    async classClockQuery(params = {}) {
      let res = await service.classClockQuery(params);
      if (res.errorCode === 0) {
        console.log(res);
      }
    }
  },
  activated() {
    this.classClockQuery(this.query);
  }
};
</script>
<style lang="less" scoped>
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
.cells {
  font-size: 32px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.cell {
  padding: 34px 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  }
}
.cell-hd {
  line-height: 90px;
}
.cell-bd {
  flex: 1;
}
.cell-ft {
  color: #808080;
}
</style>
