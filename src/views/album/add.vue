<template>
  <div class="flex-page">
    <div class="flex-bd">
      <form action ref="form" method="post">
        <div class="cells mb-20">
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <ul class="uploader-files">
                <li
                  class="uploader-file"
                  v-for="(file, index) in imagesList"
                  :key="index"
                  :style="{backgroundImage: `url(${file})`}"
                >
                  <van-icon
                    name="clear"
                    size="18px"
                    class="clear"
                    @click.stop="handleDelImg(index)"
                  ></van-icon>
                </li>
              </ul>
              <div class="uploader-input_box" @click="handleChooseImage">
                <van-icon name="plus" size="40px"></van-icon>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="flex-ft">
      <div class="mamba">
        <a href="javascript:void(0);" class="btn btn-large btn-primary" @click="handleSubmit">保存</a>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import wxHandle from "@/mixins/wx";
export default {
  name: "albumAdd",
  mixins: [wxHandle],
  data() {
    return {
      form: {
        openId: this.$store.state.user.info.openId,
        channelId: this.$route.query.channelId,
        type: 0, // 0-图片 1-视频
        imageUrl: [],
        videoUrl: "" //视频URL
      },
      albumChannel: []
    };
  },
  methods: {
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
    }
  },
  mounted() {
    this.wxSdk.wxShare();
  }
};
</script>
<style lang="less" scoped>
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

.mamba {
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 0 15px 2px rgba(88, 88, 88, 0.1);
  background-color: #fff;

  > a {
    width: 500px;
  }
}
</style>
