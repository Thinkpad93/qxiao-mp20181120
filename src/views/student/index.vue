<template>
  <div class="flex-page">
    <div class="flex-hd">
      <div class="student-head">
        <a href="javascript:;" class="btn btn-primary" @click="handleAddStudent">录入学生信息</a>
        <div class="tab">
          <a href="javascript:;" style="color:#409eff;" size-14 @click="visible = true">批量导入学生信息</a>
          <a href="javascript:;" style="color:#409eff;" size-14 @click="visibility = true">批量邀请学生家长</a>
        </div>
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
      teacherId: this.$store.state.user.info.id,
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
        query: {
          tel: student.tel,
          studentId: student.studentId,
          classId: student.classId
        }
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
    }
  },
  mounted() {
    this.queryStudentList(this.teacherId);
  },
  activated() {}
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
