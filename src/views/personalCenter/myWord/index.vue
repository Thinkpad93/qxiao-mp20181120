<style scoped>
.page-word {
  position: relative;
}
.van-tab--active {
  color: #32c6f9 !important;
}
.van-tabs__line {
  height: 0px;
}
</style>
<template>
  <div class="page-word">
    <div class="word_content">
      <van-tabs>
        <van-tab>
          <div slot="title">
            <van-icon name="star-o"/>优秀作品
          </div>
          <div class="excellent_word">
            <div class="Onthelist">
              <van-cell title="我的上榜" is-link value="更多"/>
            </div>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <van-icon name="like-o"/>我的作品
          </div>
          <div class="my_word">内容2</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped lang="less">
.word_content {
  .van-tabs__wrap {
    height: 55px;
  }
}
</style>

