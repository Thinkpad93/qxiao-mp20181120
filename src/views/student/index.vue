<template>
  <div class="page">
    <div class="page-hd">
      <div class="student-head">
        <a href="javascript:;" class="btn btn-primary" @click="handleAddStudent">录入学生信息</a>
        <div class="tab">
          <a href="javascript:;" style="color:#409eff;" size-14>批量导入学生信息</a>
          <a href="javascript:;" style="color:#409eff;" size-14>批量邀请学生学长</a>
        </div>
      </div>
    </div>
    <div class="page-bd">
      <div class="cells-title">学生家长列表({{ studentList.length }})</div>
      <div class="cells">
        <div class="cell student-box" v-for="(student, index) in studentList" :key="index" @click="handleEditStudent(student)">
          <div class="cell-hd">
            <img class="teacher-icon" src="@/assets/image/109951163721579973.jpg" alt="">
          </div>  
          <div class="cell-bd">
            <p>
              {{ student.studentName }}
              <template>
                <span v-if="student.relation === 1">(妈妈)</span>
                <span v-else-if="student.relation === 2">(爸爸)</span>
                <span v-else-if="student.relation === 3">(爷爷)</span>
                <span v-else-if="student.relation === 4">(奶奶)</span>
                <span v-else-if="student.relation === 5">(外公)</span>
                <span v-else>(外婆)</span>
              </template>
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
export default {
  name: "student",
  data() {
    return {
      teacherId: this.$store.getters.id,
      studentList: []
    };
  },
  methods: {
    handleEditStudent(student) {
      let { tel } = student;
      this.$router.push({ path: `/student/edit/${tel}` });
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
  activated() {
    this.queryStudentList(this.teacherId);
  }
};
</script>
<style lang="less">
.student-head {
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
.student-box {
  padding-top: 20px;
  padding-bottom: 20px;
}
.teacher-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
