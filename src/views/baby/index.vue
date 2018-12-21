<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells weui-cells_checkbox" v-for="(item, index) in babyList" :key="index">
        <label class="cell babyItem weui-check__label" :for="index">
          <div class="cell-hd">
            <img class="teacher-icon" src="http://iph.href.lu/40x40" alt="">
          </div>
          <div class="cell-bd">
            <p>{{ item.name }}</p>
          </div>
          <div class="cell-ft">
            <input @change="handleChange" v-model="item.checked" type="radio" name="radio1" :value="index" class="weui-check" :id="index">
            <span class="weui-icon-checked"></span>
          </div>
        </label>
      </div>
    </div>  
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary" @click="handleAddChild">添加孩子</a>
      </div>
    </div>    
  </div>  
</template>
<script>
export default {
  name: "boby",
  data() {
    return {
      babyList: [
        { name: "小东北", checked: "0" },
        { name: "大西南", checked: "" }
      ]
    };
  },
  methods: {
    handleAddChild() {
      this.$router.push({ path: "/baby/add" });
    },
    handleChange() {
      console.log(this.babyList);
    }
  },
  activated() {
    console.log(this.$route);
  }
};
</script>
<style lang="less" scoped>
.babyItem {
  img {
    border-radius: 50%;
  }
}
.cells {
  font-size: 36px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.cell {
  padding: 0 30px;
  position: relative;
  display: flex;
  align-items: center;
  height: 120px;
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
}
.cell-bd {
  flex: 1;
  padding-left: 20px;
}
</style>
