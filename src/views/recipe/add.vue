<template>
  <div class="page">
    <div class="page-bd">
      <!-- 开始时间选择 -->
      <van-popup v-model="startTimeShow" position="bottom">
        <van-datetime-picker
          @cancel="startTimeShow = false"
          @confirm="handleConfirmStartTime"
          v-model="startDate"
          type="date"
          :formatter="formatter"
        ></van-datetime-picker>
      </van-popup>
      <!-- 结束时间选择 -->
      <van-popup v-model="endTimeShow" position="bottom">
        <van-datetime-picker
          @cancel="endTimeShow = false"
          @confirm="handleConfirmEndTime"
          v-model="endDate"
          type="date"
          :formatter="formatter"
        ></van-datetime-picker>
      </van-popup>
      <form id="form" action ref="form" method="post">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">起始日期</div>
            <div class="cell-bd" style="padding-left:0">
              <input
                class="input"
                placeholder="请选择起始日期"
                @click="startTimeShow = true"
                v-model="form.startDate"
                readonly
                maxlength="20"
              >
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">结束日期</div>
            <div class="cell-bd" style="padding-left:0">
              <input
                class="input"
                placeholder="请选择结束日期"
                @click="endTimeShow = true"
                v-model="form.endDate"
                readonly
                maxlength="20"
              >
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd"></div>
            <div class="cell-bd" style="padding-left:0">
              <input
                class="input"
                placeholder="请输入食谱标题"
                v-model="form.title"
                maxlength="30"
                style="text-align:left;"
              >
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <textarea
                class="textarea"
                rows="6"
                v-model="form.textContent"
                placeholder="请输入食谱内容..."
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
                <van-icon name="plus" size="40px"></van-icon>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="btn-group">
      <a href="javascript:void(0);" class="btn btn-large btn-primary" @click="handleSubmit">发布</a>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import service from "@/api";
import { textReplace } from "@/utils/string";
import wxHandle from "@/mixins/wx";
import wxapi from "@/config/wxapi";
export default {
  name: "recipeAdd",
  mixins: [wxHandle],
  data() {
    return {
      startTimeShow: false,
      endTimeShow: false,
      startDate: new Date(),
      endDate: new Date(),
      form: {
        openId: this.$store.state.user.info.openId,
        title: "",
        textContent: "",
        images: [],
        startDate: "",
        endDate: ""
      }
    };
  },
  methods: {
    //格式化函数
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    //选择开始时间
    handleConfirmStartTime(value) {
      let now = dayjs(new Date(value).getTime()).format("YYYY-MM-DD");
      this.form.startDate = now;
      this.startTimeShow = false;
    },
    //选择结束时间
    handleConfirmEndTime(value) {
      let now = dayjs(new Date(value).getTime()).format("YYYY-MM-DD");
      this.form.endDate = now;
      this.endTimeShow = false;
    },
    handleSubmit() {
      let { startDate, endDate, title, textContent, ...args } = this.form;
      if (startDate === "") {
        this.$toast("请选择起始日期");
        return;
      }
      if (endDate === "") {
        this.$toast("请选择结束日期");
        return;
      }
      if (title === "") {
        this.$toast("请输入食谱标题");
        return;
      }
      if (textContent === "" && !this.serverId.length) {
        this.$toast("请输入食谱内容或者上传图片");
        return;
      } else {
        textContent = textReplace(textContent) || "";
      }
      let obj = Object.assign({}, args, {
        startDate,
        endDate,
        title,
        textContent
      });
      let params = {
        openId: this.form.openId,
        imgIds: this.serverId
      };
      //如果有上传图片
      if (this.serverId.length) {
        service.imgIds(params).then(res => {
          if (res.errorCode === 0) {
            obj.images = res.data.paths;
            //食谱发布
            service.recipeAdd(obj).then(res => {
              if (res.errorCode === 0) {
                this.$refs.form.reset();
                this.$router.go(-1);
              }
            });
          }
        });
      } else {
        this.recipeAdd(obj);
      }
    },
    async recipeAdd(params = {}) {
      let res = await service.recipeAdd(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
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
