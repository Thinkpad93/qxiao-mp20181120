<template>
  <div class="page">
    <div class="page-bd">
      <form action="" ref="form" method="post">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">速报标题</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入速报标题" v-model="form.title" maxlength="20">
            </div>
          </div> 
          <div class="cell">
            <div class="cell-bd">
              <textarea class="textarea" placeholder="请输入速报内容...~" rows="6" v-model="form.textContent"></textarea>
            </div>
          </div>   
          <div class="cell">
            <div class="cell-bd">
              <ul class="uploader-files">
                <li class="uploader-file" 
                  v-for="(file, index) in imagesList" 
                  :key="index"
                  :style="{backgroundImage: `url(${file})`}">
                  <img src="@/assets/image/del.png" alt="" @click="handleDelImg(index)">
                </li>
              </ul>
              <div class="uploader-input_box">
                <input name="file" type="file" class="uploader-input" @change="handleChangeFile" multiple="multiple" accept="image/*">
              </div>
            </div>
          </div>                             
        </div>
      </form>  
    </div>  
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary">发布</a>
      </div>      
    </div>     
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "freshAdd",
  data() {
    return {
      imagesList: [],
      form: {
        openId: null,
        title: "",
        textContent: "",
        images: [],
        senders: []
      }
    };
  },
  methods: {
    handleChangeFile() {}
  }
};
</script>
<style lang="less" scoped>
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
