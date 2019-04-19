<template>
  <div id="app">
    <!-- 这里是会被缓存的视图组件，比如 Home！ -->
    <keep-alive>
      <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {
    $route(to, from) {
      console.log(to);
    }
  }
};
</script>

<style lang="less">
@import "./styles/site.less";

#app {
  height: 100vh;
}
</style>
