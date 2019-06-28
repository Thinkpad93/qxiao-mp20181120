<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div
          class="cell student-box"
          v-for="(item, index) in studentList"
          :key="index"
          :class="[item.studentId == studentId ? 'curr-student': '']"
          @click="handleStudentChange(item)"
        >
          <div class="cell-bd">
            <div class="flex a-i-c">
              <strong>{{ item.openStudentName }}</strong>
              <span>{{ item.className }}</span>
            </div>
          </div>
          <div class="cell-ft">
            <span size-12 @click.stop="jump(item)">查看资料</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import Cookies from "js-cookie";
import { mapState } from "vuex";
export default {
  name: "boby",
  data() {
    return {
      studentId: parseInt(this.$store.state.user.info.studentId),
      studentList: []
    };
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType,
      openId: state => state.info.openId
    })
  },
  methods: {
    jump(params) {
      let { studentId } = params;
      this.$router.push({
        path: "/baby/edit",
        query: {
          studentId
        }
      });
    },
    //点击孩子进行切换操作
    handleStudentChange(params = {}) {
      let { openStudentId, openStudentName, totalStarCount, ...args } = params;
      if (args.studentId == this.studentId) {
        this.$router.go(-1);
      } else {
        let _cookie = Cookies.getJSON("info");
        let obj = Object.assign({}, _cookie, args);
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
            let params = {
              openId: this.openId,
              studentId: args.studentId,
              type: 1
            };
            this.switchingState(params);
            this.$router.go(-1);
          }
        });
      }
    },
    //查询学生列表
    async queryClassStudentList(params = {}) {
      let res = await service.queryClassStudentList(params);
      if (res.errorCode === 0) {
        this.studentList = res.data;
      }
    },
    //最后登录状态记录
    async switchingState(params = {}) {
      let res = await service.switchingState(params);
      if (res.errorCode === 0) {
      }
    }
  },
  mounted() {
    this.queryClassStudentList({ openId: this.openId });
  }
};
</script>
<style lang="less" scoped>
.student-box {
  height: 120px;
  strong {
    font-weight: normal;
    color: #2e2e2e;
    display: inline-block;
    margin: 0 40px 0 0;
  }
  span {
    color: #999;
  }
}
.handle-edit {
  color: #999;
  margin-top: 40px;
  padding-right: 30px;
}

.curr-student {
  border-left: 8px solid #84ce09;
}
</style>
