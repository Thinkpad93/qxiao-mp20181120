<template>
  <div class="page">
    <div class="page-bd">
      <form action="" ref="form" method="post">
        <div class="cells">
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <textarea class="textarea" placeholder="记录下孩子的成长点滴~" rows="10" v-model="form.textContent"></textarea>
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <ul class="uploader-files">
                <li class="uploader-file" 
                  @click="handlePreviewImage(item)"
                  v-for="(item, index) in imagesList" 
                  :key="index"
                  :style="{backgroundImage: `url(${item})`}">
                  <i class="iconfont icon-guanbi2fill" @click.stop="handleDelImg(index)"></i>
                </li>
              </ul>
              <div class="uploader-input_box" @click="handleChooseImage"></div>
            </div>
          </div>         
          <div class="cell cell-input cell-input-after">
            <div class="cell-hd">
              <label for="" class="label">发送班级</label>
            </div>  
            <div class="cell-bd" style="padding-left:0">
              <select class="select" name="select" dir="rtl" v-model="form.classId">
                <option :value="option.classId" v-for="(option,index) in classList" :key="index">{{ option.className }}</option>                
              </select>
              <!-- <input type="text" readonly class="input" placeholder="请选择发送的班级" @click="handleSelectClass" v-model="className"> -->
            </div>                      
          </div>
        </div>
      </form>
    </div>  
    <div class="btn-area">
      <a href="javascript:;" class="btn btn-primary" id="btn-Submission" @click="handleSubmit">发布</a>
    </div>      
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "community",
  data() {
    return {
      className: this.$store.getters.className,
      imagesList: [],
      serverId: [], //微信图片ID
      classList: [], //
      query: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      form: {
        openId: this.$store.getters.openId,
        classId: this.$store.getters.classId,
        contentType: 0,
        textContent: "",
        images: [],
        video: ""
      }
    };
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
      let obj = {
        openId: this.$store.getters.openId,
        imgIds: this.serverId
      };
      let { textContent, classId } = this.form;
      if (textContent == "" || !this.serverId.length) {
        this.$weui.alert("请输入内容或者上传图片", () => {}, { title: "提示" });
        return;
      }
      //先上传图片ID给后端去下载图片
      service.imgIds(obj).then(res => {
        if (res.errorCode === 0) {
          let loading = this.$weui.loading("正在发布中");
          this.form.images = res.data.paths;
          //在发布班级圈
          service.communityAdd(this.form).then(res => {
            if (res.errorCode === 0) {
              loading.hide();
              this.$router.go(-1);
            }
          });
        }
      });
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //发布班级圈
    async communityAdd(params = {}) {
      let res = await service.communityAdd(params);
      if (res.errorCode === 0) {
        this.$weui.alert(
          "发布成功",
          () => {
            this.$router.go(-1);
          },
          { title: "提示" }
        );
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
    //请求配置
    this.getWxConfig();
  },
  mounted() {
    this.queryClassId(this.query);
  }
};
</script>
<style lang="less">
.page-bd {
  background-color: #fff;
}
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

