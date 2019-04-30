<template>
  <div class="page-myPersonality" style="position:relative">
    <div class="myPersonality_title">
      <div>
        <van-icon name="like-o"/>
        <h2>我的定制</h2>
      </div>
      <div class="course">
        <img src="http://dummyimage.com/500x300" alt>
        <div>
          <div>
            <p>1/30</p>
            <p></p>
            <p>天</p>
          </div>
          <div>
            <p>0/6</p>
            <p></p>
            <p>课程</p>
          </div>
        </div>
      </div>
    </div>
    <div class="myPersonality_title" style="margin-top:20px">
      <div>
        <van-icon class="recomend" name="star-o"/>
        <h2>个性计划推荐</h2>
      </div>
      <div class="course">
        <img src="http://dummyimage.com/500x300" alt>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.myPersonality_title {
  background: #fff;
  div {
    &:nth-of-type(1) {
      display: flex;
      padding: 20px 20px;
      align-items: center;
      position: relative;
      left: 0;
      bottom: 0;
      i {
        font-size: 60px;
        margin-right: 20px;
        color: #61d2fa;
      }
      h2 {
        font-size: 40px;
      }
    }
  }
}

.course {
  position: relative;
  left: 0;
  top: 0;
  > div {
    width: 100vw;
    position: absolute !important;
    left: 0;
    bottom: 20px !important;
    z-index: 10;
    height: 80px;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
      p {
        width: 100%;
        text-align: center;
        font-size: 40px;
        color: #fff;
        &:nth-of-type(1) {
          font-size: 50px;
        }
      }
    }
  }
}
.recomend {
  color: #ffd86c !important;
}
</style>
