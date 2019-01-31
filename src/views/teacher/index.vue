<template>
  <div class="page">
    <div class="page-hd">
      <div class="teacher-head">
        <router-link to="/teacher/add" class="btn btn-primary">录入老师信息</router-link>
        <div class="tab">
          <a href="javascript:void(0);" style="color:#409eff;" size-14>批量导入老师信息</a>
          <a href="javascript:void(0);" style="color:#409eff;" size-14>批量邀请老师</a>
        </div>
      </div>
    </div>
    <div class="page-bd">
      <div class="cells-title">老师列表({{ teacherList.length }})</div>
      <div class="cells">
        <div class="cell teacher-box" v-for="(teacher, index) in teacherList" :key="index" @click="handleEditTeacher(teacher)">
          <div class="cell-hd">
            <template v-if="teacher.photo">
              <img class="teacher-icon" :src="teacher.photo" alt="">
            </template>
            <template v-else>
              <div class="icon-d"></div>
            </template>
          </div>
          <div class="cell-bd">
            <p>{{ teacher.teacherName }}<span size-14 v-if="!teacher.openId" @click.stop="handleShare" style="color: rgb(64, 158, 255);margin-left:10px;">微信邀请</span>
            </p>
            <small class="and" style="color:#bdbdbd;" v-for="(cla, index) in teacher.classes" :key="index">{{ cla.className }}</small>
          </div>
          <div class="cell-ft flex">
            <template>
              <span size-14 v-if="teacher.openId" style="color:#92cd36">已加入</span>
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
export default {
  name: "teacher",
  data() {
    return {
      schoolId: this.$store.getters.id,
      teacherList: []
    };
  },
  methods: {
    handleEditTeacher(teacher) {
      this.$router.push({
        path: "/teacher/edit",
        query: { teacherId: teacher.teacherId }
      });
      //this.$router.push({ path: `/teacher/edit/${teacher.teacherId}` });
    },
    async queryTeacher(schoolId) {
      let res = await service.queryTeacher({ schoolId });
      if (res.errorCode === 0) {
        this.teacherList = res.data;
      }
    },
    //分享功能
    handleShare() {
      this.$toast("请点击右上角发送给朋友");
      // wx.showMenuItems({
      //   menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]
      // });
    },
    //通过config接口注入权限验证配置
    getWxConfig() {
      let url = window.location.href.split("#")[0];
      let IS_DEV = process.env.NODE_ENV !== "production";
      let shareUrl = IS_DEV
        ? "http://232a9x6385.51mypc.cn/#/share"
        : "http://zc.qxiao.net/qxiao-mp/#/share";
      // http://23ti245684.imwork.net/qxiao-mp/
      // http://zc.qxiao.net/qxiao-mp/#/share
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
          //如果是分享给老师的，默认加上roleType字段
          wx.onMenuShareAppMessage({
            title: "亲爱的老师您好", // 分享标题
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
    this.queryTeacher(this.schoolId);
  }
};
</script>
<style lang="less">
.teacher-head {
  padding: 30px 0;
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
.teacher-box {
  padding-top: 20px;
  padding-bottom: 20px;
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
.status {
  color: #ff87b7;
}
.btn-del {
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: #ce3c39;
}
.and {
  margin-right: 10px;
}
</style>
