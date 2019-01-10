<template>
  <div class="page">
    <div class="page-hd">
      <div class="teacher-head">
        <router-link to="/teacher/add" class="btn btn-primary">录入老师信息</router-link>
        <div class="tab">
          <a href="javascript:;" style="color:#409eff;" size-14>批量导入老师信息</a>
          <a href="javascript:;" style="color:#409eff;" size-14>批量邀请老师</a>
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
            <p>
              {{ teacher.teacherName }}
              <span size-14 v-if="!teacher.openId" style="color: rgb(64, 158, 255);">微信邀请</span>
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
      this.$router.push({ path: `/teacher/edit/${teacher.teacherId}` });
    },
    async queryTeacher(schoolId) {
      let res = await service.queryTeacher({ schoolId });
      if (res.errorCode === 0) {
        this.teacherList = res.data;
      }
    }
  },
  activated() {
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
      flex: 1;
    }
  }
}
.teacher-box {
  padding-top: 20px;
  padding-bottom: 20px;
}
.teacher-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.icon-d {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgb(69, 135, 166);
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
