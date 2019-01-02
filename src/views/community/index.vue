<template>
  <div class="page">
    <div class="page-bd">
      <form action="" ref="form" method="post" enctype="multipart/form-data">
        <input type="submit" id="submission" hidden>
        <div class="cells">
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <textarea class="textarea" placeholder="记录下孩子的成长点滴~" rows="6" v-model="form.textContent"></textarea>
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <ul class="uploader-files">
                <li class="uploader-file" 
                  v-for="(file, index) in form.images" 
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
              <input type="text" readonly class="input" placeholder="请选择发送的班级" @click="handleSelectClass" v-model="className">
              <!-- <select class="select" name="" dir="rtl" v-model="form.classId">
                <option  :value="option.classId" v-for="(option,index) in classList" :key="index">{{ option.className }}</option>
              </select> -->
            </div>                      
          </div>
        </div>
      </form>
    </div>  
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary" id="btn-Submission" @click="handleSubmit">发布</a>
      </div>      
    </div>
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "community",
  data() {
    return {
      className: this.$store.getters.className,
      imagesList: [],
      classList: [],
      query: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      form: {
        openId: this.$store.getters.openId,
        classId: this.$store.getters.classId,
        contentType: 0,
        textContent: "",
        images: [],
        video: ""
      }
    };
  },
  methods: {
    handleSelectClass() {
      this.$weui.picker(this.classList, {
        defaultValue: [this.form.classId],
        onConfirm: result => {
          this.className = result[0].label;
          this.form.classId = result[0].value;
        }
      });
    },
    handleDelImg(index) {
      return this.form.images.splice(index, 1);
    },
    handleChangeFile(e) {
      let files = e.target.files;
      if (!files.length) {
        return;
      }
      this.handleShowImg(files);
    },
    handleShowImg(files) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        var imageType = /^image\//;
        if (!imageType.test(file.type)) {
          continue;
        }
        let reader = new FileReader();
        reader.onload = e => {
          this.form.images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    handleSubmit() {
      let { textContent, classId } = this.form;
      if (textContent == "") {
        this.$weui.alert("请输入内容", () => {}, { title: "提示" });
        return;
      }
      if (classId == null || this.className == "") {
        this.$weui.alert("请选择发送的班级", () => {}, { title: "提示" });
        return;
      }
      this.communityAdd(this.form);
      //document.getElementById("submission").click();
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        let classMap = res.data.map(item => {
          return {
            label: item.className,
            value: item.classId
          };
        });
        this.classList = classMap;
      }
    },
    //发布班级圈
    async communityAdd(params = {}) {
      let res = await service.communityAdd(params);
      if (res.errorCode === 0) {
        this.$weui.alert(
          "发布成功",
          () => {
            this.$router.go(-1);
          },
          { title: "提示" }
        );
      }
    }
  },
  mounted() {
    this.queryClassId(this.query);
  }
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

