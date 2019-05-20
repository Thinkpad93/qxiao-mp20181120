<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells-title min-h100 a-i-c">
        <div class="flex a-i-c">
          <img src="@/assets/learning-icon@2x.png" width="24" height="24">
          <!-- <van-icon name="like-o" size="22px"></van-icon> -->
          <p class="ml-20" size-17>我的课程</p>
        </div>
        <div class="flex">
          <span>全部</span>
          <van-icon name="arrow" size="16px"></van-icon>
        </div>
      </div>
      <!-- swiper start -->
      <div class="page-swiper">
        <!-- <p class="no-swiper">您还没有定制自己的学习课程</p> -->
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide class="slide">
            <img src="@/assets/study.png" width="136" height="89">
            <p class="text-ellipsis mt-20">生活中的自制乐器与演奏</p>
          </swiper-slide>
          <swiper-slide class="slide">
            <img src="@/assets/study.png" width="136" height="89">
            <p class="text-ellipsis mt-20">嵌入式系统</p>
          </swiper-slide>
          <swiper-slide class="slide">
            <img src="@/assets/study.png" width="136" height="89">
            <p class="text-ellipsis mt-20">电气工程基础</p>
          </swiper-slide>
          <swiper-slide class="slide">
            <img src="@/assets/study.png" width="136" height="89">
            <p class="text-ellipsis mt-20">原理及应用</p>
          </swiper-slide>
        </swiper>
      </div>
      <!-- swiper end -->
      <div class="cells-title min-h100 a-i-c">
        <div class="flex a-i-c">
          <img src="@/assets/learning-icon@2x.png" width="24" height="24">
          <!-- <van-icon name="star-o" size="22px"></van-icon> -->
          <p class="ml-20" size-17>学习课程推荐</p>
        </div>
        <div class="flex">
          <span>全部</span>
          <van-icon name="arrow" size="16px"></van-icon>
        </div>
      </div>
      <!-- figure start -->
      <div class="news">
        <div class="news-item">
          <div class="news-bd flex a-i-c">
            <div class="news-thumb">
              <img src="@/assets/study.png">
            </div>
            <div class="news-info">
              <h3 class="text-ellipsis mb-20">英语知识概要</h3>
              <div class="lecturer mb-20">主讲：赵南星</div>
              <span class="pay">付费</span>
            </div>
          </div>
        </div>
        <div class="news-item">
          <div class="news-bd flex a-i-c">
            <div class="news-thumb">
              <img src="@/assets/study.png">
            </div>
            <div class="news-info">
              <h3 class="text-ellipsis mb-20">数学多边形知识点</h3>
              <div class="lecturer mb-20">主讲：李四</div>
              <span class="pay">付费</span>
            </div>
          </div>
        </div>
        <div class="news-item">
          <div class="news-bd flex a-i-c">
            <div class="news-thumb">
              <img src="@/assets/study.png">
            </div>
            <div class="news-info">
              <h3 class="text-ellipsis mb-20">让你从头到尾把promise整的明明白白</h3>
              <div class="lecturer mb-20">主讲：王家屏</div>
              <span class="free">免费</span>
            </div>
          </div>
        </div>
      </div>
      <!-- figure end -->
    </div>
  </div>
</template>
<script>
import service from "@/api";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "studyPlan",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        freeMode: true,
        //centeredSlides: true,
        spaceBetween: 12,
        observer: true
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    //this.swiper.slideTo(3, 1000, false);
  }
};
</script>
<style lang="less" scoped>
.cells-title {
  margin: 0;
  background-color: #fff;
}

.news {
  background-color: #fff;
  &-item {
    position: relative;
    padding: 25px;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 1px;
      border-top: 1px solid #e5e5e5;
      color: #e5e5e5;
      transform-origin: 0 0;
      transform: scaleY(0.5);
      z-index: 2;
    }
  }
  &-thumb {
    img {
      width: 272px;
      height: 178px;
    }
  }
  &-info {
    flex: 1;
    overflow: hidden;
    padding-left: 20px;
    .lecturer {
      color: #999;
    }
    .pay {
      color: #f2522d;
    }
    .free {
      color: #84ce09;
    }
  }
}
.page-swiper {
  padding-left: 20px;
  margin-bottom: 30px;
  min-height: 280px;
  position: relative;
  background-color: #fff;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    z-index: 2;
  }
}
.no-swiper {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  color: #999;
  text-align: center;
  transform: translate(0, -50%);
}
.slide {
  width: 272px;
  padding-top: 30px;
  position: relative;
  overflow: hidden;
}
</style>
