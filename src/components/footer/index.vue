<template>
  <footer class="footer">
    <div class="item">
      <router-link to="/home">首页</router-link>
    </div>
    <div class="item">
      <template v-if="roleType === 1 || roleType === 4">
        <router-link :to="{path: '/my', query: {role: 'leader'}}">我的</router-link>
      </template>
      <template v-else-if="roleType === 2 || roleType === 5">
        <router-link :to="{path: '/my', query: {role: 'teacher'}}">我的</router-link>
      </template>
      <template v-else></template>
    </div>
  </footer>   
</template>
<script>
export default {
  name: "footers",
  data() {
    return {
      roleType: this.$store.getters.roleType
    };
  }
};
</script>
<style lang="less">
</style>
