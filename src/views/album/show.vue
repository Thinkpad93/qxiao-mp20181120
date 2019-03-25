<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="roleType == 2">
        <a href="javascript:;" class="release" @click="handleBlumAdd">
          <img src="@/assets/image/release-icon.png" alt>
        </a>
      </template>
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
              @click="handlePreviewImage(index, albumInfo.items)"
            >
              <!-- 删除 -->
              <div class="album-mask" v-if="isShow" style="z-index: 500" @click.stop>
                <van-checkbox-group v-model="albumCheckList">
                  <van-checkbox :key="pic.itemId" :name="pic.itemId" checked-color="#92cd36"></van-checkbox>
                </van-checkbox-group>
              </div>
              <img :src="pic.imageUrl">
            </div>
          </div>
        </div>
        <div class="empty" v-if="!albumInfo.items.length">
          <img src="@/assets/image/kong.png" alt>
          <p size-18>暂无相册</p>
        </div>
      </article>
      <template v-if="roleType == 2">
        <div class="_confirm" v-if="albumInfo.items.length">
          <div class="album-tool flex">
            <span @click="handleCancel">取消</span>
            <template>
              <span @click="isShow = true" v-if="!isShow">选择</span>
              <span v-if="isShow" @click="handleConfirm">确认</span>
            </template>
          </div>
        </div>
      </template>
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
      isShow: false,
      roleType: this.$store.state.users.roleType,
      query: {
        openId: this.$store.state.wx.openId,
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
      this.isShow = false;
      this.albumCheckList = [];
    },
    handleConfirm() {
      if (this.albumCheckList.length) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定删除选择的图片吗？"
          })
          .then(() => {
            this.imageDelete({
              openId: this.query.openId,
              itemIds: this.albumCheckList
            });
          });
      } else {
        this.$toast("没有选择图片");
      }
    },
    //预览图片
    handlePreviewImage(index, images) {
      if (Array.isArray(images)) {
        let result = [];
        images.forEach(elem => {
          result.push(elem.imageUrl);
        });
        this.instance = ImagePreview({
          images: result,
          startPosition: index,
          onClose: () => {}
        });
      }
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
        this.isShow = false;
      }
    }
  },
  mounted() {
    this.albumChannelDetail(this.query);
  }
};
</script>
<style lang="less">
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
.album-tool {
  padding: 10px 20px;
  justify-content: space-between;
}
</style>
