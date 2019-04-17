<template>
  <div class="flex">
    <div class="flex-bd"></div>
    <div class="flex-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import qxFooter from "@/components/Footer";
export default {
  name: "",
  components: {
    qxFooter
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
</style>
