<template>
  <div class="page">
    <div class="page-hd"></div>
    <div class="page-bd">
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">幼儿园名称</label>
          </div>        
          <div class="cell-bd">
            <input class="input" placeholder="请输入幼儿园名称">
          </div>        
        </div>
        <div class="cell cell_select">
          <div class="cell-hd">
            <label for="" class="label">幼儿园类型</label>
          </div>  
          <div class="cell-bd">
            <select class="select" name="" dir="rtl">
              <option selected>公办</option>
              <option>私立</option>
              <option>民办</option>
            </select>
          </div>                
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">地址</label>
          </div>          
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">详细地址</label>
          </div>   
          <div class="cell-bd">
            <input class="input" placeholder="请输入详细地址">
          </div>                  
        </div>
      </div>  
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">园长姓名</label>
          </div>        
          <div class="cell-bd">
            <input class="input" placeholder="请输入园长姓名">
          </div>             
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">园长手机号</label>
          </div>    
          <div class="cell-bd">
            <input class="input" placeholder="请输入园长手机号">
          </div>                   
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">验证码</label>
          </div>      
          <div class="cell-bd">
            <input class="input" placeholder="请输入验证码">
          </div>                
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">密码</label>
          </div>    
          <div class="cell-bd">
            <input class="input" placeholder="请设置6~16位字母或数字的密码">
          </div>                   
        </div>
      </div>
    </div>
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary">下一步</a>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  name: "createSchool",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
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
</style>
