<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div class="cell">
          <div class="cell-hd"></div>
          <div class="cell-bd">
            <textarea class="textarea" placeholder="记录下孩子的成长点滴~" rows="10" v-model="form.textContent"></textarea>
          </div>
        </div>
        <div class="cell">
          <div class="cell-bd">
            <ul class="uploader-files"></ul>
            <div class="uploader-input_box">
              <input type="file" class="uploader-input">
            </div>
          </div>
        </div>         
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label for="" class="label">发送对象</label>
          </div>  
          <div class="cell-bd">
            <select class="select" name="" dir="rtl" placeholder="请输入园长姓名" v-model="form.classId">
              <option value="1">大班</option>
              <option value="2">中班</option>
              <option value="3">小班</option>
            </select>
          </div>                      
        </div>
      </div>
    </div>  
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary">发布</a>
      </div>      
    </div>
  </div>  
</template>
<script>
export default {
  name: "community",
  data() {
    return {
      form: {
        classId: 1,
        contentType: null,
        textContent: "",
        images: [],
        video: ""
      }
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.page-bd {
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

