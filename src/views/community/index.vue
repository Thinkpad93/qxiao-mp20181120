<template>
  <div class="page">
    <div class="page-hd"></div>
    <div class="page-bd">
      <form action="" ref="form" method="post" enctype="multipart/form-data">
        <input type="submit" id="submission" hidden>
        <div class="cells">
          <div class="cell">
            <div class="cell-bd">
              <textarea class="textarea" placeholder="记录下孩子的成长点滴~" rows="6" v-model="form.textContent"></textarea>
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd">
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
            <div class="cell-bd">
              <input type="text" readonly class="input" placeholder="请选择发送的班级" @click="handleSelectClass" v-model="form.classId">
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
      imagesList: [],
      classList: [],
      schoolId: this.$store.getters.schoolId,
      form: {
        openId: this.$store.getters.openId,
        classId: null,
        contentType: 0,
        textContent: "",
        images: [],
        video: ""
      }
    };
  },
  methods: {
    handleSelectClass() {
      let classMap = this.classList.map(item => {
        return {
          label: item.className,
          value: item.classId
        };
      });
      this.$weui.picker(classMap, {
        onConfirm: result => {}
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
      this.communityAdd(this.form);
      //document.getElementById("submission").click();
    },
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
    },
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

