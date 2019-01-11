<template>
  <footer class="footer">
    <div class="item">
      <router-link to="/home">首页</router-link>
    </div>
    <div class="item">
      <template v-if="roleType === 1">
        <router-link :to="{path: '/my', query: {role: 'admin'}}">我的</router-link>
      </template>
      <template v-else-if="roleType === 2">
        <router-link :to="{path: '/my', query: {role: 'teacher'}}">我的</router-link>
      </template>
      <template v-else>
        <router-link :to="{path: '/my', query: {role: 'patroarch'}}">我的</router-link>
      </template>
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
