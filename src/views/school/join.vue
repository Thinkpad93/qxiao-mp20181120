<template>
  <div class="page">
    <div class="page-bd">
      <div class="cover">
        <img src="@/assets/image/login-bg@2x.png" alt>
      </div>
      <form action ref="form" class="form">
        <div class="join-head">
          <h2 size-18 class="text-ellipsis text-center">
            {{ info.schoolName }}
            <small>(ID码: {{ info.schoolCode }})</small>
          </h2>
          <div class="address flex text-ellipsis">
            <img src="@/assets/image/map.png" alt>
            <span>{{ info.location }}</span>
          </div>
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">姓名</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入老师姓名" maxlength="10" v-model="info.teacherName">
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">性别</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="info.sex">
                <option
                  :value="option.id"
                  v-for="(option,index) in sexList"
                  :key="index"
                >{{ option.name }}</option>
              </select>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label class="label">手机号码</label>
            </div>
            <div class="cell-bd">
              <input
                type="number"
                class="input"
                pattern="[0-9]*"
                placeholder="请输入手机号"
                readonly
                v-model="info.tel"
              >
            </div>
          </div>
        </div>
        <div class="btn-area">
          <a href="javascript:;" class="btn btn-large btn-primary" @click="handleSubmit">申请加入</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { sex } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "schoolJoin",
  mixins: [sex],
  data() {
    return {
      query: {
        openId: this.$store.getters.openId,
        tel: this.$store.getters.tel
      },
      info: {}
    };
  },
  methods: {
    handleSubmit() {
      let { schoolCode, location, schoolName, teacherId, ...args } = this.info;
      if (args.teacherName == "" || !args.teacherName.length) {
        this.$toast("请输入老师姓名");
        return false;
      }
      let obj = Object.assign({}, args, { openId: this.query.openId });
      this.teacherJoin(obj);
    },
    //查询园长预先录入老师的信息
    async queryTeacherInfoByTel(params = {}) {
      let res = await service.queryTeacherInfoByTel(params);
      if (res.errorCode === 0) {
        this.info = res.data;
      }
    },
    //老师信息完善
    async teacherJoin(params = {}) {
      let res = await service.teacherJoin(params);
      if (res.errorCode === 0) {
        //当老师加入成功后，重新设置 roleType值
        Cookies.set("roleType", res.data.roleType);
        this.$store.commit("user/SET_ROLETYPE", res.data.roleType);
        this.$store.dispatch("user/queryClassId", res.data);
        this.$router.push({
          path: "/home"
        });
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    this.queryTeacherInfoByTel(this.query);
  }
};
</script>
<style lang="less">
.cover {
  height: 100vh;
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.form {
  z-index: 10;
  width: 100%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.join-head {
  padding-top: 75px;
  padding-left: 20px;
  padding-right: 20px;
}
.address {
  margin-top: 20px;
  margin-bottom: 50px;
  color: #92cd36;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 10px;
  }
}
.page-ft {
  a {
    width: 500px;
  }
}
</style>
