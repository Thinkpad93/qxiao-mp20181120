<template>
  <div class="page">
    <div class="page-bd">
      <form action ref="form" method="post">
        <div class="cells">
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <ul class="uploader-files">
                <li
                  class="uploader-file"
                  v-for="(file, index) in imagesList"
                  :key="index"
                  :style="{backgroundImage: `url(${file})`}"
                >
                  <i class="iconfont icon-guanbi2fill" @click.stop="handleDelImg(index)"></i>
                </li>
              </ul>
              <div class="uploader-input_box" @click="handleChooseImage"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="btn-group">
      <a href="javascript:void(0);" class="btn btn-large btn-primary" @click="handleSubmit">保存</a>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "albumAdd",
  data() {
    return {
      serverId: [], //微信图片ID
      imagesList: [],
      form: {
        openId: this.$store.state.wx.openId,
        channelId: this.$route.query.channelId,
        type: 0, // 0-图片 1-视频
        imageUrl: [],
        videoUrl: "" //视频URL
      },
      albumChannel: []
    };
  },
  methods: {
    handleChooseImage() {
      wx.chooseImage({
        count: 9,
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          // 判断 ios
          if (window.__wxjs_is_wkwebview) {
            this.handleLocalImgData(localIds);
          } else {
            localIds.forEach(element => {
              this.imagesList.push(element);
            });
          }
          this.handleUploadImage(localIds);
        },
        fail: res => {
          alert("失败");
        }
      });
    },
    //预览图片
    handlePreviewImage(item) {
      wx.previewImage({
        current: item,
        urls: this.imagesList
      });
    },
    //上传图片
    handleUploadImage(localIds) {
      let i = 0;
      let length = localIds.length;
      let upload = () => {
        let loacId = localIds[i];
        if (window.__wxjs_is_wkwebview) {
          if (loacId.indexOf("wxlocalresource") != -1) {
            loacId = loacId.replace("wxlocalresource", "wxLocalResource");
          }
        }
        wx.uploadImage({
          localId: loacId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: res => {
            let serverId = res.serverId; // 返回图片的服务器端ID
            this.serverId.push(serverId);
            i++;
            i < length && upload();
          },
          fail: res => {
            alert("失败");
          }
        });
      };
      upload();
    },
    //ios 图片读取
    handleLocalImgData(localIds) {
      let i = 0;
      let length = localIds.length;
      let upload = () => {
        wx.getLocalImgData({
          localId: localIds[i], // 图片的localID
          success: res => {
            let localData = res.localData; // localData是图片的base64数据，可以用img标签显示
            localData = localData.replace("jgp", "jpeg");
            this.imagesList.push(localData);
            i++;
            i < length && upload();
          }
        });
      };
      upload();
    },
    handleDelImg() {
      this.imagesList.splice(index, 1); //移除图片显示
      this.serverId.splice(index, 1); //移除微信图片ID
    },
    handleSubmit() {
      if (!this.serverId.length) {
        this.$toast("请上传图片");
      } else {
        let params = {
          openId: this.form.openId,
          imgIds: this.serverId
        };
        service.imgIds(params).then(res => {
          if (res.errorCode === 0) {
            this.form.imageUrl = res.data.paths;
            //相册图片或视频上传
            service.albumImageAdd(this.form).then(res => {
              if (res.errorCode === 0) {
                this.$refs.form.reset();
                this.$router.go(-1);
              }
            });
          }
        });
      }
    },
  },
  mounted() {}
};
</script>
<style lang="less">
.uploader-file {
  float: left;
  width: 140px;
  height: 140px;
  position: relative;
  background-size: cover;
  margin: 20px 0 0 0;
  border-radius: 4px;
  margin-right: 20px;
  i {
    color: #8d8d8d;
    font-size: 48px;
    position: absolute;
    top: -14%;
    right: -10%;
    z-index: 10;
  }
}
</style>
