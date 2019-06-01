<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="page-swiper">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide>
            <div class="slide">
              <img src="@/assets/welcome-slide-1@2x.png">
              <img src="@/assets/welcome-slide-4@2x.png" width="140" height="22" class="channel">
              <p>
                个性添加培养目标
                <br>兑换奖励法培养习惯养成
              </p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide">
              <img src="@/assets/welcome-slide-2@2x.png">
              <img src="@/assets/welcome-slide-5@2x.png" width="93" height="22" class="channel">
              <p>
                科学、个性引导孩子全面发展
                <br>助力孩子茁壮成长
              </p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="slide">
              <img src="@/assets/welcome-slide-3@2x.png">
              <img src="@/assets/welcome-slide-6@2x.png" width="86" height="22" class="channel">
              <p>
                实时掌握孩子
                <br>学校动态、在校表现
              </p>
              <button class="experience" @click="jump">立即体验</button>
              <!-- <van-button type="primary" size="small" @click="jump">立即体验</van-button> -->
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "welcome",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    jump() {
      this.$router.push({
        path: "/single"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.slide {
  position: relative;
  height: 100vh;
  text-align: center;
  p {
    color: #999;
  }
  .channel {
    margin-top: 80px;
    margin-bottom: 50px;
  }
  .experience {
    display: inline-block;
    width: 210px;
    height: 60px;
    margin-top: 40px;
    color: #84ce09;
    border-radius: 60px;
    border: 4px solid #84ce09;
    background-color: #fff;
  }
}
</style>
