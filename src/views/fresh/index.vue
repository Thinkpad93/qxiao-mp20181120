<template>
  <div class="page">
    <section class="section">
      <figure class="fresh" v-for="(f, index) in 10" :key="index" @click="go">
        <h3>元素的内容应该与主内容相关</h3>
        <div>
          <time>09-22 10:15</time>
        </div>
        <img src="http://iph.href.lu/690x298" alt="">
        <p class="line-clamp">必须在描述并收藏数据的内容或特色，进而达成协助数据检索的目的。这种布局在移动端页面开发时候经常遇到</p>
        <div class="metedata">
          <span>73人阅读</span>
          <span>留言8</span>
        </div>
      </figure>  
    </section>
  </div>  
</template>
<script>
export default {
  name: "fresh",
  data() {
    return {
      msg: "Hello"
    };
  },
  methods: {
    go() {
      this.$router.push({ path: "/fresh/show" });
    }
  }
};
</script>
<style lang="less">
.fresh {
  padding: 0 30px;
  margin-bottom: 30px;
  background-color: #fff;
  &:active {
    background-color: #f2f2f2;
  }
  h3 {
    font-size: 36px;
    padding: 20px 0;
  }
  p {
    font-size: 28px;
  }
  img {
    width: 690px;
    height: 298px;
    margin: 20px 0;
  }
  .metedata {
    margin: 20px -30px 0 -30px;
    padding: 0 30px;
    display: flex;
    height: 80px;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid #f5f5f5;
    span {
      margin-right: 30px;
    }
  }
}
</style>
