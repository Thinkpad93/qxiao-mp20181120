<template>
  <div class="hello">
    <div class="test"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
  width: 400px;
  height: 200px;
  background-color: #42b983;
}
</style>
