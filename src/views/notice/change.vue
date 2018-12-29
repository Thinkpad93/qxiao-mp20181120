<template>
  <div class="page">
    <div class="page-hd">
      <div class="tab">
        <a href="javascript:;" class="curr">老师</a>
        <a href="javascript:;">班级</a>
        <a href="javascript:;">老师和班级</a>
      </div>
      <!-- <div class="cells-radios">
        <div class="cell">
          <label for="1" class="bui-radios-label">
            <input type="radio" id="1" name="1" class="a-radio" checked>
            <i class="bui-radios"></i>老师
          </label>
        </div>
        <div class="cell">
          <label for="2" class="bui-radios-label">
            <input type="radio" id="2" name="1" class="a-radio">
            <i class="bui-radios"></i>班级
          </label>             
        </div>
      </div>           -->
    </div>  
    <div class="page-bd">
      <div class="page-bd_cell">
        <div class="cells weui-cells_checkbox">
          <label class="cell babyItem weui-check__label" v-for="(teacher,i) in checkData" :key="i">
            <div class="cell-hd">
              <img class="teacher-icon" src="http://iph.href.lu/50x50" alt="">
            </div>
            <div class="cell-bd">
              <p>{{ teacher.name }}</p>
            </div>
            <div class="cell-ft">
              <input type="checkbox" class="weui-check" name="checkbox1" v-model="checkList" :value="teacher.id">
              <i class="weui-icon-checked"></i>
            </div>
          </label>
        </div>
      </div>
      <div class="page-bd_cell"></div>
    </div>
    <div class="page-ft">
      <div class="tabbar weui-cells_checkbox">
        <label id="handle" class="weui-check__label" @click="handleCheckAll">
          <div class="cell-hd">
            <input type="checkbox" class="weui-check" name="checkedAll">
            <i class="weui-icon-checked"></i>
          </div>
          <div class="cell-bd">
            <p>全选</p>
          </div>
        </label>
        <a href="javascript:;" id="publish">发布</a>
      </div>
    </div>  
  </div>  
</template>
<script>
export default {
  name: "noticeChange",
  data() {
    return {
      checkData: [{ name: "张曼玉", id: 1 }, { name: "王菲", id: 2 }],
      checkList: []
    };
  },
  methods: {
    handleCheckAll() {}
  }
};
</script>
<style lang="less" scoped>
.page-hd {
  margin-bottom: 30px;
  background-color: #fff;
}
.tab {
  display: flex;
  font-size: 32px;
  a {
    color: #d7d7d7;
    height: 100px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .curr {
    color: #92cd36;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      display: block;
      width: 50%;
      height: 4px;
      background-color: #92cd36;
      transform: translateX(-50%);
    }
  }
}
.cells-radios {
  color: #d7d7d7;
  font-size: 32px;
  height: 100px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  background-color: #fff;
  .cell {
    flex: 1;
  }
}
.a-radio {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
.bui-radios-label {
  position: relative;
}
.bui-radios {
  display: inline-block;
  width: 36px;
  height: 36px;
  vertical-align: -8px;
  position: relative;
  border-radius: 50%;
  border: 1px solid #979797;
  background-color: #fff;
  transition: all ease-out 0.3s;
}
.bui-radios-label input:checked + .bui-radios {
  background: #9acb4d;
  border: 1px solid #9acb4d;
}
.bui-radios-label input:checked + .bui-radios:after {
  position: absolute;
  content: "";
  width: 12px;
  height: 12px;
  background-color: #fff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cells {
  font-size: 30px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.cell {
  padding: 0 30px;
  position: relative;
  display: flex;
  align-items: center;
  height: 100px;
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
  padding-left: 20px;
}
.teacher-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.page-ft {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
.tabbar {
  display: flex;
}
#handle {
  flex: 1;
  font-size: 32px;
  display: flex;
  align-items: center;
}
#publish {
  width: 280px;
  height: 100px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9acb4d;
}
</style>
