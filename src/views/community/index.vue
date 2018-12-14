<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div class="cell">
          <div class="cell-hd"></div>
          <div class="cell-bd">
            <textarea class="textarea" placeholder="记录下孩子的成长点滴~" rows="8"></textarea>
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">发送对象</label>
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
          <div class="cell-bd">
            <ul class="uploader-files"></ul>
            <div class="uploader-input_box">
              <input type="file" class="uploader-input">
            </div>
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
        textContent: "",
        images: []
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
</style>

