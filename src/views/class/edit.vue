<template>
  <div class="page">
    <div class="page-hd">
      <div class="class-edit-head">
        <a href="javascript:;" class="btn btn-primary">{{ className }}</a>
        <div class="tab">
          <a href="javascript:;" @click="handleTabClick(0)" :class="[index === 0 ? 'curr': '']">关联的老师</a>
          <a href="javascript:;" @click="handleTabClick(1)" :class="[index === 1 ? 'curr': '']">关联的学生</a>
        </div> 
      </div>     
    </div>  
    <div class="page-bd">
      <div class="people-list">
        <div class="item" :class="[index === 0 ? 'on': '']">
          <div class="cells-title">老师列表({{ teacherList.length }})</div>
          <div class="cells">
            <div class="cell student-box" v-for="(teacher, index) in teacherList" :key="index">
              <div class="cell-hd">
                <img class="teacher-icon" src="@/assets/image/109951163721579973.jpg" alt="">
              </div> 
              <div class="cell-bd">
                <p>{{ teacher.teacherName }}</p>
              </div> 
              <div class="cell-ft">
                <span size-14 style="color:#ce3c39" @click="handleMoveTeacher(teacher)">移除</span>
              </div>                                  
            </div>
          </div>
        </div>
        <div class="item" :class="[index === 1 ? 'on': '']">
          <div class="cells-title">学生列表({{ studentList.length }})</div>
          <div class="cells">
            <div class="cell student-box" v-for="(student, index) in studentList" :key="index">
              <div class="cell-hd">
                <img class="teacher-icon" src="@/assets/image/109951163721592032.jpg" alt="">
              </div>   
              <div class="cell-bd">
                <p>{{ student.studentName }}</p>
              </div>   
              <div class="cell-ft">
                <span size-14 style="color:#ce3c39" @click="handleMoveStudent(student)">移除</span>
              </div>                                       
            </div>
          </div>          
        </div>  
      </div>
    </div>  
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "classEdit",
  data() {
    return {
      index: 0,
      query: {
        classId: this.$route.params.id,
        openId: this.$store.getters.openId
      },
      className: "",
      teacherList: [],
      studentList: []
    };
  },
  methods: {
    handleTabClick(index) {
      this.index = index;
      // return index === 0
      //   ? this.classQueryTeacher(this.query)
      //   : this.classQueryStudent(this.query);
    },
    handleMoveStudent(student) {
      let { classId, studentId } = student;
      let obj = Object.assign(
        {},
        { classId, studentId, openId: this.query.openId }
      );
      if (classId && studentId) {
        let confirmDom = this.$weui.confirm(
          "确定要移除学生吗？",
          () => {
            this.classMoveStudent(obj);
          },
          { title: "提示" }
        );
      }
    },
    handleMoveTeacher(teacher) {
      let { classId, teacherId } = teacher;
      let obj = Object.assign(
        {},
        { classId, teacherId, openId: this.query.openId }
      );
      if (classId && teacherId) {
        let confirmDom = this.$weui.confirm(
          "确定要移除老师吗？",
          () => {
            this.classMoveTeacher(obj);
          },
          { title: "提示" }
        );
      }
    },
    //移除班级对应的老师
    async classMoveTeacher(params = {}) {
      let res = await service.classMoveTeacher(params);
      if (res.errorCode === 0) {
        this.classQueryTeacher(this.query);
      }
    },
    //查询班级对应的老师
    async classQueryTeacher(params = {}) {
      let res = await service.classQueryTeacher(params);
      if (res.errorCode === 0) {
        this.teacherList = res.data.teacher;
        this.className = res.data.className;
      }
    },
    //移除班级对应的学生
    async classMoveStudent(params = {}) {
      let res = await service.classMoveStudent(params);
      if (res.errorCode === 0) {
        this.classQueryStudent(this.query);
      }
    },
    //查询班级对应的学生
    async classQueryStudent(params = {}) {
      let res = await service.classQueryStudent(params);
      if (res.errorCode === 0) {
        this.studentList = res.data.student;
      }
    }
  },
  activated() {
    this.classQueryTeacher(this.query);
    this.classQueryStudent(this.query);
  }
};
</script>
<style lang="less">
.class-edit-head {
  padding-top: 40px;
  > a {
    width: 240px;
  }
  .tab {
    display: flex;
    font-size: 30px;
    a {
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
.people-list {
  .item {
    display: none;
  }
  .on {
    display: block;
  }
}
</style>
