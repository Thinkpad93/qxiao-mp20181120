<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells">
        <div class="cell student-box" v-for="(item, index) in studentList" :key="index">
          <div class="cell-bd">
            <div class="flex a-i-c">
              <strong>{{ item.openStudentName }}</strong>
              <span>班级：{{ item.className }}</span>
            </div>
          </div>
          <div class="cell-ft">
            <van-radio-group v-model="studentId">
              <van-radio :name="item.studentId" checked-color="#92cd36"/>
            </van-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleSubmit">确定</van-button>
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
      isSwitch: false,
      studentList: []
    };
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType,
      openId: state => state.info.openId
    })
  },
  watch: {
    //学生切换
    studentId(news, old) {
      this.isSwitch = true;
    }
  },
  methods: {
    handleSubmit() {
      if (this.isSwitch) {
        let news = this.studentId;
        let roleType = this.roleType;
        let _cookie = Cookies.getJSON("info");
        let single = this.studentList.find(item => item.openStudentId === news);
        let {
          openStudentId,
          openStudentName,
          totalStarCount,
          ...args
        } = single;
        let obj = Object.assign({}, _cookie, args);
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
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
    margin: 0 40px;
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
</style>
