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
            <div class="cell-bd" style="padding-left:0">
              <textarea class="textarea" placeholder="请输入速报内容...~" rows="6" v-model="form.textContent"></textarea>
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
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">发送班级</label>
            </div>  
            <div class="cell-bd" style="padding-left:0">
              <select class="select" name="select" dir="rtl" v-model="selected" multiple size="1">
                <!-- 兼容性问题修改 -->
                <optgroup disabled hidden></optgroup>
                <option  :value="option.classId" v-for="(option,index) in classList" :key="index">{{ option.className }}</option>
              </select>
            </div>            
          </div>                         
        </div>
      </form>  
    </div>  
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">发布</a>
      </div>      
    </div>     
  </div>  
</template>
<script>
import service from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "freshAdd",
  data() {
    return {
      imagesList: [],
      classList: [],
      selected: [],
      form: {
        openId: this.$store.getters.openId,
        title: "",
        textContent: "",
        images: [],
        senders: []
      }
    };
  },
  computed: {
    ...mapGetters(["id", "roleType"])
  },
  methods: {
    handleChangeFile() {},
    handleSelectClass() {},
    handleSubmit() {

    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },    
    async freshAdd(params = {}) {
      let res = await service.freshAdd(params);
      if (res.errorCode === 0) {
        
      }
    }
  },
  mounted() {
    this.queryClassId({ id: this.id, roleType: this.roleType });
  }  
};
</script>
<style lang="less">
</style>
