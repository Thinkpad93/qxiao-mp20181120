<template>
  <div class="flex-page">
    <div class="flex-bd">
      <van-tabs v-model="active" :line-height="2">
        <van-tab title="优秀作品">
          <!-- 学生个人作品 -->
          <div class="cells-title a-i-c">
            <p size-17>我的上榜</p>
            <div class="flex">
              <span>更多</span>
              <van-icon name="arrow" size="16px"></van-icon>
            </div>
          </div>
          <div class="page-swiper">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide class="slide" v-for="(item, index) in onLineList" :key="index">
                <div
                  class="slide-img"
                  :style="{backgroundImage: `url(${item.imageUrl})`}"
                  @click="handlePreviewImage(item.imageUrl, onLineList)"
                ></div>
                <div class="zan flex a-i-c" v-if="item.praise">
                  <van-icon name="like" size="14px" color="#e64340"></van-icon>
                  <span>{{ item.praise }}</span>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="cells-title a-i-c">
            <p size-17>优秀作品展示</p>
          </div>
          <!-- 优秀作品 -->
          <div class="good-works">
            <div class="item" v-for="(item, index) in worksList" :key="index">
              <div class="good-image" @click="handlePreviewImage(item.imageUrl, worksList)">
                <img :src="item.imageUrl" alt>
                <div class="zan flex a-i-c" v-if="item.praise">
                  <van-icon name="like" size="14px" color="#e64340"></van-icon>
                  <span>{{ item.praise }}</span>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="我的上传">
          <template v-if="list.length">
            <div class="time-works mt-20">
              <div class="item" v-for="(item, index) in list" :key="index">
                <time size-16>{{ item.postTime }}</time>
                <div class="flex f-w-w" style="margin-left:-5px;margin-right:-5px;">
                  <div class="suni-box mt-30" v-for="(work, i) in item.works" :key="i">
                    <div class="suni" @click="handlePreviewImage(work.smallUrl, item.works)">
                      <!-- 删除蒙版 -->
                      <div class="works-mask" style="z-index: 9527" v-show="mask">
                        <van-checkbox-group v-model="checkList">
                          <van-checkbox
                            :key="work.worksId"
                            :name="work.worksId"
                            checked-color="#92cd36"
                          ></van-checkbox>
                        </van-checkbox-group>
                      </div>
                      <img :src="work.smallUrl" alt>
                      <div class="works-status" size-12 v-if="work.verifyStatus == 0">待审核</div>
                      <div
                        class="works-status"
                        size-12
                        v-if="work.verifyStatus == 2"
                        style="background-color:#e64340;"
                      >不通过</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="empty">
              <img src="@/assets/kong.png" alt>
              <p class="mt-30">您还没有上传作品，小Q期待您的作品哦~</p>
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="flex-ft">
      <template v-if="active == 0">
        <van-button type="info" size="large" class="no-radius" to="/works/add">上传作品</van-button>
      </template>
      <template v-else>
        <div class="flex">
          <van-button
            size="large"
            type="default"
            class="no-radius"
            v-show="mask"
            @click="handleCancel"
          >取消</van-button>
          <van-button
            size="large"
            type="default"
            class="no-radius"
            v-show="!mask"
            @click="mask = true"
          >编辑</van-button>
          <van-button
            size="large"
            type="danger"
            class="no-radius"
            v-show="mask"
            @click="handleDelImage"
          >删除</van-button>
          <van-button size="large" type="info" class="no-radius" v-show="!mask" to="/works/add">上传作品</van-button>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import eventBus from "@/utils/eventBus";
import { mapState } from "vuex";
export default {
  name: "works",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      active: 0,
      mask: false,
      swiperOption: {
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 12,
        observer: true
      },
      query: {
        studentId: this.$store.state.user.info.openStudentId
      },
      list: [], //我的上传
      onLineList: [], //上榜作品
      worksList: [], //优秀作品展
      checkList: [] //checkbox 选中项
    };
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType
    }),
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    //预览图片
    handlePreviewImage(imgUrl, images) {
      let imgArray = [];
      if (images.length) {
        images.forEach(item => {
          imgArray.push(item.imageUrl);
        });
      }
      if (!imgArray.length) {
        imgArray.push(imgUrl);
      }
      wx.previewImage({
        current: encodeURI(imgUrl),
        urls: imgArray
      });
    },
    handleDelImage() {
      if (this.checkList.length) {
        this.deleteImage({ images: this.checkList });
      } else {
        this.$toast("没有选择图片");
      }
    },
    handleCancel() {
      this.mask = false;
      this.checkList = [];
    },
    //删除作品
    async deleteImage(params = {}) {
      let res = await service.deleteImage(params);
      if (res.errorCode === 0) {
        this.mask = false;
        this.checkList = [];
        this.queryMyUpload(this.query);
      }
    },
    //查询优秀上传作品
    async queryOnLineList(params = {}) {
      let res = await service.queryOnLineList(params);
      if (res.errorCode === 0) {
        this.onLineList = res.data.onLineList || [];
        this.worksList = res.data.works || [];
      }
    },
    //查询我的上传作品
    async queryMyUpload(params = {}) {
      let res = await service.queryMyUpload(params);
      if (res.errorCode === 0) {
        this.list = res.data || [];
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === "/works" && from.path === "/works/add") {
      next(vm => {
        vm.active = 1;
      });
      return;
    }
    next();
  },
  created() {},
  mounted() {
    this.queryOnLineList(this.query);
    this.queryMyUpload(this.query);
  },
  activated() {
    //console.log("activated");
  },
  beforeDestroy() {
    //console.log("beforeDestroy20");
  },
  destroyed() {
    //console.log("destroyed20");
  }
};
</script>
<style lang="less" scoped>
.cells-title {
  margin: 20px 0 0 0;
  padding: 30px;
  background-color: #fff;
}
.page-swiper {
  position: relative;
  padding-left: 30px;
  padding-bottom: 40px;
  background-color: #fff;
}
.slide {
  width: 260px;
  height: 180px;
  position: relative;
  .slide-img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.zan {
  position: absolute;
  right: 8%;
  bottom: 8%;
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  span {
    display: inline-block;
    margin-left: 10px;
  }
}
.good-works {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  background-color: #fff;
  .item {
    width: 50%;
    padding: 0 30px;
    position: relative;
    margin-bottom: 30px;
  }
  .good-image {
    height: 300px;
    position: relative;
    overflow: hidden;
    padding-bottom: 100%;

    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
}
.time-works {
  background-color: #fff;
  .item {
    padding: 30px 20px;
    position: relative;
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
    .suni-box {
      width: 25%;
      padding: 0 10px;
    }
    .suni {
      position: relative;
      overflow: hidden;
      padding-bottom: 100%;
      img {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }
    .works-status {
      color: #fff;
      padding: 6px 10px;
      border-radius: 20px;
      position: absolute;
      right: 6%;
      bottom: 6px;
      background-color: #252525;
    }
  }
}
.works-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: right;
  border-radius: 8px;
  padding: 10px 10px 0 0;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
