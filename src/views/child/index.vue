<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells-title">点击选择关联孩子</div>
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
              <img :src="item.photo" radius="50" v-if="item.photo" />
              <img src="@/assets/child-default@2x.png" radius="50" v-else />
              <strong>{{ item.name }}</strong>
              <span size-12>Q星: {{ item.totalStarCount }}</span>
            </div>
          </div>
          <div class="cell-ft">
            <span size-12 @click.stop="jump(item)">完善资料</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button type="info" size="large" class="no-radius" to="/child/add">添加</van-button>
      </div>
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
      studentList: []
    };
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType,
      photo: state => state.info.photo,
      openId: state => state.info.openId,
      studentId: state => state.info.studentId
    })
  },
  methods: {
    jump(params) {
      let { studentId, roleType } = params;
      this.$router.push({
        path: "/child/edit",
        query: {
          studentId,
          roleType
        }
      });
    },
    //点击孩子进行切换操作
    handleStudentChange(params = {}) {
      //当前关联的不切换
      if (this.studentId == params.studentId) {
        this.$router.go(-1);
      } else {
        let { sex, ...args } = params;
        let _cookie = Cookies.getJSON("info");
        let obj = Object.assign({}, _cookie, args);
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
            let param = {
              openId: this.openId,
              studentId: obj.studentId,
              type: 1
            };
            this.switchingState(param);
            this.$router.go(-1);
          }
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
    //最后登录状态记录
    async switchingState(params = {}) {
      let res = await service.switchingState(params);
      if (res.errorCode === 0) {
      }
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   console.log(to);
  //   console.log(from);
  //   next();
  //   // if (to.path === "/single") {
  //   //   next();
  //   // }
  //   // if (to.path === "/user") {
  //   //   next();
  //   // }
  // },
  mounted() {
    //console.log(this.$route);
    this.queryOpenStudentList({ openId: this.openId });
  }
};
</script>
<style lang="less" scoped>
.student-box {
  height: 120px;
  img {
    width: 100px;
    height: 100px;
  }
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

.curr-student {
  border-left: 8px solid #84ce09;
}
</style>
