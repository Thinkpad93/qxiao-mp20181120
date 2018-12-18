<template>
  <div class="page">
    <div class="page-hd">
      <div class="tab">
        <a href="javascript:;" @click="handleTabClick(1)" :class="[index === 1 ? 'curr': '']">通知消息</a>
        <a href="javascript:;" @click="handleTabClick(2)" :class="[index === 2 ? 'curr': '']">发送记录</a>
      </div>
    </div>
    <div class="page-bd">
      <div class="cells">
        <figure class="figure" v-for="(item, index) in 6" :key="index">
          <h3>元素的内容应该与主内容相关</h3>
          <div>
            <time>09-22 10:15</time>
          </div>        
          <img src="http://iph.href.lu/690x298" alt="">
          <p class="line-clamp">必须在描述并收藏数据的内容或特色，进而达成协助数据检索的目的。这种布局在移动端页面开发时候经常遇到</p>
          <div class="metedata"></div>
        </figure>
      </div>
    </div>  
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "notice",
  data() {
    return {
      index: 1
    };
  },
  methods: {
    handleTabClick(index) {
      this.index = index;
    }
  }
};
</script>
<style lang="less" scoped>
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
}
.tab {
  display: flex;
  font-size: 32px;
  a {
    height: 100px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .curr {
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      display: block;
      width: 50%;
      height: 6px;
      background-color: #92cd36;
      transform: translateX(-50%);
    }
  }
}
.figure {
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
