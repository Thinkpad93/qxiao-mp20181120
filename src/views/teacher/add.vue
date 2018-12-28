<template>
  <div class="page">
    <div class="page-bd">
      <form action="" ref="form">
        <!-- <button type="reset" hidden id="reset">重置</button> -->
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
import service from "@/api";
import { type, sex } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "teacherAdd",
  mixins: [type, sex],
  data() {
    return {
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
        classId: null
      }
    };
  },
  methods: {
    handleSubmit() {
      let { teacherName, tel, classId, ...args } = this.form;
      let classes = [];
      if (teacherName == "" || !teacherName.length) {
        this.$weui.topTips("请输入老师姓名");
        return false;
      }
      if (isPhone(tel)) {
        if (classId) {
          classes.push({ classId });
        }
        let obj = Object.assign({}, args, {
          teacherName,
          tel,
          classes
        });
        this.teacherAdd(obj);
      } else {
        this.$weui.topTips("请正确填写手机号");
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
    //老师新增
    async teacherAdd(params = {}) {
      let res = await service.teacherAdd(params);
      if (res.errorCode === 0) {
        this.$weui.alert(
          "老师新增成功",
          () => {
            this.$refs.form.reset();
            this.$router.go(-1);
          },
          {
            title: "提示"
          }
        );
      }
    }
  },
  mounted() {
    this.queryClassId(this.query);
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
  font-size: 32px;
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
  position: relative;
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
</style>
