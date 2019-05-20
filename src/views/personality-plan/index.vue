<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells-title min-h100 a-i-c">
        <div class="flex a-i-c">
          <img src="@/assets/learning-icon@2x.png" width="24" height="24">
          <!-- <van-icon name="like-o" size="22px"></van-icon> -->
          <p class="ml-20" size-17>我的定制</p>
        </div>
        <div class="flex">
          <span>全部</span>
          <van-icon name="arrow" size="16px"></van-icon>
        </div>
      </div>
      <!-- swiper start -->
      <div class="page-swiper">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide>
            <img src="@/assets/swiper-slide@2x.png">
            <div class="slide-info">
              <p class="text-ellipsis mb-20" size-16>写天2019年的跑步运动培养计划...</p>
              <div class="flex slide-meta">
                <div class="mr-40">课程：0/6</div>
                <div class="mr-40">时间：1/30</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <!-- swiper end -->
      <div class="cells-title min-h100 a-i-c">
        <div class="flex a-i-c">
          <img src="@/assets/learning-icon@2x.png" width="24" height="24">
          <!-- <van-icon name="star-o" size="22px"></van-icon> -->
          <p class="ml-20" size-17>个性计划推荐</p>
        </div>
        <div class="flex">
          <span>全部</span>
          <van-icon name="arrow" size="16px"></van-icon>
        </div>
      </div>
      <!-- swiper start -->
      <div class="page-swiper">
        <swiper :options="params" ref="plan">
          <swiper-slide class="plan-slide">
            <img src="@/assets/swiper-slide-2@2x.png">
          </swiper-slide>
          <swiper-slide class="plan-slide">
            <img src="@/assets/swiper-slide-2@2x.png">
          </swiper-slide>
          <swiper-slide class="plan-slide">
            <img src="@/assets/swiper-slide-2@2x.png">
          </swiper-slide>
        </swiper>
      </div>
      <!-- swiper end -->
    </div>
  </div>
</template>
<script>
import service from "@/api";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "personalityPlan",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {},
      params: {
        freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 15,
        observer: true,
        centeredSlides: true
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    plan() {
      return this.$refs.plan.swiper;
    }
  },
  mounted() {
    this.plan.slideTo(1, 500, false);
  }
};
</script>
<style lang="less" scoped>
.cells-title {
  margin: 0;
  background-color: #fff;
}

.page-swiper {
  position: relative;
  background-color: #fff;
  margin-bottom: 30px;
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
.slide-info {
  padding: 20px 30px;
  overflow: hidden;
}
.slide-meta {
  color: #999;
  font-size: 24px;
}

.plan-slide {
  padding: 30px 0;
  width: 537px;
  img {
    width: 100%;
    height: 315px;
  }
}
</style>
