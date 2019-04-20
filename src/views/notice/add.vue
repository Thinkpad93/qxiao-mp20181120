<template>
  <div class="pagea">
    <!-- 发送的班级和老师 -->
    <div class="panel" style="z-index: 999" :class="{'panel-on': isActive}">
      <div class="panel-hd">
        <van-tabs color="#92cd36" :line-height="2" @click="handleTabClick">
          <van-tab title="班级"></van-tab>
          <van-tab title="老师"></van-tab>
        </van-tabs>
      </div>
      <div class="panel-bd">
        <!-- 班级列表 -->
        <div class="panel-bd_cell" :style="{display: tabIndex === 0 ? 'block':'none'}">
          <div class="cells weui-cells_checkbox">
            <label class="cell class-box weui-check__label" v-for="(c,i) in classList" :key="i">
              <div class="cell-hd"></div>
              <div class="cell-bd" style="padding-left:0">
                <p>{{ c.className }}</p>
              </div>
              <div class="cell-ft">
                <van-checkbox-group v-model="classChenkList">
                  <van-checkbox :key="c.classId" :name="c.classId" checked-color="#92cd36"></van-checkbox>
                </van-checkbox-group>
              </div>
            </label>
          </div>
        </div>
        <!-- 老师列表 -->
        <div class="panel-bd_cell" :style="{display: tabIndex === 1 ? 'block':'none'}">
          <div class="cells weui-cells_checkbox">
            <label class="cell item weui-check__label" v-for="(t,i) in teacherList" :key="i">
              <div class="cell-bd" style="padding-left:0">
                <p>{{ t.teacherName }}</p>
              </div>
              <div class="cell-ft">
                <van-checkbox-group v-model="teacherCheckList">
                  <van-checkbox :key="t.teacherId" :name="t.teacherId" checked-color="#92cd36"></van-checkbox>
                </van-checkbox-group>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="panel-ft">
        <div class="tabbar weui-cells_checkbox">
          <label id="handle" class="cell weui-check__label">
            <div class="cell-hd">
              <van-checkbox v-model="checked" @change="handleCheckAll" checked-color="#92cd36">全选</van-checkbox>
            </div>
          </label>
          <a href="javascript:void(0);" id="publish" @click="handleSave">确定</a>
        </div>
      </div>
    </div>
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-datetime-picker
          ref="datetime"
          @cancel="popupShow = false"
          @confirm="handleShowDatePicker"
          v-model="currentDate"
          type="date"
        ></van-datetime-picker>
      </van-popup>
      <form id="form" action ref="form" method="post">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd"></div>
            <div class="cell-bd" style="padding-left:0">
              <input
                class="input"
                placeholder="请输入通知标题"
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
                placeholder="请输入公告通知内容..."
                rows="6"
                v-model="form.textContent"
                maxlength="5000"
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
          <div class="cell cell-input cell-input-after">
            <div class="cell-hd">
              <label for class="label">发送对象</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p" @click="isActive = true">
                <span v-if="checkTotal">已选择{{ checkTotal }}项</span>
                <span v-else>请选择发送对象</span>
              </p>
            </div>
          </div>
          <div class="cell cell-switch">
            <div class="cell-bd" style="padding-left:0">
              <label for class="label">是否需要确定</label>
            </div>
            <div class="cell-ft">
              <van-switch v-model="form.needConfirm" size="28px" active-color="#92cd36"></van-switch>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="btn-group">
      <a href="javascript:;" class="btn btn-large btn-primary" @click="handleSubmit">发布</a>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { textReplace } from "@/utils/string";
import service from "@/api";
export default {
  namae: "noticeAdd",
  data() {
    return {
      popupShow: false,
      currentDate: new Date(),
      serverId: [], //微信图片ID
      tabIndex: 0,
      isActive: false,
      checked: false, //全选框
      imagesList: [],
      classList: [], //班级列表
      teacherList: [], //老师列表
      teacherCheckList: [], //选中的数据
      classChenkList: [], //选中的数据
      openId: this.$store.state.user.info.openId,
      form: {
        openId: this.$store.state.user.info.openId, //用户openid
        title: "", //通知标题
        textContent: "", //通知内容
        images: [], //图片
        needConfirm: true, //是否需要确认 0-无需确认 1-需要确认
        senders: [], //发送对象
        sendType: 1, //发送类型 2-老师，1-班级
        clockType: false, //定时发送标志 0-即时发送 1-定时发送
        clockTime: "" //定时发送时间
      }
    };
  },
  computed: {
    checkTotal() {
      return this.form.sendType === 2
        ? this.teacherCheckList.length
        : this.classChenkList.length;
    }
  },
  methods: {
    handleShowDatePicker(value) {
      let now = moment(new Date(value).getTime()).format("YYYY-MM-DD");
      this.form.clockTime = now;
      this.popupShow = false;
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
    handleTabClick(index) {
      this.tabIndex = index;
      if (index === 0) {
        this.form.sendType = 1;
        this.classChenkList = [];
      } else if (index === 1) {
        this.form.sendType = 2;
        this.teacherCheckList = [];
      }
      this.checked = false;
    },
    //选择发送对象
    // handleChangeSenders() {
    //   this.isActive = true;
    // },
    handleCheckAll(value) {
      let { sendType } = this.form;
      if (sendType === 2) {
        if (value) {
          this.teacherCheckList = []; //考虑到有可能已经选了
          this.teacherList.forEach((item, index) => {
            this.teacherCheckList.push(item.teacherId);
          });
        } else {
          this.teacherCheckList = [];
        }
      } else if (sendType === 1) {
        if (value) {
          this.classChenkList = []; //考虑到有可能已经选了
          this.classList.forEach((item, index) => {
            this.classChenkList.push(item.classId);
          });
        } else {
          this.classChenkList = [];
        }
      }
    },
    //保存选择后的数据
    handleSave() {
      //收集数据
      let senders = [];
      let { sendType } = this.form;
      if (sendType === 2) {
        if (!this.teacherCheckList.length) {
          this.$toast("请选择发送对象班级或者老师");
          return;
        }
        senders = this.teacherCheckList.map(item => {
          return { sendType, senderId: item };
        });
      } else if (sendType === 1) {
        if (!this.classChenkList.length) {
          this.$toast("请选择发送对象班级或者老师");
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
        this.$toast("请输入通知标题");
        return;
      }
      if (textContent === "" && !this.serverId.length) {
        this.$toast("请输入通知内容或者上传图片");
        return;
      } else {
        textContent = textReplace(textContent) || "";
      }
      if (!senders.length) {
        this.$toast("你还没有选择发送对象");
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
            obj.images = res.data.paths;
            //发布公告
            service.noticeAdd(obj).then(res => {
              if (res.errorCode === 0) {
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
        this.$router.go(-1);
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
    }
  },
  mounted() {
    this.classInfo();
    this.classTeacher();
  }
};
</script>
<style lang="less" scoped>
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
  flex-grow: 1;
  overflow-y: scroll;
}
.panel-ft {
}
.teacher-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.icon-d {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f2f2f2;
}

.tabbar {
  height: 100px;
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
    height: 100px;
  }
}
.class-box {
  height: 100px;
}
</style>
