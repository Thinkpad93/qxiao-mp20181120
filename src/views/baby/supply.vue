<template>
  <div class="page">
    <div class="page-bd">
      <form action="" ref="form">
        <div class="cells-title">完善学生信息</div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">学生姓名</label>
            </div>
            <div class="cell-bd">
              <input type="text" class="input" placeholder="请输入学生姓名" maxlength="4" v-model="form.studentName">
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
              <label class="label">家长手机号</label>
            </div>
            <div class="cell-bd">
              <input type="number" class="input" pattern="[0-9]*" placeholder="请输入手机号" readonly v-model="form.tel">
            </div>
          </div> 
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">学生和家长关系</label>
            </div>
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="form.relation">
                <option  :value="option.id" v-for="(option,index) in relationList" :key="index">{{ option.name }}</option>
              </select>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学生所在班级</label>
            </div>
            <div class="cell-bd">
              <!-- <input class="input" placeholder="学生所在班级" readonly v-model="form.className"> -->
              <!-- <select class="select" name="" dir="rtl" v-model="form.classId">
                <option  :value="option.classId" v-for="(option,index) in classList" :key="index">{{ option.className }}</option>
              </select> -->
            </div>
            <div class="cell-ft">
              <p class="cell-p">
                <span v-for="(cla, index) in classList" :key="index">{{ cla.className }}</span>
              </p>
            </div>
          </div>                                                   
        </div>
      </form>  
    </div>  
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">提交</a>
      </div>
    </div>       
  </div>  
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "bobySupply",
  mixins: [sex, relation],
  data() {
    return {
      classList: [],
      form: {
        openId: this.$store.getters.openId,
        studentName: "",
        sex: 1,
        tel: this.$store.getters.tel,
        relation: 1
      }
    };
  },
  methods: {
    handleSubmit() {
      let { studentName, tel } = this.form;
      if (studentName == "" || !studentName.length) {
        this.$weui.alert("请输入学生姓名", () => {}, {
          title: "提示"
        });
        return false;
      }
      if (isPhone(tel)) {
        console.log(this.form);
        this.studentSupply(this.form);
      } else {
        this.$weui.alert("请正确填写手机号", () => {}, {
          title: "提示"
        });
      }
    },
    //根据家长手机号查询相关班级
    async queryClassByTel(tel) {
      let res = await service.queryClassByTel({ tel });
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //学生信息完善
    async studentSupply(params = {}) {
      let res = await service.studentSupply(params);
      if (res.errorCode === 0) {
        //当家长加入成功后，重新设置 roleType值
        this.$refs.form.reset();
        Cookies.set("roleType", res.data.roleType);
        this.$store.dispatch("user/queryClassId", res.data);
        this.$store.commit("user/SET_ROLETYPE", res.data.roleType);
        this.$router.push({ path: "/home" });
      }
    }
  },
  mounted() {
    this.queryClassByTel(this.form.tel);
  }
};
</script>
<style lang="less">
.teacher-icon {
  width: 100px;
  height: 100px;
}
</style>
