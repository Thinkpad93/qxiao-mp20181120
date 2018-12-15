<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells-title">基础信息</div>
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">头像</label>
          </div>
          <div class="cell-bd">
            
          </div>
          <div class="cell-ft">
            <img class="teacher-icon" src="http://iph.href.lu/50x50" alt="">
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label class="label">姓名</label>
          </div>
          <div class="cell-bd">
            <input class="input" placeholder="请输入老师姓名" maxlength="4">
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label for="" class="label">性别</label>
          </div>
          <div class="cell-bd">
            <select class="select" name="" dir="rtl">
              <option selected>男</option>
              <option>女</option>
            </select>
          </div>
        </div>    
        <div class="cell">
          <div class="cell-hd">
            <label class="label">手机号码</label>
          </div>
          <div class="cell-bd">
            <input class="input" pattern="[0-9]*" placeholder="请输入手机号">
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
            <select class="select" name="" dir="rtl">
              <option selected>老师</option>
            </select>          
          </div>   
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label class="label">任教班级</label>
          </div>     
          <div class="cell-bd">
            <select class="select" name="" dir="rtl">
              <option selected>3班</option>
            </select>          
          </div>   
        </div>      
      </div> 
    </div>
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary">提交</a>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  name: "teacherAdd",
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route);
  },
  activated() {}
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
</style>
