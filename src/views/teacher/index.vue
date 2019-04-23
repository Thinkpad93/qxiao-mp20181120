<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="teacher-head">
        <router-link to="/teacher/add" class="btn btn-primary">录入老师信息</router-link>
        <div class="tab">
          <a href="javascript:void(0);" style="color:#409eff;" size-14>批量导入老师信息</a>
          <a
            href="javascript:void(0);"
            style="color:#409eff;"
            size-14
            @click="visibility = true"
          >批量邀请老师</a>
        </div>
      </div>
      <template v-if="visibility">
        <div class="overlay" @click="visibility = false"></div>
        <div class="share-tip">
          <img src="@/assets/image/share-tip.png">
          <p size-18>请点击右上角按钮邀请好友吧</p>
        </div>
      </template>
      <div class="cells-title">老师列表({{ list.length }})</div>
      <div class="cells">
        <div
          class="cell teacher-box"
          v-for="(teacher, index) in list"
          :key="index"
          @click="handleEditTeacher(teacher)"
        >
          <div class="cell-hd">
            <template v-if="teacher.photo">
              <img class="teacher-icon" :src="teacher.photo" alt>
            </template>
            <template v-else>
              <div class="icon-d"></div>
            </template>
          </div>
          <div class="cell-bd">
            <p>
              {{ teacher.teacherName }}
              <span
                size-14
                v-if="!teacher.openId"
                @click.stop="visibility = true"
                style="color: rgb(64, 158, 255);margin-left:10px;"
              >微信邀请</span>
            </p>
            <small
              class="and"
              style="color:#bdbdbd;"
              v-for="(cla, index) in teacher.classes"
              :key="index"
            >{{ cla.className }}</small>
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
      visibility: false,
      schoolId: this.$store.state.user.info.id,
      list: []
    };
  },
  methods: {
    handleEditTeacher(teacher) {
      this.$router.push({
        path: "/teacher/edit",
        query: { teacherId: teacher.teacherId }
      });
    },
    async queryTeacher(schoolId) {
      let res = await service.queryTeacher({ schoolId });
      if (res.errorCode === 0) {
        this.list = res.data;
      }
    }
  },
  mounted() {
    this.queryTeacher(this.schoolId);
  }
};
</script>
<style lang="less" scoped>
.teacher-head {
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
.teacher-box {
  min-height: 120px;
}
.teacher-icon {
  width: 100px;
  height: 100px;
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
.and {
  margin-right: 10px;
}
</style>
