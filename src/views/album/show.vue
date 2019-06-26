<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>{{ albumInfo.title }}</h1>
        <div class="article-hd flex">
          <div class="article-cell">
            <time style="color:#8d8d8d;">{{ albumInfo.postTime }}</time>
          </div>
        </div>
        <div class="album-content">
          <div class="grid-content clearfix">
            <div
              class="album-img"
              v-for="(pic, index) in albumInfo.items"
              :key="index"
              @click="handlePreviewImage(pic.imageUrl, albumInfo.items)"
            >
              <!-- 删除 -->
              <div class="album-mask" v-show="mask" style="z-index: 9527">
                <van-checkbox-group v-model="albumCheckList">
                  <van-checkbox :key="pic.itemId" :name="pic.itemId" checked-color="#92cd36"></van-checkbox>
                </van-checkbox-group>
              </div>
              <img :src="pic.imageUrl">
            </div>
          </div>
        </div>
        <div class="empty" v-if="!albumInfo.items.length">
          <img src="@/assets/kong.png" alt>
          <p>暂无相册</p>
        </div>
      </article>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <div class="flex" v-if="roleType == 2">
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
            @click="handleConfirm"
          >删除</van-button>
          <van-button
            size="large"
            type="info"
            class="no-radius"
            v-show="!mask"
            @click="handleBlumAdd"
          >上传相片</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import service from "@/api";
export default {
  name: "albumDetail",
  data() {
    return {
      mask: false,
      roleType: this.$store.state.user.info.roleType,
      query: {
        openId: this.$store.state.user.info.openId,
        channelId: this.$route.query.channelId
      },
      albumInfo: {},
      albumCheckList: [] //选择的图片ID
    };
  },
  methods: {
    handleBlumAdd(e) {
      this.$router.push({
        path: "/album/add",
        query: { channelId: this.$route.query.channelId }
      });
    },
    handleCancel() {
      this.mask = false;
      this.albumCheckList = [];
    },
    handleConfirm() {
      if (this.albumCheckList.length) {
        this.imageDelete({
          openId: this.query.openId,
          itemIds: this.albumCheckList
        });
      } else {
        this.$toast("没有选择图片");
      }
    },
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
    //相册照片或视频删除
    async imageDelete(params = {}) {
      let res = await service.imageDelete(params);
      if (res.errorCode === 0) {
        this.albumChannelDetail(this.query);
      }
    },
    //查询班级所属的相册栏目
    async albumChannelDetail(params = {}) {
      let res = await service.albumChannelDetail(params);
      if (res.errorCode === 0) {
        this.albumInfo = res.data;
        this.albumCheckList = [];
        this.mask = false;
      }
    }
  },
  mounted() {
    this.albumChannelDetail(this.query);
  }
};
</script>
<style lang="less" scoped>
.album-content {
  overflow: hidden;
}
.album-img {
  width: 160px;
  height: 160px;
  float: left;
  position: relative;
  overflow: hidden;
  margin-left: 10px;
  margin-bottom: 20px;
  img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
}
.album-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: right;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
