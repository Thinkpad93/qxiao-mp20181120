<template>
  <div class="pages">
    <div class="page-bd">
      <form action="" ref="form" method="post" enctype="multipart/form-data">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">作业标题</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入作业标题" v-model="form.title" maxlength="20">
            </div>
          </div> 
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <div id="contenteditable" contenteditable v-html="form.textContent"></div>
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
              <select class="select" name="select" dir="rtl" v-model="selected" multiple size="1">
                <!-- 兼容性问题修改 -->
                <optgroup disabled hidden></optgroup>
                <option  :value="option.classId" v-for="(option,index) in classList" :key="index">{{ option.className }}</option>
              </select>
            </div>                      
          </div>             
          <div class="cell cell-switch">
            <div class="cell-bd" style="padding-left:0">
              <label for="" class="label">是否需要确定</label>
            </div>   
            <div class="cell-ft">
              <input type="checkbox" v-model="needSwitch" class="weui-switch">
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
  name: "homeWorkAdd",
  data() {
    return {
      imagesList: [],
      classList: [],
      selected: [],
      needSwitch: false,
      form: {
        openId: this.$store.getters.openId,
        title: "",
        textContent:
          "1963年4月26日生于北京市，华语影视男演员、导演、制作人 、武术运动员、商人。",
        images: [
          {
            imageUrl:
              "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1604641827,2225865630&fm=58&bpow=400&bpoh=565"
          }
        ],
        needConfirm: 0, //0-无需确认 1-需要确认
        senders: []
      }
    };
  },
  computed: {
    ...mapGetters(["id", "roleType"])
  },
  methods: {
    handleDelImg() {},
    handleChangeFile() {},
    handleSubmit() {
      let { title, textContent } = this.form;
      if (title == "") {
        this.$weui.alert("请输入作业标题", () => {}, { title: "提示" });
        return;
      }
      if (title == "") {
        this.$weui.alert("请输入作业内容", () => {}, { title: "提示" });
        return;
      }
      if (!this.selected.length) {
        this.$weui.alert("请选择发送班级", () => {}, { title: "提示" });
        return;
      }
      if (this.needSwitch) {
        this.form.needConfirm = 1;
      }
      this.form.senders = this.selected.map(item => {
        return { classId: item };
      });
      console.log(this.form);
      //this.homeworkAdd(this.form);
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //作业发布
    async homeworkAdd(params = {}) {
      let res = await service.homeworkAdd(params);
      if (res.errorCode === 0) {
        this.$weui.alert(
          "作业发布成功",
          () => {
            this.$router.go(-1);
          },
          { title: "提示" }
        );
      }
    }
  },
  mounted() {
    this.queryClassId({ id: this.id, roleType: this.roleType });
  }
};
</script>
<style lang="less">
#contenteditable {
  min-height: 300px;
  padding: 20px 20px 20px 0;
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
</style>
