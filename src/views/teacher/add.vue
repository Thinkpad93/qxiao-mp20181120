<template>
  <div class="page">
    <div class="page-bd">
      <form action="" ref="form">
        <div class="cells-title">基础信息</div>
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
              <input class="input" pattern="[0-9]*" placeholder="请输入手机号" v-model="form.tel">
            </div>
          </div>        
        </div> 
        <div class="cells-title">职务信息</div>
        <div class="cells">
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label class="label">职务类别</label>
            </div>     
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="form.type">
                <option :value="option.id" v-for="(option,index) in typeList" :key="index">{{ option.name }}</option>
              </select>          
            </div>   
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label class="label">任教班级</label>
            </div>     
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="selected" multiple size="1">
                <!-- 兼容性问题修改 -->
                <optgroup disabled hidden></optgroup>                
                <option  :value="option.classId" v-for="(option,index) in classList" :key="index">{{ option.className }}</option>
              </select>          
            </div>   
          </div>      
        </div> 
      </form>
    </div>
    <div class="btn-area">
      <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">提交</a>
    </div>
  </div>  
</template>
<script>
import { Toast } from "vant";
import service from "@/api";
import { type, sex } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "teacherAdd",
  mixins: [type, sex],
  data() {
    return {
      selected: [],
      classList: [],
      query: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      form: {
        openId: this.$store.getters.openId,
        teacherName: "",
        sex: 1,
        tel: "",
        type: 1,
        classes: []
      }
    };
  },
  methods: {
    handleSubmit() {
      let { teacherName, tel, classId, ...args } = this.form;
      let classes = [];
      if (teacherName == "" || !teacherName.length) {
        Toast("请输入老师姓名");
        return false;
      }
      if (!this.selected.length) {
        Toast("请选择任教班级，支持多选");
        return false;
      }
      if (isPhone(tel)) {
        this.form.classes = this.selected.map(item => {
          return { classId: item };
        });
        this.teacherAdd(this.form);
      } else {
        Toast("请正确填写手机号");
      }
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //老师新增
    async teacherAdd(params = {}) {
      let res = await service.teacherAdd(params);
      if (res.errorCode === 0) {
        this.$refs.form.reset();
        this.$weui.alert(
          "老师新增成功",
          () => {
            this.$router.go(-1);
          },
          {
            title: "提示"
          }
        );
      } else if (res.errorCode === -1) {
        Toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    this.queryClassId(this.query);
  }
};
</script>
<style lang="less">
</style>
