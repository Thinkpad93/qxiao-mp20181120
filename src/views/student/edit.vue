<template>
  <div class="page">
    <div class="page-bd">
      <form action="" ref="form">
        <div class="cells-title">基础信息</div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">学生姓名</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入学生姓名" maxlength="10" v-model="form.studentName">
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
              <input class="input" pattern="[0-9]*" placeholder="请输入手机号" v-model="form.tel" readonly disabled>
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
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">学生所在班级</label>
            </div>
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="form.classId">
                <option  :value="option.value" v-for="(option,index) in classList" :key="index">{{ option.label }}</option>
              </select>
            </div>
          </div>                    
        </div>
      </form>
    </div>
    <div class="btn-area flex">
      <a href="javascript:;" class="btn btn-warn" @click="handleDel">删除</a>
      <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">提交</a>
    </div>     
  </div>  
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "studentEdit",
  mixins: [sex, relation],
  data() {
    return {
      classList: [],
      query: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      querys: {
        openId: this.$store.getters.openId,
        tel: this.$route.query.tel
      },
      form: {}
    };
  },
  methods: {
    handleDel() {
      let { studentId } = this.form;
      if (studentId) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定要删除学生吗？"
          })
          .then(() => {
            this.studentDelete({ studentId, openId: this.querys.openId });
          })
          .catch(() => {});
      }
    },
    handleSubmit() {
      let { studentName, tel } = this.form;
      if (studentName == "" || !studentName.length) {
        this.$toast("请输入学生姓名");
        return false;
      }
      if (isPhone(tel)) {
        this.studentUpdate(this.form);
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        let classMap = res.data.map(item => {
          return {
            label: item.className,
            value: item.classId
          };
        });
        this.classList = classMap;
      }
    },
    //学生信息查询
    async studentQuery(params = {}) {
      let res = await service.studentQuery(params);
      if (res.errorCode === 0) {
        this.form = res.data[0];
      }
    },
    //学生修改
    async studentUpdate(params = {}) {
      let res = await service.studentUpdate(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    //学生删除
    async studentDelete(params = {}) {
      let res = await service.studentDelete(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    this.queryClassId(this.query);
    this.studentQuery(this.querys);
  }
};
</script>
<style lang="less">
.btn-area {
  justify-content: space-between;
  > a {
    width: 200px;
  }
}
</style>
