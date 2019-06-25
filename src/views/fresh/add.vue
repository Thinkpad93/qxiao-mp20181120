<template>
  <div class="flex-page">
    <div class="flex-bd">
      <form action ref="form" method="post">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd"></div>
            <div class="cell-bd" style="padding-left:0">
              <input
                class="input"
                placeholder="请输入速报标题"
                v-model="form.title"
                maxlength="20"
                style="text-align:left;"
              >
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <textarea
                class="textarea"
                placeholder="请输入速报内容..."
                rows="6"
                v-model="form.textContent"
              ></textarea>
            </div>
          </div>
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
                <van-icon name="plus" size="30px"></van-icon>
              </div>
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">发送班级</label>
            </div>
            <div class="cell-bd" style="padding-left:0">
              <select class="select" name="select" dir="rtl" v-model="selected" multiple size="1">
                <!-- 兼容性问题修改 -->
                <optgroup disabled hidden></optgroup>
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
      <div class="btn-group">
        <a href="javascript:void(0);" class="btn btn-large btn-primary" @click="handleSubmit">发布</a>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import classList from "@/mixins/classList";
import wxHandle from "@/mixins/wx";
import { textReplace } from "@/utils/string";
import wxapi from "@/config/wxapi";
export default {
  name: "freshAdd",
  mixins: [wxHandle, classList],
  data() {
    return {
      selected: [],
      form: {
        openId: this.$store.state.user.info.openId,
        title: "",
        textContent: "",
        images: []
      }
    };
  },
  methods: {
    handleSubmit() {
      let { title, textContent, ...args } = this.form;
      if (title === "") {
        this.$toast("请输入速报标题");
        return;
      }
      if (textContent === "" && !this.serverId.length) {
        this.$toast("请输入速报内容或者上传图片");
        return;
      } else {
        this.form.textContent = textReplace(textContent) || "";
      }
      if (!this.selected.length) {
        this.$toast("请选择发送班级");
        return;
      }
      let senders = this.selected.map(item => {
        return { classId: item };
      });
      let params = {
        openId: this.form.openId,
        imgIds: this.serverId
      };

      let obj = Object.assign({}, this.form, { senders });
      //如果有上传图片
      if (this.serverId.length) {
        service.imgIds(params).then(res => {
          if (res.errorCode === 0) {
            obj.images = res.data.paths;
            //发布速报
            service.freshAdd(obj).then(res => {
              if (res.errorCode === 0) {
                this.$refs.form.reset();
                this.$router.go(-1);
              }
            });
          } else {
            this.$toast(`${res.errorMsg}`);
          }
        });
      } else {
        this.freshAdd(obj);
      }
    },
    //速报发送
    async freshAdd(params = {}) {
      let res = await service.freshAdd(params);
      if (res.errorCode === 0) {
        this.$refs.form.reset();
        this.$router.go(-1);
      } else {
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
</style>
