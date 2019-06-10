<template>
  <div class="flex-page">
    <div class="flex-hd">
      <div class="student-head">
        <router-link to="/student/add" class="btn btn-primary" v-if="openDirection == 0">录入学生信息</router-link>
        <a href="javascript:void(0);" class="btn btn-primary">分享链接</a>
      </div>
    </div>
    <div class="flex-bd">
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
          <img src="@/assets/share-tip.png">
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
          <div class="cell-bd pl-20">
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
import { mapState } from "vuex";
import { API_ROOT } from "@/config/isdev";
import wxapi from "@/config/wxapi";
export default {
  name: "student",
  components: {
    "v-dialog": dialog
  },
  data() {
    return {
      visible: false,
      visibility: false,
      teacherId: this.$store.state.user.info.id,
      studentList: []
    };
  },
  computed: {
    studentCount() {
      return this.studentList.length;
    },
    ...mapState("user", {
      classId: state => state.info.classId,
      experience: state => state.info.experience,
      openDirection: state => state.info.openDirection // 0-小Q班级流程加入 1-分享流程加入
    })
  },
  methods: {
    wxRegCallback() {
      //用于微信JS-SDK回调
      this.wxShareAppMessage();
    },
    wxShareAppMessage() {
      let that = this;
      let shareUrl = "";
      if (this.openDirection == 0) {
        shareUrl = API_ROOT + "#/share";
      } else {
        shareUrl = API_ROOT + "#/baby/share?classId=" + this.classId;
      }
      let option = {
        title: "亲爱的用户您好", // 分享标题
        desc: "小Q智慧欢迎您的加入", // 分享描述
        link: shareUrl, // 分享链接，根据自身项目决定是否需要split
        success: () => {
          that.$toast("分享成功");
        },
        error: () => {
          that.$toast("已取消分享");
        }
      };
      wxapi.wxShareAppMessage(option);
    },
    handleOnCancel(state) {
      this.visible = state;
    },
    handleOnConfirm() {
      console.log("confirm");
    },
    handleEditStudent(student) {
      this.$router.push({
        path: `/student/edit`,
        query: {
          tel: student.tel,
          studentId: student.studentId,
          classId: student.classId
        }
      });
    },
    //学生列表
    async queryStudentList(teacherId) {
      let res = await service.queryStudentList({ teacherId });
      if (res.errorCode === 0) {
        this.studentList = res.data;
      }
    }
  },
  mounted() {
    this.queryStudentList(this.teacherId);
    wxapi.wxRegister(this.wxRegCallback);
    //this.wxSdk.wxShare();
  }
};
</script>
<style lang="less" scoped>
.student-head {
  padding: 30px 0;
  text-align: center;
  background-color: #fff;
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
