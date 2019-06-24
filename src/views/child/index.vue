<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div
          class="cell student-box"
          v-for="(item, index) in studentList"
          :key="index"
          :class="[item.openStudentId == openStudentId ? 'curr-student': '']"
          @click="handleStudentChange(item)"
        >
          <div class="cell-bd">
            <div class="flex a-i-c">
              <img :src="item.openPhoto" radius="50" v-if="item.openPhoto">
              <img src="@/assets/child-default@2x.png" radius="50" v-else>
              <strong>{{ item.openStudentName }}</strong>
              <span v-show="item.totalStarCount">Q星：{{ item.totalStarCount }}</span>
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
      openStudentId: state => state.info.openStudentId
    })
  },
  methods: {
    jump(params) {
      let { openStudentId, roleType } = params;
      this.$router.push({
        path: "/child/edit",
        query: {
          openStudentId,
          roleType
        }
      });
    },
    //点击孩子进行切换操作
    handleStudentChange(params = {}) {
      let {
        openStudentId,
        openStudentName,
        openPhoto,
        totalStarCount,
        isBindBracelet
      } = params;
      //当前关联的不切换
      if (openStudentId == this.openStudentId) {
        this.$router.go(-1);
      } else {
        let _cookie = Cookies.getJSON("info");
        let obj = Object.assign({}, _cookie, {
          openStudentId,
          openStudentName,
          openPhoto,
          totalStarCount,
          isBindBracelet
        });
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
            let params = {
              openId: this.openId,
              studentId: openStudentId,
              type: 0
            };
            this.switchingState(params);
            this.$router.push({
              path: "/single"
            });
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
  mounted() {
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
