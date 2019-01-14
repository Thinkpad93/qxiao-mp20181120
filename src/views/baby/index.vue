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
<style lang="less">
.babyItem {
  img {
    border-radius: 50%;
  }
}
</style>
