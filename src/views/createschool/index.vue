<template>
  <div class="page">
    <div class="page-hd"></div>
    <div class="page-bd">
      <!-- 提交成功提示 -->
      <form action="" ref="form">
        <div class="cells" :style="{display: !views ? 'block': 'none'}">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">幼儿园名称</label>
            </div>        
            <div class="cell-bd">
              <input class="input" placeholder="请输入幼儿园名称" v-model="form.schoolName" maxlength="20">
            </div>        
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">幼儿园类型</label>
            </div>  
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="form.type">
                <option selected value="0">公办</option>
                <option value="1">私立</option>
                <option value="2">民办</option>
              </select>
            </div>                
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">详细地址</label>
            </div>   
            <div class="cell-bd">
              <input class="input" placeholder="请输入详细地址" maxlength="20">
            </div>                  
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">园长姓名</label>
            </div>        
            <div class="cell-bd">
              <input class="input" placeholder="请输入园长姓名" v-model="form.leadName" maxlength="4">
            </div>             
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">园长手机号</label>
            </div>    
            <div class="cell-bd">
              <input class="input" placeholder="请输入园长手机号" v-model="form.tel">
            </div>                   
          </div>
          <div class="cell"> 
            <div class="cell-bd">
              <input class="input text-left" placeholder="请输入验证码" maxlength="6">
            </div>
            <div class="cell-ft">
              <span style="color:#92cd36">获取验证码</span>
            </div>                
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">密码</label>
            </div>    
            <div class="cell-bd">
              <input type="password" class="input" placeholder="请设置6~16位字母或数字的密码" v-model="form.password" maxlength="20">
            </div>                   
          </div>
        </div>  
        <div class="cells" :style="{display: views ? 'block': 'none'}">
          <div class="cell">
            <div class="cell-bd">
              <p class="p">请编辑班级信息<span size-14 style="color: #888;">（也可不编辑，完成后再编辑）</span></p>
            </div>
          </div> 
          <div class="cell" v-for="(cla, index) in form.classes" :key="index">
            <div class="cell-hd">
              <label for="">班级{{index}}</label>
            </div>
            <div class="cell-bd">
              <input class="input text-center" readonly placeholder="" v-model="cla.className" maxlength="20">
            </div>   
            <div class="cell-ft">
              <span style="color:#ce3c39" @click="handleDelClass(index)">删除</span>
            </div>          
          </div>
          <div class="cell">
            <div class="cell-bd">
              <input class="input text-left" placeholder="请输入班级名称,例如: 小小班" v-model="className" maxlength="10">
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd">
              <p class="p">
                <img src="@/assets/image/+.png" alt="" @click="handleAddClass">
              </p>
            </div>
          </div>
        </div> 
      </form>
    </div>
    <div class="page-ft">
      <div class="btn-area">
        <a v-if="!views" hclaref="javascript:;" class="btn btn-primary" @click="handleNextClick">下一步</a>
        <a v-if="views" hclaref="javascript:;" class="btn btn-primary" @click="handleSubmit">完成</a>
      </div>
    </div>
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "createSchool",
  data() {
    return {
      views: false,
      className: "",
      form: {
        schoolName: "",
        type: 1,
        openId: "10086",
        leadName: "",
        tel: "",
        password: "",
        classes: []
      }
    };
  },
  methods: {
    handleNextClick() {
      this.views = true;
    },
    handleAddClass() {
      this.form.classes.push({ className: this.className });
      this.className = "";
    },
    handleDelClass(index) {
      this.form.classes.splice(index, 1);
    },
    async handleSubmit() {
      let res = await service.schoolAdd(this.form);
      console.log(res);
    }
  }
};
</script>
<style lang="less" scoped>
.getCenter {
  position: fixed;
  left: 0;
  top: 50%;
  height: auto;
  width: 100%;
  z-index: 100;
}
.page-hd {
  margin-bottom: 20px;
  height: 172px;
  background-color: #fff;
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
</style>
