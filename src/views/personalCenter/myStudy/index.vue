<template>
  <div class="page-study" style="position:relative">
    <div class="myCource">
      <div class="courceContent">
        <van-cell value="更多" is-link>
          <template slot="title">
            <span class="custom-text">我的课程</span>
          </template>
        </van-cell>
        <div>
          <div>
            <img src="http://dummyimage.com/160x100" alt>
            <h2>阅读说明</h2>
            <p>林场老师</p>
          </div>
          <div>
            <img src="http://dummyimage.com/160x100" alt>
            <h2>阅读说明</h2>
            <p>林场老师</p>
          </div>
        </div>
      </div>
    </div>
    <div class="myCource" style="margin-top:20px">
      <div class="courceContent">
        <van-cell value="更多" is-link>
          <template slot="title">
            <span class="custom-text">学习课程推荐</span>
          </template>
        </van-cell>
        <div>
          <div>
            <img src="http://dummyimage.com/160x100" alt>
            <h2>阅读说明</h2>
            <p>林场老师</p>
          </div>
          <div>
            <img src="http://dummyimage.com/160x100" alt>
            <h2>阅读说明</h2>
            <p>林场老师</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.myCource {
  border-bottom: 1px solid #eee;
  background: #fff;
  .courceContent {
    padding: 30px;
    margin: 0 auto;
    .van-cell {
      padding: 15px 0px 50px !important;
    }
    > div {
      display: flex;
      justify-content: space-between;
      > div {
        h2 {
          font-size: 35px;
          margin: 20px 0px;
        }
      }
    }
  }
}
.custom-text {
  font-size: 40px;
  font-weight: 600;
}
.van-cell__value,
i {
  display: block;
  margin-top: 10px;
}
</style>
