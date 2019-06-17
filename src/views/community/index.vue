<template>
  <div class="page">
    <div class="page-bd" style="background-color:#fff;">
      <form action ref="form" method="post">
        <div class="cells">
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <textarea
                class="textarea"
                placeholder="记录下孩子的成长点滴..."
                rows="10"
                v-model="form.textContent"
              ></textarea>
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <ul class="uploader-files">
                <li
                  class="uploader-file"
                  @click="handlePreviewImage(item)"
                  v-for="(item, index) in imagesList"
                  :key="index"
                  :style="{backgroundImage: `url(${item})`}"
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
                <van-icon name="plus" size="30px"></van-icon>
              </div>
            </div>
          </div>
          <div class="cell cell-input cell-input-after">
            <div class="cell-hd">
              <label for class="label">发送班级</label>
            </div>
            <div class="cell-bd" style="padding-left:0">
              <select class="select" name="select" dir="rtl" v-model="form.classId">
                <option
                  :value="option.classId"
                  v-for="(option,index) in classList"
                  :key="index"
                >{{ option.className }}</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="btn-group">
      <a
        href="javascript:;"
        class="btn btn-large btn-primary"
        id="btn-Submission"
        @click="handleSubmit"
      >发布</a>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import classList from "@/mixins/classList";
import wxHandle from "@/mixins/wx";
import wxapi from "@/config/wxapi";
export default {
  name: "community",
  mixins: [wxHandle, classList],
  data() {
    return {
      form: {
        openId: this.$store.state.user.info.openId,
        classId: this.$store.state.user.info.classId,
        studentId: this.$store.state.user.info.studentId,
        contentType: 0,
        textContent: "",
        images: [],
        video: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      let { textContent, ...args } = this.form;
      if (textContent == "" && !this.serverId.length) {
        this.$toast("请输入内容或者上传图片");
        return;
      }
      let params = {
        openId: this.form.openId,
        imgIds: this.serverId
      };
      let obj = Object.assign({}, args, { textContent });
      //如果有上传图片
      if (this.serverId.length) {
        //先上传图片ID给后端去下载图片
        service.imgIds(params).then(res => {
          if (res.errorCode === 0) {
            obj.images = res.data.paths;
            //在发布班级圈
            service.communityAdd(obj).then(res => {
              if (res.errorCode === 0) {
                this.$router.go(-1);
              }
            });
          }
        });
      } else {
        this.communityAdd(obj);
      }
    },
    //发布班级圈
    async communityAdd(params = {}) {
      let res = await service.communityAdd(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    wxapi.wxRegister();
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
</style>

