<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">幼儿园名称</label>
          </div>        
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">幼儿园类型</label>
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
        </div>             
      </div>
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">园长姓名</label>
          </div>            
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">园长手机号</label>
          </div>            
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">修改密码</label>
          </div>            
        </div>
      </div>
    </div>
    <qxfooter></qxfooter>
  </div>  
</template>
<script>
import qxfooter from "@/components/footer";
export default {
  name: "my",
  components: {
    qxfooter
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.cells {
  margin-bottom: 20px;
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
  line-height: 120px;
}
.cell-bd {
  flex: 1;
}
</style>
