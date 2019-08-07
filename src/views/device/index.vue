<template>
  <div class="page">
    <div class="page-bd">
      <van-button type="info" size="small" @click="handleOpenWXDeviceLib">初始化设备库</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    handleOpenWXDeviceLib() {
      WeixinJSBridge.invoke("openWXDeviceLib", {}, function(res) {
        console.log(res);
        console.log("res");
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>

