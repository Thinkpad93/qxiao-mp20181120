<template>
  <div class="page">
    <div class="page-hd">
      <div class="class-head">
        <router-link to="/class/add" class="btn btn-primary">添加班级</router-link>
      </div>
    </div>
    <div class="page-bd">
      <div class="cells">
        <div class="cell class-box" 
          @click="handleEditClass(item.classId)"
          v-for="(item, index) in classList" :key="index">
          <div class="cell-bd">
            <p size-17 class="text-ellipsis">{{ item.className }}</p>
            <p>
              <span class="t" size-12>带班老师{{ item.countTeacher }}人</span>
              <span class="s" size-12>关联学生{{ item.countStudent }}人</span>
            </p>
          </div>
          <div class="cell-ft flex">
            <a href="javascript:;" class="btn btn-del" size-12 @click.stop="handleDelClass(item)">删除</a>
            <!-- <a href="javascript:;" class="btn btn-edit" size-12 @click="handleEditClass(item.classId)">编辑</a> -->
          </div>
        </div> 
      </div>
    </div>
  </div>  
</template>
<script>
import { Toast } from "vant";
import service from "@/api";
export default {
  name: "class",
  data() {
    return {
      schoolId: this.$store.getters.id,
      openId: this.$store.getters.openId,
      classList: []
    };
  },
  methods: {
    handleAddClass() {
      this.$router.push({ path: `/class/add` });
    },
    handleDelClass(params) {
      let { classId, countStudent, countTeacher } = params;
      if (countStudent > 0 || countTeacher > 0) {
        Toast("班级还有关联学生和老师，不能删除班级");
        return;
      }
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除班级吗？"
        })
        .then(() => {
          this.classDelete({ classId, openId: this.openId });
        })
        .catch(() => {});
    },
    handleEditClass(classId) {
      this.$router.push({
        path: "/class/edit",
        query: { classId }
      });
    },
    //查询对应学校的所有班级
    async queryClass(schoolId) {
      let res = await service.queryClass({ schoolId });
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //班级删除
    async classDelete(params = {}) {
      let res = await service.classDelete(params);
      if (res.errorCode === 0) {
        this.queryClass(this.schoolId);
      } else if (res.errorCode === -1) {
        this.$weui.topTips(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    this.queryClass(this.schoolId);
  }
};
</script>
<style lang="less">
.class-head {
  padding: 30px 0;
  > a {
    width: 240px;
  }
}
.class-box {
  height: 120px;
  margin-bottom: 0;
  .cell-bd {
    padding-left: 0;
  }
}
.btn-edit {
  width: 100px;
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
  background-color: #d1e0f6;
}
.btn-del {
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: #ce3c39;
}
span.t {
  color: #409eff;
}
span.s {
  color: #ff40d9;
}
</style>
