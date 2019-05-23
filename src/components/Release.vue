<template>
  <router-link :to="{path: url}" class="release">
    <van-icon name="description" size="24px"></van-icon>
  </router-link>
</template>
<script>
export default {
  props: {
    url: String
  }
};
</script>
<style lang="less" scoped>
.release {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 5%;
  bottom: 12%;
  z-index: 100;
  color: #fff;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #9acb4d;
}
</style>

