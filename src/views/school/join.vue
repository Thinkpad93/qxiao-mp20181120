<template>
  <div class="page page-join">
    <div class="page-hd" style="background-color: transparent;">
      <template v-if="views">
        <div class="join-head">
          <h2 size-18 class="text-ellipsis text-center">
            {{ info.schoolName }}
            <small>(ID码: {{ info.schoolCode }})</small>
          </h2>
          <div class="address flex text-ellipsis">
            <img src="@/assets/image/map.png" alt="">
            <span>{{ info.location }}</span>
          </div>   
        </div>     
      </template>
      <template v-else>
        <!-- <h2 size-18 class="text-ellipsis text-center">请输入学校ID码</h2> -->
      </template>
    </div>
    <div class="page-bd">
      <template v-if="views">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">姓名</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入老师姓名" maxlength="4" v-model="form.teacherName">
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">性别</label>
            </div>
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="form.sex">
                <option  :value="option.id" v-for="(option,index) in sexList" :key="index">{{ option.name }}</option>
              </select>
            </div>
          </div> 
          <div class="cell">
            <div class="cell-hd">
              <label class="label">手机号码</label>
            </div>
            <div class="cell-bd">
              <input type="number" class="input" pattern="[0-9]*" placeholder="请输入手机号" readonly v-model="form.tel">
            </div>
          </div>  
          <div class="cell"> 
            <div class="cell-bd">
              <input class="input text-left" placeholder="请输入验证码" v-model="form.veriftCode" maxlength="6">
            </div>
            <div class="cell-ft">
              <span style="color:#92cd36" @click="handleGetVeriftCode">获取验证码</span>
            </div>                
          </div>                         
        </div>
      </template>
      <template v-else>
        <div class="cells">
          <div class="cell">
            <div class="cell-bd">
              <input type="number" class="input" placeholder="请输入6位数学校ID码" maxlength="6" v-model="schoolCode">
            </div>            
          </div>
        </div>
      </template>
    </div>
    <div class="page-ft">
      <div class="btn-area">
        <template v-if="views">
          <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">申请加入</a>
        </template>
        <template v-else>
          <a href="javascript:;" class="btn btn-primary" @click="handleNext">下一步</a>
        </template>
      </div>      
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
      views: false,
      schoolCode: "",
      info: {},
      form: {
        openId: this.$store.getters.openId,
        teacherName: "",
        schoolId: 1,
        sex: 1,
        tel: this.$store.getters.tel,
        veriftCode: ""
      }
    };
  },
  methods: {
    handleNext() {
      if (this.schoolCode == "") {
        this.$weui.alert("请输入学校ID码", () => {}, { title: "提示" });
      } else {
        this.querySchoolInfo(this.schoolCode);
      }
    },
    handleSubmit() {
      let { teacherName, tel } = this.form;
      if (teacherName == "" || !teacherName.length) {
        this.$weui.alert("请输入老师姓名", () => {}, { title: "提示" });
        return false;
      }
      if (isPhone(tel)) {
        this.teacherJoin(this.form);
      } else {
        this.$weui.alert("请正确填写手机号", () => {}, { title: "提示" });
      }
    },
    handleGetVeriftCode() {
      this.telVeriftCode(this.form.tel);
    },
    //获取验证码
    async telVeriftCode(tel) {
      let res = await service.telVeriftCode({ tel });
      if (res.errorCode === 0) {
        this.$weui.topTips(`验证码已经发送，请注意查收`);
      }
    },
    //根据学校Id码查询信息
    async querySchoolInfo(schoolCode) {
      let res = await service.querySchoolInfo({ schoolCode });
      if (res.errorCode === 0) {
        let { schoolId, ...args } = res.data;
        this.views = true;
        this.form.schoolId = schoolId;
        this.info = { ...args };
      } else if (res.errorCode === -1) {
        this.$weui.alert("学校ID码有错，请联系园长", () => {}, {
          title: "提示"
        });
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
        this.$weui.alert(`${res.errorMsg}`, () => {}, {
          title: "提示"
        });
      }
    }
  }
};
</script>
<style lang="less">
.page-join {
  background-image: url("../../../static/image/login-bg@2x.png");
  background-repeat: no-repeat;
  background-size: 100%;
  z-index: 10;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
