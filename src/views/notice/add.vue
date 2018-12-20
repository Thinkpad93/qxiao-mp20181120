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
            <div class="cell-bd">
              <textarea class="textarea" placeholder="记录下孩子的成长点滴~" rows="6" v-model="form.textContent"></textarea>
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
            <div class="cell-bd">
              <label for="" class="label">是否需要确定</label>
            </div>   
            <div class="cell-ft">
              <input type="checkbox" v-model="form.needConfirm" class="weui-switch">
            </div>         
          </div>   
          <div class="cell cell-switch">
            <div class="cell-bd">
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
      schoolId: 1,
      imagesList: [],
      classList: [],
      form: {
        openId: "10086",
        title: "",
        textContent: "",
        images: [],
        needConfirm: true,
        senders: [],
        clockType: true,
        clockTime: ""
      }
    };
  },
  methods: {
    handleDelImg() {},
    handleChangeFile() {},
    //查询对应学校的所有班级
    async queryClass(schoolId) {
      let res = await service.queryClass({ schoolId });
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    }
  },
  mounted() {
    this.queryClass(this.schoolId);
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

.cell-switch {
  padding-top: 20px;
  padding-bottom: 20px;
  .cell-ft {
    font-size: 0;
  }
}
</style>
