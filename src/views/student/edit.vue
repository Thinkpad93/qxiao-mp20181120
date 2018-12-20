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
              <input class="input" pattern="[0-9]*" placeholder="请输入手机号" v-model="form.tel" readonly disabled>
            </div>
          </div>  
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">学生和家长关系</label>
            </div>
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="form.relation">
                <option selected value="1">妈妈</option>
                <option value="2">爸爸</option>
                <option value="3">爷爷</option>
                <option value="4">奶奶</option>
                <option value="5">外公</option>
                <option value="6">外婆</option>
              </select>
            </div>
          </div> 
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">学生所在班级</label>
            </div>
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="form.classId">
                <option  :value="option.classId" v-for="(option,index) in classList" :key="index">{{ option.className }}</option>
              </select>
            </div>
          </div>                    
        </div>
      </form>
    </div>
    <div class="page-ft">
      <div class="btn-area flex">
        <a href="javascript:;" class="btn btn-warn" @click="handleDel">删除</a>
        <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">提交</a>
      </div>
    </div>      
  </div>  
</template>
<script>
import service from "@/api";
import { sex } from "@/mixins/type";
export default {
  name: "studentEdit",
  mixins: [sex],
  data() {
    return {
      query: {
        openId: "10086",
        tel: this.$route.params.id
      },
      schoolId: 1,
      classList: [],
      form: {}
    };
  },
  methods: {
    handleDel() {
      let { studentId, openId } = this.form;
      if (studentId && openId) {
        let confirmDom = this.$weui.confirm(
          "确定要删除学生吗？",
          () => {
            this.studentDelete({ studentId, openId });
          },
          { title: "提示" }
        );
      }
    },
    handleSubmit() {
      this.studentUpdate(this.form);
    },
    //查询对应学校的所有班级
    async queryClass(schoolId) {
      let res = await service.queryClass({ schoolId });
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //学生信息查询
    async studentQuery(params = {}) {
      let res = await service.studentQuery(params);
      if (res.errorCode === 0) {
        this.form = res.data;
      }
    },
    //学生修改
    async studentUpdate(params = {}) {
      let res = await service.studentUpdate(params);
      if (res.errorCode === 0) {
        this.$router.push({ path: "/student" });
      }
    },
    //学生删除
    async studentDelete(params = {}) {
      let res = await service.studentDelete(params);
      if (res.errorCode === 0) {
        this.$router.push({ path: "/student" });
      }
    }
  },
  mounted() {
    this.queryClass(this.schoolId);
  },
  activated() {
    this.studentQuery(this.query);
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
.btn-area {
  justify-content: space-between;
  > a {
    width: 200px;
  }
}
</style>
