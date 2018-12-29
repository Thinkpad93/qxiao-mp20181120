<template>
  <div class="pagea">
    <div class="page-bd">
      <form action="" ref="form" method="post" enctype="multipart/form-data">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">通知标题</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入通知标题" v-model="form.title" maxlength="20">
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <textarea class="textarea" placeholder="记录下孩子的成长点滴~" rows="6" v-model="form.textContent"></textarea>
            </div>
          </div>          
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
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
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">发送班级</label>
            </div>  
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="form.classId">
                <option  :value="option.classId" v-for="(option,index) in classList" :key="index">{{ option.className }}</option>
              </select>
            </div>                      
          </div>      
          <div class="cell cell-switch">
            <div class="cell-bd" style="padding-left:0">
              <label for="" class="label">是否需要确定</label>
            </div>   
            <div class="cell-ft">
              <input type="checkbox" v-model="form.needConfirm" class="weui-switch">
            </div>         
          </div>   
          <div class="cell cell-switch">
            <div class="cell-bd" style="padding-left:0">
              <label for="" class="label">是否定时发送</label>
            </div>   
            <div class="cell-ft">
              <input type="checkbox" v-model="form.clockType" class="weui-switch">
            </div>         
          </div>    
          <template v-if="form.clockType">
            <div class="cell">
              <div class="cell-hd">
                <label for="" class="label">发送时间</label>
              </div>
              <div class="cell-bd">
                <input class="input" placeholder="请选择发送时间" readonly v-model="form.clockTime">
              </div>
            </div>  
          </template>                            
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
  namae: "noticeAdd",
  data() {
    return {
      imagesList: [],
      classList: [],
      form: {
        openId: this.$store.getters.openId, //用户openid
        title: "", //通知标题
        textContent: "", //通知内容
        images: [], //图片
        needConfirm: true, //是否需要确认
        senders: [], //发送对象
        sendType: 2, //发送类型 2-老师，1-班级
        senderId: null, //老师Id ,班级Id
        clockType: true, //定时发送标志 0-即时发送 1-定时发送
        clockTime: "" //定时发送时间
      }
    };
  },
  methods: {
    handleDelImg() {},
    handleChangeFile() {}
  },
  mounted() {}
};
</script>
<style lang="less">
.uploader-file {
  float: left;
  width: 140px;
  height: 140px;
  position: relative;
  background-size: cover;
  margin: 20px 0 0 0;
  border-radius: 4px;
  margin-right: 20px;
  img {
    position: absolute;
    top: -10%;
    right: -10%;
    z-index: 10;
  }
}
</style>
