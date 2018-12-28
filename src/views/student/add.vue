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
              <input class="input" placeholder="请输入学生姓名" maxlength="4" v-model="form.studentName">
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
              <input type="number" class="input" pattern="[0-9]*" placeholder="请输入手机号" v-model="form.tel">
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
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">提交</a>
      </div>
    </div>    
  </div>  
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "studentAdd",
  mixins: [sex, relation],
  data() {
    return {
      classList: [],
      query: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      form: {
        openId: this.$store.getters.openId,
        studentName: "",
        sex: 1,
        tel: "",
        relation: 1,
        classId: null
      }
    };
  },
  methods: {
    handleSubmit() {
      let { studentName, tel } = this.form;
      if (studentName == "" || !studentName.length) {
        this.$weui.topTips("请输入学生姓名");
        return false;
      }
      if (isPhone(tel)) {
        let obj = Object.assign({}, this.form, { openId: this.openId });
        this.studentAdd(this.form);
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
    //学生新增
    async studentAdd(params = {}) {
      let res = await service.studentAdd(params);
      if (res.errorCode === 0) {
        this.$weui.alert(
          "新增学生成功",
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
  activated() {},
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
