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
      <a href="javascript:void(0);" class="btn btn-large btn-primary" @click="handleSubmit">发布</a>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import service from "@/api";
import { textReplace } from "@/utils/string";
export default {
  name: "recipeAdd",
  data() {
    return {
      startTimeShow: false,
      endTimeShow: false,
      startDate: new Date(),
      endDate: new Date(),
      serverId: [], //微信图片ID
      imagesList: [],
      form: {
        openId: this.$store.state.wx.openId,
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
      let now = moment(new Date(value).getTime()).format("YYYY-MM-DD");
      this.form.startDate = now;
      this.startTimeShow = false;
    },
    //选择结束时间
    handleConfirmEndTime(value) {
      let now = moment(new Date(value).getTime()).format("YYYY-MM-DD");
      this.form.endDate = now;
      this.endTimeShow = false;
    },
    //选图
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
    handleDelImg(index) {
      this.imagesList.splice(index, 1); //移除图片显示
      this.serverId.splice(index, 1); //移除微信图片ID
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
    },
    //通过config接口注入权限验证配置
    getWxConfig() {
      let url = window.location.href.split("#")[0];
      service.sign({ url }).then(res => {
        wx.config({
          debug: false, // 开启调试模式,开发时可以开启
          appId: res.appid, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: [
            "chooseImage",
            "previewImage",
            "uploadImage",
            "downloadImage",
            "getLocalImgData"
          ] // 必填，需要使用的JS接口列表
        });
      });
    }
  },
  created() {
    this.getWxConfig();
  }
};
</script>
<style lang="less">
</style>
