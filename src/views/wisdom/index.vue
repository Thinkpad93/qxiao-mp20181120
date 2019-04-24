<template>
  <div class="flex-page">
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
  name: "wisdom",
  components: {
    qxFooter
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>
