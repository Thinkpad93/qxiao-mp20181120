<template>
  <div class="page">
    <div class="page-bd">
      <form action ref="form" method="post">
        <div class="cells mb-20">
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <ul class="uploader-files">
                <li
                  class="uploader-file"
                  v-for="(item, index) in imagesList"
                  :key="index"
                  :style="{backgroundImage: `url(${item.content})`}"
                >
                  <van-icon
                    name="clear"
                    size="18px"
                    class="clear"
                    @click.stop="handleDelImg(index)"
                  ></van-icon>
                </li>
              </ul>
              <div class="uploader-input_box">
                <van-uploader :after-read="handleRead" accept="image/*" multiple>
                  <van-icon name="plus" size="30px"></van-icon>
                </van-uploader>
              </div>
            </div>
          </div>
          <p class="works-desc">上传班级相册，行动起来吧...</p>
        </div>
      </form>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button type="info" size="large" class="no-radius" @click="handleSubmit">保存</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import wxapi from "@/config/wxapi";
export default {
  name: "albumAdd",
  data() {
    return {
      form: {
        channelId: this.$route.query.channelId,
        teacherId: this.$store.state.user.info.id,
        type: 0, // 0-图片 1-视频
        images: [],
        videoUrl: "" //视频URL
      },
      imagesList: []
    };
  },
  methods: {
    handleRead(file, detail) {
      if (Array.isArray(file)) {
        file.forEach(elem => {
          this.imagesList.push(elem);
        });
      } else {
        //如果用户是单选的图片
        this.imagesList.push(file);
      }
    },
    handleDelImg(index) {
      this.imagesList.splice(index, 1);
    },
    async handleSubmit() {
      if (!this.imagesList.length) {
        this.$toast("请上传相册图片");
        return;
      }
      //配置上传头部信息
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        showLoading: true
      };
      let formData = new FormData();
      this.imagesList.forEach(elem => {
        formData.append("files", elem.file);
      });
      //开始上传文件
      let res = await service.uploadFile(formData, config);
      if (res.errorCode === 0) {
        this.form.images = res.data;
        //相册图片或视频上传
        service.albumImageAdd(this.form).then(res => {
          if (res.errorCode === 0) {
            this.$router.go(-1);
          }
        });
      }
    }
  },
  mounted() {
    wxapi.wxRegister();
  }
};
</script>
<style lang="less" scoped>
.works-desc {
  line-height: 1.4;
  color: #999;
  font-size: 24px;
  padding: 0 30px 30px 30px;
}
</style>
