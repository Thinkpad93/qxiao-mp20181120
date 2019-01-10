<template>
  <div class="page">
    <div class="page-bd">
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
              <option  :value="option.id" v-for="(option,index) in typeList" :key="index">{{ option.name }}</option>
            </select>          
          </div>   
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label class="label">任教班级</label>
          </div>     
          <div class="cell-bd">
            <select class="select" name="" dir="rtl" v-model="selected" multiple size="5">
              <!-- 兼容性问题修改 -->
              <optgroup disabled hidden></optgroup>                
              <option :value="option.classId" v-for="(option,index) in classList" :key="index">{{ option.className }}</option>
            </select>          
          </div>   
        </div>      
      </div> 
    </div>
    <div class="btn-area flex">
      <a href="javascript:;" class="btn btn-warn" @click="handleDel">删除</a>
      <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">保存</a>
    </div>
  </div>  
</template>
<script>
import service from "@/api";
import { type, sex } from "@/mixins/type";
export default {
  name: "teacherAdd",
  mixins: [type, sex],
  data() {
    return {
      selected: [],
      classList: [],
      querys: {
        openId: this.$store.getters.openId,
        teacherId: this.$route.params.id
      },
      query: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      form: {
        classes: []
      }
    };
  },
  methods: {
    handleDel() {
      if (this.$route.params.id) {
        let confirmDom = this.$weui.confirm(
          "确定要删除老师吗？",
          () => {
            let obj = {
              openId: this.$store.getters.openId,
              teacherId: this.$route.params.id
            };
            this.teacherDelete(obj);
          },
          { title: "提示" }
        );
      }
    },
    handleSubmit() {
      let classes = this.selected.map(item => {
        return { classId: item };
      });
      let obj = Object.assign({}, this.form, {
        classes,
        openId: this.$store.getters.openId
      });
      console.log(obj);
      this.teacherUpdate(obj);
    },
    //老师删除
    async teacherDelete(params = {}) {
      let res = await service.teacherDelete(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    //老师修改
    async teacherUpdate(params = {}) {
      let res = await service.teacherUpdate(params);
      if (res.errorCode === 0) {
        let confirmDom = this.$weui.confirm(
          "修改成功",
          () => {
            this.$router.go(-1);
          },
          { title: "提示" }
        );
      }
    },
    //老师信息查询
    async teacherQuery(params = {}) {
      let res = await service.teacherQuery(params);
      if (res.errorCode === 0) {
        let { classes, ...args } = res.data;
        this.form = args;
        this.selected = classes;
      }
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        // let classMap = res.data.map(item => {
        //   return {
        //     label: item.className,
        //     value: item.classId
        //   };
        // });
        this.classList = res.data;
      }
    }
  },
  mounted() {
    this.queryClassId(this.query);
    this.teacherQuery(this.querys);
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
