<template>
  <div class="page">
    <div class="page-hd">
      <div class="student-head">
        <a href="javascript:;" class="btn btn-primary" @click="handleAddStudent">录入学生信息</a>
        <div class="tab">
          <a href="javascript:;" style="color:#409eff;" size-14 @click="visible = true">批量导入学生信息</a>
          <a href="javascript:;" style="color:#409eff;" size-14 @click="visibility = false">批量邀请学生家长</a>
        </div>
      </div>
    </div>
    <div class="page-bd">
      <v-dialog
        title="提示"
        :visible="visible"
        @on-cancel="handleOnCancel"
        @on-confirm="handleOnConfirm"
      >
        <p>请登陆管理后台进行批量操作</p>
      </v-dialog>
      <template v-if="visibility">
        <div class="overlay" @click="visibility = false"></div>
        <div class="share-tip">
          <img src="@/assets/image/share-tip.png">
          <p size-18>请点击右上角按钮邀请好友吧</p>
        </div>
      </template>
      <div class="cells-title">学生家长列表({{ studentCount }})</div>
      <div class="cells">
        <div
          class="cell student-box"
          v-for="(student, index) in studentList"
          :key="index"
          @click="handleEditStudent(student)"
        >
          <div class="cell-hd">
            <template v-if="student.photo">
              <img class="student-icon" :src="student.photo" alt>
            </template>
            <template v-else>
              <div class="icon-d"></div>
            </template>
          </div>
          <div class="cell-bd">
            <p>
              {{ student.studentName }}
              <span
                size-14
                v-if="!student.openId"
                @click.stop="visibility = true"
                style="color: rgb(64, 158, 255);margin-left:10px;"
              >微信邀请</span>
            </p>
            <small class="and" style="color:#bdbdbd;">{{ student.tel }}</small>
            <small class="and" style="color:#bdbdbd;">{{ student.className }}</small>
          </div>
          <div class="cell-ft flex">
            <template>
              <span size-14 v-if="student.openId" style="color:#92cd36">已加入</span>
              <span size-14 v-else style="color:#ff87b7">未加入</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import dialog from "@/components/dialog";
export default {
  name: "student",
  components: {
    "v-dialog": dialog
  },
  data() {
    return {
      visible: false,
      visibility: false,
      teacherId: this.$store.getters.id,
      studentList: []
    };
  },
  computed: {
    studentCount() {
      return this.studentList.length;
    }
  },
  methods: {
    handleOnCancel(state) {
      this.visible = state;
    },
    handleOnConfirm() {
      console.log("confirm");
    },
    handleEditStudent(student) {
      this.$router.push({
        path: `/student/edit`,
        query: { tel: student.tel, studentId: student.studentId }
      });
    },
    handleAddStudent() {
      this.$router.push({ path: `/student/add` });
    },
    //学生列表
    async queryStudentList(teacherId) {
      let res = await service.queryStudentList({ teacherId });
      if (res.errorCode === 0) {
        this.studentList = res.data;
      }
    },
    //通过config接口注入权限验证配置
    getWxConfig() {
      let url = window.location.href.split("#")[0];
      let IS_DEV = process.env.NODE_ENV !== "production";
      let shareUrl = IS_DEV
        ? "http://232a9x6385.51mypc.cn/#/share?roleType=3"
        : "http://zc.qxiao.net/qxiao-mp/#/share?roleType=3";
      service.sign({ url }).then(res => {
        wx.config({
          debug: false, // 开启调试模式,开发时可以开启
          appId: res.appid, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: ["onMenuShareAppMessage", "showMenuItems", "hideMenuItems"] // 必填，需要使用的JS接口列表
        });
        //config信息验证后会执行ready方法
        wx.error(res => {
          console.log(res);
        });
        wx.ready(() => {
          wx.hideMenuItems({
            menuList: [
              "menuItem:share:qq",
              "menuItem:share:weiboApp",
              "menuItem:share:QZone",
              "menuItem:favorite"
            ]
          });
          wx.onMenuShareAppMessage({
            title: "亲爱的学生家长您好", // 分享标题
            desc: "小Q智慧欢迎您的加入", // 分享描述
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://h5.ztuo.cn/img/shareimg.jpg", // 分享图标
            success: res => {
              console.log(res);
            },
            fail: error => {
              console.log(error);
            }
          });
        });
      });
    }
  },
  mounted() {
    //请求配置
    this.getWxConfig();
    this.queryStudentList(this.teacherId);
  },
  activated() {}
};
</script>
<style lang="less">
.student-head {
  padding: 30px 0;
  text-align: center;
  > a {
    width: 240px;
  }
  .tab {
    margin-top: 30px;
    text-align: center;
    display: flex;
    a {
      height: auto;
      flex: 1;
    }
  }
}
.student-box {
  height: 120px;
}
.student-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
