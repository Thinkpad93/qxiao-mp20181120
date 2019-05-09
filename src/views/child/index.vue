<template>
  <div class="flex-page">
    <div class="flex-bd">
      <van-radio-group v-model="openStudentId">
        <van-cell-group>
          <van-cell
            :title="item.openStudentName"
            clickable
            v-for="(item, index) in studentList"
            :key="index"
            @click="openStudentId = item.openStudentId"
          >
            <van-radio :name="item.openStudentId" checked-color="#92cd36"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleAdd">添加孩子</van-button>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { mapState } from "vuex";
export default {
  name: "childList",
  data() {
    return {
      openId: this.$store.state.user.info.openId,
      openStudentId: parseInt(this.$store.state.user.info.openStudentId),
      studentList: []
    };
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType
    })
  },
  watch: {
    //学生切换
    openStudentId(news, old) {
      let roleType = this.roleType;
      let _cookie = Cookies.getJSON("info");
      let single = this.studentList.find(item => item.openStudentId === news);
      let obj = null;
      if (roleType == 3 || roleType == 9) {
        obj = Object.assign({}, _cookie, single);
      } else {
        let { openStudentId, openStudentName } = single;
        obj = Object.assign({}, _cookie, { openStudentId, openStudentName });
      }
      this.$store.dispatch("user/setInfo", obj).then(data => {
        if (data.success === "ok") {
          this.$dialog
            .alert({
              title: "提示",
              message: "切换成功"
            })
            .then(() => {
              this.$router.go(-1);
            });
        }
      });
    }
  },
  methods: {
    handleAdd() {
      this.$router.push({
        path: "/child/add"
      });
    },
    //查询学生列表--开放版
    async queryOpenStudentList(params = {}) {
      let res = await service.queryOpenStudentList(params);
      if (res.errorCode === 0) {
        this.studentList = res.data;
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
  height: 120px;
}
</style>
