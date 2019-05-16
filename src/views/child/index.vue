<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="handle-add flex a-i-c" @click="handleAdd">
        <p size-17>点击添加孩子~</p>
      </div>
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
            <van-radio-group v-model="openStudentId">
              <van-radio :name="item.openStudentId" checked-color="#92cd36"/>
            </van-radio-group>
          </div>
        </div>
      </div>
      <router-link to="/child/view" tag="div" class="handle-edit flex a-i-c j-c-f-e">
        <van-icon name="records" size="22px"></van-icon>
        <span>修改小孩信息</span>
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
    handleAdd() {
      this.$router.push({
        path: "/child/add"
      });
    },
    //提交学生切换
    handleSubmit() {
      if (this.isSwitch) {
        let news = this.openStudentId;
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
  min-height: 160px;
  margin-bottom: 10px;
  padding-left: 30px;
  background-color: #fff;
}
.handle-edit {
  color: #999;
  margin-top: 40px;
  padding-right: 30px;
}
</style>
