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
            <select class="select" name="" dir="rtl" v-model="form.classId">
              <option  :value="option.value" v-for="(option,index) in classList" :key="index">{{ option.label }}</option>
            </select>          
          </div>   
        </div>      
      </div> 
    </div>
    <div class="page-ft">
      <div class="btn-area flex">
        <a href="javascript:;" class="btn btn-warn" @click="handleDel">删除</a>
        <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">保存</a>
      </div>
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
      classList: [],
      querys: {
        openId: this.$store.getters.openId,
        teacherId: this.$route.params.id
      },
      query: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      form: {}
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
      let obj = Object.assign({}, this.form, {
        openId: this.$store.getters.openId
      });
      this.teacherUpdate(obj);
    },
    //老师删除
    async teacherDelete(params = {}) {
      let res = await service.teacherDelete(params);
      if (res.errorCode === 0) {
        let confirmDom = this.$weui.confirm(
          "删除成功",
          () => {
            this.$router.go(-1);
          },
          { title: "提示" }
        );
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
        this.form = res.data;
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
    }
  },
  mounted() {
    this.queryClassId(this.query);
    this.teacherQuery(this.querys);
  }
};
</script>
<style lang="less" scoped>
.cells-title {
  color: #808080;
  font-size: 30px;
  margin: 20px 0;
  padding-left: 30px;
}
.cells {
  font-size: 34px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.cell {
  padding: 0 30px;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  }
}
.cell-hd {
  line-height: 90px;
}
.cell-bd {
  flex: 1;
}
.label {
  display: block;
  word-wrap: break-word;
  word-break: break-all;
}
.cell-select {
  padding: 0;
  .select {
    padding: 0 60px;
  }
  .cell-bd {
    &::after {
      content: "";
      display: inline-block;
      height: 20px;
      width: 20px;
      border-width: 4px 4px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      transform: rotate(45deg) translateY(-50%);
      position: absolute;
      top: 50%;
      right: 30px;
    }
  }
}
.cell-select-after {
  padding-left: 30px;
}

.teacher-icon {
  width: 100px;
  height: 100px;
}
.btn-area {
  justify-content: space-between;
  > a {
    width: 200px;
  }
}
</style>
