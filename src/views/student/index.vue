<template>
<<<<<<< HEAD
  <div class="flex-page">
    <div class="flex-hd">
      <div class="student-head">
        <router-link to="/student/add" class="btn btn-primary" v-if="openDirection == 0">录入学生信息</router-link>
        <a href="javascript:void(0);" class="btn btn-primary">分享链接</a>
=======
  <div class="page">
    <div class="page-hd">
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;" id="showDatePicker" @click="popupShow = true">
          <span>{{ className }}</span>
          <van-icon name="arrow-down" size="16px"></van-icon>
        </a>
>>>>>>> open-dev
      </div>
    </div>
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="classList"
          show-toolbar
          value-key="className"
          @cancel="popupShow = false"
          @confirm="handleConfirm"
        ></van-picker>
      </van-popup>
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
              <img src="@/assets/child-default@2x.png" width="50" height="50" radius="50">
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
    <div class="page-ft">
      <div class="fixed-bottom">
        <van-button
          type="info"
          size="large"
          class="no-radius"
          @click="handleJumpRoute"
          v-if="openDirection == 0"
        >录入学生</van-button>
        <van-button
          type="info"
          size="large"
          class="no-radius"
          v-else
          @click.stop="visibility = true"
        >点击邀请家长加入</van-button>
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
      popupShow: false,
      className: "",
      classId: null,
      openDirection: 0, // 0-小Q班级流程加入 1-分享流程加入
      teacherId: this.$store.state.user.info.id,
      studentList: [],
      classList: []
    };
  },
  computed: {
    studentCount() {
      return this.studentList.length;
    },
    ...mapState("user", {
<<<<<<< HEAD
      classId: state => state.info.classId,
      experience: state => state.info.experience,
      openDirection: state => state.info.openDirection // 0-小Q班级流程加入 1-分享流程加入
    })
  },
  methods: {
=======
      experience: state => state.info.experience
    })
  },
  methods: {
    handleConfirm(value, index) {
      this.className = value.className;
      this.classId = value.classId;
      this.openDirection = value.openDirection;
      this.queryStudentByClassId(this.classId);
      wxapi.wxRegister(this.wxRegCallback);
    },
>>>>>>> open-dev
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
<<<<<<< HEAD
        shareUrl = API_ROOT + "#/baby/share?classId=" + this.classId;
=======
        shareUrl = API_ROOT + "#/baby/share?classId=" + this.classId + "&id=0";
>>>>>>> open-dev
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
          classId: student.classId,
          openDirection: this.openDirection
        }
      });
    },
    handleJumpRoute() {
      this.$router.push({
        path: "/student/add",
        query: {
          openDirection: this.openDirection
        }
      });
    },
    //查询班级学生
    async queryStudentByClassId(classId) {
      let res = await service.queryStudentByClassId({ classId });
      if (res.errorCode === 0) {
        this.studentList = res.data;
        this.popupShow = false;
      }
    },
    //查询老师管理的班级
    async queryClassNameList(teacherId) {
      let res = await service.queryClassNameList({ teacherId });
      if (res.errorCode === 0) {
        if (res.data.length) {
          this.classList = res.data;
          this.className = res.data[0].className;
          this.classId = res.data[0].classId;
          this.openDirection = res.data[0].openDirection;
          this.queryStudentByClassId(res.data[0].classId);
          wxapi.wxRegister(this.wxRegCallback);
        }
      }
    }
  },
  mounted() {
<<<<<<< HEAD
    this.queryStudentList(this.teacherId);
    wxapi.wxRegister(this.wxRegCallback);
    //this.wxSdk.wxShare();
  }
=======
    this.queryClassNameList(this.teacherId);
  },
  activated() {}
>>>>>>> open-dev
};
</script>
<style lang="less" scoped>
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
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
