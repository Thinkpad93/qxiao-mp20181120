<template>
  <div class="page">
    <div class="page-hd">
      <a href="javascript:;" class="btn btn-primary" @click="handleAddTeacher">录入老师信息</a>
      <div class="tab">
        <a href="javascript:;" style="color:#409eff;" size-14>批量导入老师信息</a>
        <a href="javascript:;" style="color:#409eff;" size-14>批量邀请老师</a>
      </div>
    </div>
    <div class="page-bd">
      <div class="cells-title">老师列表({{ teacherList.length }})</div>
      <div class="cells">
        <div class="cell" v-for="(teacher, index) in teacherList" :key="index" @click="handleEditTeacher(teacher)">
          <div class="cell-hd">
            <img class="teacher-icon" src="@/assets/image/109951163721579973.jpg" alt="">
          </div>
          <div class="cell-bd">
            <p>
              {{ teacher.teacherName }}
              <span size-14 v-if="!teacher.openId" style="color: rgb(64, 158, 255);">微信邀请</span>
            </p>
            <small class="and" style="color:#bdbdbd;" v-for="(cla, index) in teacher.classes" :key="index">
              {{ cla.className }}
            </small>
          </div>
          <div class="cell-ft flex">
            <!-- <span size-14>删除</span> -->
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
      query: {
        schoolId: 1
      },
      teacherList: []
    };
  },
  methods: {
    handleEditTeacher(teacher) {
      let { teacherId } = teacher;
      this.$router.push({ path: `/teacher/edit/${teacherId}` });
    },
    handleAddTeacher() {
      this.$router.push({ path: `/teacher/add` });
    },
    async queryTeacher(params = {}) {
      let res = await service.queryTeacher(params);
      if (res.errorCode === 0) {
        this.teacherList = res.data;
      }
    }
  },
  activated() {
    this.queryTeacher(this.query);
  }
};
</script>
<style lang="less" scoped>
.page-hd {
  height: 214px;
  padding-top: 40px;
  background-color: #fff;
  > a {
    width: 240px;
  }
  .tab {
    margin-top: 30px;
    text-align: center;
    display: flex;
    a {
      flex: 1;
    }
  }
}
.cells-title {
  color: #808080;
  font-size: 30px;
  margin: 20px 0;
  padding-left: 30px;
}
.cells {
  font-size: 34px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.cell {
  padding: 20px 30px;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  }
}
.cell-bd {
  flex: 1;
  padding-left: 20px;
}
.teacher-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
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
</style>
