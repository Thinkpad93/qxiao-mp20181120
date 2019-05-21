<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells">
        <div class="cell student-box" v-for="(item, index) in studentList" :key="index">
          <div class="cell-bd">
            <div class="flex a-i-c">
              <img
                src="@/assets/student-icon.png"
                width="50"
                height="50"
                radius="50"
                @click="jump(item)"
              >
              <strong>{{ item.openStudentName }}</strong>
              <span v-show="item.totalStarCount">Q星：{{ item.totalStarCount }}</span>
            </div>
          </div>
          <div class="cell-ft">
            <van-radio-group v-model="openStudentId">
              <van-radio :name="item.openStudentId" checked-color="#92cd36"/>
            </van-radio-group>
          </div>
        </div>
      </div>
      <router-link to="/child/add" tag="div" class="handle-add flex a-i-c j-c-f-e">
        <span>点击添加孩子</span>
      </router-link>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleSubmit">确定</van-button>
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
      isSwitch: false,
      studentList: []
    };
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType,
      photo: state => state.info.photo
    })
  },
  watch: {
    //学生切换
    openStudentId(news, old) {
      this.isSwitch = true;
    }
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
    //提交学生切换
    handleSubmit() {
      if (this.isSwitch) {
        let news = this.openStudentId;
        let roleType = this.roleType;
        let _cookie = Cookies.getJSON("info");
        let single = this.studentList.find(item => item.openStudentId === news);
        let { openStudentId, openStudentName, totalStarCount } = single;
        let obj = Object.assign({}, _cookie, {
          openStudentId,
          openStudentName,
          totalStarCount
        });
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
            this.$router.go(-1);
          }
        });
      } else {
        this.$router.go(-1);
      }
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
  },
  destroyed() {
    this.isSwitch = false;
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
    margin: 0 40px;
  }
  span {
    color: #999;
  }
}
.handle-add {
  color: #84ce09;
  margin-top: 40px;
  padding-right: 30px;
}
</style>
