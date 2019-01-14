<template>
  <div class="pagea">
    <!-- 发送的班级和老师 -->
    <div class="panel" style="z-index: 999" :class="{'panel-on': isActive}">
      <div class="panel-hd">
        <div class="panel-tab">
          <a href="javascript:void(0);" :class="[tabIndex === 0 ? 'curr': '']" @click="handleTabClick(0)">老师</a>
          <a href="javascript:void(0);" :class="[tabIndex === 1 ? 'curr': '']" @click="handleTabClick(1)">班级</a>
          <a href="javascript:void(0);" :class="[tabIndex === 2 ? 'curr': '']" @click="handleTabClick(2)">老师和班级</a>
        </div>
      </div>
      <div class="panel-bd">
        <!-- 老师列表 -->
        <div class="panel-bd_cell" :style="{display: tabIndex === 0 ? 'block':'none'}">
          <div class="cells weui-cells_checkbox">
            <label class="cell item weui-check__label" v-for="(t,i) in teacherList" :key="i">
              <div class="cell-hd">
                <img class="teacher-icon" src="http://iph.href.lu/50x50" alt="">
              </div>
              <div class="cell-bd">
                <p>{{ t.teacherName }}</p>
              </div>
              <div class="cell-ft">
                <input type="checkbox" class="weui-check" name="checkbox1" v-model="teacherCheckList" :value="t.teacherId">
                <i class="weui-icon-checked"></i>
              </div>
            </label>
          </div>          
        </div>
        <!-- 班级列表 -->
        <div class="panel-bd_cell" :style="{display: tabIndex === 1 ? 'block':'none'}">
          <div class="cells weui-cells_checkbox">
            <label class="cell class-box weui-check__label" v-for="(c,i) in classList" :key="i">
              <div class="cell-hd"></div>
              <div class="cell-bd">
                <p>{{ c.className }}</p>
              </div>
              <div class="cell-ft">
                <input type="checkbox" class="weui-check" name="checkbox1" v-model="classChenkList" :value="c.classId">
                <i class="weui-icon-checked"></i>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="panel-ft">
        <div class="tabbar weui-cells_checkbox">
          <label id="handle" class="weui-check__label">
            <div class="cell-hd">
              <input type="checkbox" class="weui-check" name="checkedAll" v-model="checked" @click="handleCheckAll">
              <i class="weui-icon-checked"></i>
            </div>
            <div class="cell-bd">
              <p>全选</p>
            </div>
          </label>
          <!-- <a href="javascript:void(0);" @click="isActive = false">取消</a> -->
          <a href="javascript:void(0);" id="publish" @click="handleSave">确定</a>
        </div>        
      </div>
    </div>    
    <div class="page-bd">
      <form id="form" action="" ref="form" method="post">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">通知标题</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入通知标题" v-model="form.title" maxlength="20">
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <textarea class="textarea" placeholder="记录下孩子的成长点滴~" rows="6" v-model="form.textContent" maxlength="1000"></textarea>
            </div>
          </div>          
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <ul class="uploader-files">
                <li class="uploader-file" 
                  v-for="(file, index) in imagesList" 
                  :key="index"
                  :style="{backgroundImage: `url(${file})`}">
                  <!-- <img src="@/assets/image/del.png" alt="" @click="handleDelImg(index)"> -->
                </li>
              </ul>
              <div class="uploader-input_box" @click="handleChooseImage">
                <!-- <input name="file" type="file" class="uploader-input" @change="handleChangeFile" multiple="multiple" accept="image/*"> -->
              </div>
            </div>
          </div>      
          <div class="cell cell-input cell-input-after">
            <div class="cell-hd">
              <label for="" class="label">发送对象</label>
            </div>  
            <div class="cell-bd">
              <p class="cell-p" @click="handleChangeSenders">请选择发送对象</p>
            </div>                      
          </div>      
          <div class="cell cell-switch">
            <div class="cell-bd" style="padding-left:0">
              <label for="" class="label">是否需要确定</label>
            </div>   
            <div class="cell-ft">
              <input type="checkbox" v-model="form.needConfirm" class="weui-switch">
            </div>         
          </div>   
          <div class="cell cell-switch">
            <div class="cell-bd" style="padding-left:0">
              <label for="" class="label">是否定时发送</label>
            </div>   
            <div class="cell-ft">
              <input type="checkbox" v-model="form.clockType" class="weui-switch">
            </div>         
          </div>    
          <template v-if="form.clockType">
            <div class="cell">
              <div class="cell-hd">
                <label for="" class="label">定时发送时间</label>
              </div>
              <div class="cell-bd">
                <input class="input" placeholder="请选择发送时间" readonly v-model="form.clockTime" @click="handleShowDatePicker">
              </div>
            </div>  
          </template>                            
        </div>
      </form>
    </div> 
    <div class="btn-area">
      <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">发布</a>
    </div>      
  </div>  
