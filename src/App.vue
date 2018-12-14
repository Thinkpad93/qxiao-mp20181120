<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
@import "normalize.css/normalize.css";
@import "./styles/base.less";
@import "./styles/common.less";
@import "./styles/size.less";
@import "./styles/flex.less";
</style>
