<template>
  <div class="page-myBraclet">
    <img src="http://dummyimage.com/400x200" alt>
    <div class="myBraclet-info">
      <van-cell-group>
        <van-cell title="版本" value="V1.0"/>
        <van-cell title="品牌" value="小Q手环学校版"/>
        <van-cell title="运动" is-link value="1580步"/>
        <van-cell title="睡眠" is-link value="125min"/>
      </van-cell-group>
    </div>
    <div class="myBraclet_btn">
      <van-button type="primary">解绑手环</van-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.van-cell-group {
  i {
    color: #585858;
  }
  span {
    color: #999999;
  }
}

.myBraclet_btn {
  margin-top: 250px;
  display: flex;
  justify-content: center;
  .van-button {
    background: #40d0ad;
    color: #fff !important;
    border: none;
    width: 600px;
    border: 30px;
  }
}
</style>