</template>
<script>
import service from "@/api";
import wxConfig from "@/config/wxsdk";
export default {
  namae: "noticeAdd",
  data() {
    return {
      serverId: [], //微信图片ID
      tabIndex: 0,
      isActive: false,
      checked: false, //全选框
      imagesList: [],
      classList: [], //班级列表
      teacherList: [], //老师列表
      teacherCheckList: [], //选中的数据
      classChenkList: [], //选中的数据
      openId: this.$store.getters.openId,
      form: {
        openId: this.$store.getters.openId, //用户openid
        title: "", //通知标题
        textContent: "", //通知内容
        images: [], //图片
        needConfirm: true, //是否需要确认
        senders: [], //发送对象
        sendType: 2, //发送类型 2-老师，1-班级
        clockType: false, //定时发送标志 0-即时发送 1-定时发送
        clockTime: "" //定时发送时间
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
    handleTabClick(index) {
      this.tabIndex = index;
      if (index === 0) {
        this.form.sendType = 2;
        this.teacherCheckList = [];
      } else if (index === 1) {
        this.form.sendType = 1;
        this.classChenkList = [];
      }
      this.checked = false;
    },
    //选择发送对象
    handleChangeSenders() {
      this.isActive = true;
    },
    //选择定时发送时间
    handleShowDatePicker() {
      this.$weui.datePicker({
        start: 1990,
        end: new Date().getFullYear(),
        onConfirm: result => {
          let year = result[0].label;
          let moth = result[1].label;
          let day = result[2].label;
          this.form.clockTime = `${year}${moth}${day}`;
        }
      });
    },
    handleCheckAll() {
      let { sendType } = this.form;
      if (sendType === 2) {
        if (!this.checked) {
          this.teacherList.forEach((item, index) => {
            this.teacherCheckList.push(item.teacherId);
          });
        } else {
          this.teacherCheckList = [];
        }
      } else if (sendType === 1) {
        if (!this.checked) {
          this.classList.forEach((item, index) => {
            this.classChenkList.push(item.classId);
          });
        } else {
          this.classChenkList = [];
        }
      }
      alert(this.checked);
    },
    //保存选择后的数据
    handleSave() {
      //收集数据
      let senders = [];
      let { sendType } = this.form;
      if (sendType === 2) {
        if (!this.teacherCheckList.length) {
          this.$weui.alert("请选择发送对象班级或者老师", () => {}, {
            title: "提示"
          });
          return;
        }
        senders = this.teacherCheckList.map(item => {
          return { sendType, senderId: item };
        });
      } else if (sendType === 1) {
        if (!this.classChenkList.length) {
          this.$weui.alert("请选择发送对象班级或者老师", () => {}, {
            title: "提示"
          });
          return;
        }
        senders = this.classChenkList.map(item => {
          return { sendType, senderId: item };
        });
      }
      //设置选择后的数据
      this.form.senders = senders;
      this.isActive = false;
    },
    handleSubmit() {
      let {
        title,
        textContent,
        clockType,
        needConfirm,
        senders,
        ...args
      } = this.form;
      if (title === "") {
        this.$weui.alert("请输入通知标题", () => {}, {
          title: "提示"
        });
        return;
      }
      if (textContent === "") {
        this.$weui.alert("请输入通知内容", () => {}, {
          title: "提示"
        });
        return;
      }
      if (!senders.length) {
        this.$weui.alert("你还没有选择发送对象", () => {}, {
          title: "提示"
        });
        return;
      }
      clockType === false ? (clockType = 0) : (clockType = 1);
      needConfirm === false ? (needConfirm = 0) : (needConfirm = 1);
      let obj = Object.assign({}, args, {
        title,
        textContent,
        senders,
        clockType,
        needConfirm
      });
      let params = {
        openId: this.openId,
        imgIds: this.serverId
      };
      //如果有上传图片
      if (this.serverId.length) {
        service.imgIds(params).then(res => {
          if (res.errorCode === 0) {
            let loading = this.$weui.loading("正在发布中");
            obj.images = res.data.paths;
            //发布公告
            service.noticeAdd(obj).then(res => {
              if (res.errorCode === 0) {
                loading.hide();
                this.$refs.form.reset();
                this.$router.go(-1);
              }
            });
          }
        });
      } else {
        this.noticeAdd(obj);
      }
    },
    //公告发送
    async noticeAdd(params = {}) {
      let res = await service.noticeAdd(params);
      if (res.errorCode === 0) {
        this.$refs.form.reset();
        this.$weui.alert(
          "发布成功",
          () => {
            this.$router.go(-1);
          },
          { title: "提示" }
        );
      }
    },
    //根据OpenId获取学校的班级信息
    async classInfo(openId) {
      let res = await service.classInfo({ openId: this.openId });
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //根据OpneId获取所有老师列表
    async classTeacher() {
      let res = await service.classTeacher({ openId: this.openId });
      if (res.errorCode === 0) {
        this.teacherList = res.data;
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
    this.classInfo();
    this.classTeacher();
  }
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
  img {
    position: absolute;
    top: -10%;
    right: -10%;
    z-index: 10;
  }
}
.panel {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1078;
  width: 100%;
  min-height: 100vh;
  background: #f2f2f2;
  transition: transform ease 0.3s;
  transform: translateX(100%);
}
.panel-on {
  transform: translateX(0%);
}
.panel-bd {
  flex: 1;
  overflow-y: auto;
}
.panel-ft {
  height: 100px;
}
.panel-tab {
  display: flex;
  font-size: 32px;
  background-color: #fff;
  a {
    color: #d7d7d7;
    height: 100px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .curr {
    color: #92cd36;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      display: block;
      width: 50%;
      height: 4px;
      background-color: #92cd36;
      transform: translateX(-50%);
    }
  }
}
.teacher-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.tabbar {
  font-size: 32px;
  display: flex;
  background-color: #fff;
  > a {
    width: 200px;
    height: 100px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9acb4d;
    border-left: 1px solid #fff;
  }
}
#handle {
  flex: 1;
  display: flex;
  align-items: center;
}
.panel-bd_cell {
  .item {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
.class-box {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
