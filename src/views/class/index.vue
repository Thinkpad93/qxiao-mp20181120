<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div class="cell" v-for="(item, index) in 4" :key="index">
          <div class="cell-bd">
            <p size-17>KA1班</p>
            <p>
              <span class="t" size-12>带班老师5人</span>
              <span class="s" size-12>关联学生234人</span>
            </p>
          </div>
          <div class="cell-ft">
            <a href="javascript:;" class="btn btn-edit" size-12>编辑</a>
          </div>
        </div> 
      </div>
    </div>
    <div class="page-ft">
      <div class="btn-area">
        <a href="javacript:;" class="btn btn-primary">添加班级</a>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.page-ft {
  a {
    width: 500px;
  }
}
.cells {
  overflow: hidden;
  background-color: #fff;
  background-color: #fff;
}
.cell {
  height: 140px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  position: relative;
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
.cell-bd {
  flex: 1;
  p {
    margin-bottom: 10px;
  }
}
.btn-edit {
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: #d1e0f6;
}
span.t {
  color: #409eff;
}
span.s {
  color: #ff40d9;
}
</style>
