<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
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
@import "./styles/site.less";
</style>
