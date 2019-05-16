<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells">
        <div class="cell student-box" v-for="(item, index) in studentList" :key="index">
          <div class="cell-bd">
            <div class="flex a-i-c">
              <img :src="photo" width="40" height="40" radius="50">
              <strong>{{ item.openStudentName }}</strong>
              <span>Q星：{{ item.totalStarCount }}</span>
            </div>
          </div>
          <div class="cell-ft">
            <div class>
              <a href="javascript:void(0);" style="color:#666" @click="handleEdit(item)">编辑</a>
              <a href="javascript:void(0);" style="color:#f02310" @click="handleDel(item)">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleCancel">取消</van-button>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      studentList: []
    };
  },
  computed: {
    ...mapState("user", {
      photo: state => state.info.photo,
      openId: state => state.info.openId
    })
  },
  methods: {
    handleCancel() {
      this.$router.go(-1);
    },
    handleEdit(params) {
      let { openStudentId } = params;
      this.$router.push({
        path: "/child/edit",
        query: {
          openStudentId
        }
      });
    },
    handleDel(params) {
      let { roleType, openStudentId } = params;
      if (roleType == 9) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定要删除吗？"
          })
          .then(() => {
            this.deleteOpenStudent({ roleType, openStudentId });
          });
      }
    },
    //查询学生列表--开放版
    async queryOpenStudentList(params = {}) {
      let res = await service.queryOpenStudentList(params);
      if (res.errorCode === 0) {
        this.studentList = res.data;
      }
    },
    //学生删除（开放版）
    async deleteOpenStudent(params = {}) {
      let res = await service.deleteOpenStudent(params);
      if (res.errorCode === 0) {
        this.queryOpenStudentList({ openId: this.openId });
      }
    }
  },
  mounted() {
    this.queryOpenStudentList({ openId: this.openId });
  }
};
</script>
<style lang="less" scoped>
.student-box {
  height: 160px;
  strong {
    font-weight: normal;
    color: #2e2e2e;
    display: inline-block;
    margin: 0 40px;
  }
  span {
    color: #999;
  }
}
</style>
