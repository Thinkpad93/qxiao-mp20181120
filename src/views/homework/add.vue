<template>
  <div class="pages">
    <div class="page-bd">
      <form action ref="form" method="post">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd"></div>
            <div class="cell-bd" style="padding-left:0">
              <input
                class="input"
                placeholder="请输入作业标题"
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
                rows="6"
                placeholder="请输入作业内容..."
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
                  <i class="iconfont icon-guanbi2fill" @click.stop="handleDelImg(index)"></i>
                </li>
              </ul>
              <div class="uploader-input_box" @click="handleChooseImage">
                <van-icon name="plus" size="40px"></van-icon>
              </div>
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">发送班级</label>
            </div>
            <div class="cell-bd">
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
          <div class="cell cell-switch">
            <div class="cell-bd" style="padding-left:0">
              <label for class="label">是否需要确定</label>
            </div>
            <div class="cell-ft">
              <van-switch v-model="needSwitch" size="28px" active-color="#92cd36"></van-switch>
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
import { mapState } from "vuex";
import service from "@/api";
import { textReplace } from "@/utils/string";
export default {
  name: "homeWorkAdd",
  data() {
    return {
      serverId: [], //微信图片ID
      imagesList: [],
      selected: [],
      needSwitch: false,
      form: {
        openId: this.$store.state.user.info.openId,
        title: "",
        textContent: "",
        images: [],
        needConfirm: 0, //0-无需确认 1-需要确认
        senders: []
      }
    };
  },
  computed: {
    ...mapState("queryClass", {
      classList: state => state.classList
    })
  },
  methods: {
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
      let { title, textContent } = this.form;
      if (title == "") {
        this.$toast("请输入作业标题");
        return;
      }
      if (textContent == "" && !this.serverId.length) {
        this.$toast("请输入作业内容或者上传图片");
        return;
      } else {
        this.form.textContent = textReplace(textContent) || "";
      }

      if (!this.selected.length) {
        this.$toast("请选择发送班级");
        return;
      }
      if (this.needSwitch) {
        this.form.needConfirm = 1;
      }
      this.form.senders = this.selected.map(item => {
        return { classId: item };
      });

      let params = {
        openId: this.form.openId,
        imgIds: this.serverId
      };
      //如果有上传图片
      if (this.serverId.length) {
        service.imgIds(params).then(res => {
          if (res.errorCode === 0) {
            this.form.images = res.data.paths;
            //发布亲子作业
            service.homeworkAdd(this.form).then(res => {
              if (res.errorCode === 0) {
                this.$refs.form.reset();
                this.$router.go(-1);
              }
            });
          }
        });
      } else {
        this.homeworkAdd(this.form);
      }
    },
    //作业发布
    async homeworkAdd(params = {}) {
      let res = await service.homeworkAdd(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>
