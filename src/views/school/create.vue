<template>
  <div class="page">
    <div class="page-hd">
      <div class="setp flex">
        <div class="circle on">1</div>
        <div class="line flex">
          <span class="on"></span>
          <span></span>
        </div>
        <div class="circle">2</div>
      </div>
      <div class="stepwz flex">
        <div class="s-green on">创建幼儿园</div>
        <div class="s-gray">创建班级</div>
      </div>
    </div>
    <div class="page-bd">
      <!-- 提交成功提示 -->
      <form action="" ref="form">
        <div class="cells" :style="{display: !views ? 'block': 'none'}">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">幼儿园名称</label>
            </div>        
            <div class="cell-bd">
              <input class="input" placeholder="请输入幼儿园名称" v-model="form.schoolName" maxlength="20">
            </div>        
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">幼儿园类型</label>
            </div>  
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="form.type">
                <option  :value="option.id" v-for="(option,index) in schoolTypeList" :key="index">{{ option.name }}</option>
              </select>
            </div>                
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">详细地址</label>
            </div>   
            <div class="cell-bd">
              <input class="input" placeholder="请输入详细地址" maxlength="120" v-model="form.location">
            </div>                  
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">园长姓名</label>
            </div>        
            <div class="cell-bd">
              <input class="input" placeholder="请输入园长姓名" v-model="form.leadName" maxlength="4">
            </div>             
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">园长手机号</label>
            </div>    
            <div class="cell-bd">
              <input type="number" class="input" placeholder="请输入园长手机号" readonly v-model="form.tel">
            </div>                   
          </div>
        </div>  
        <div class="cells" :style="{display: views ? 'block': 'none'}">
          <div class="cell">
            <div class="cell-bd">
              <p class="p">请编辑班级信息<span size-14 style="color: #888;">（也可不编辑，完成后再编辑）</span></p>
            </div>
          </div> 
          <div class="cell" v-for="(cla, index) in form.classes" :key="index">
            <div class="cell-hd">
              <label for="">班级名称:</label>
            </div>
            <div class="cell-bd">
              <input class="input text-center" readonly placeholder="" v-model="cla.className" maxlength="10">
            </div>   
            <div class="cell-ft">
              <span style="color:#ce3c39" @click="handleDelClass(index)">删除</span>
            </div>          
          </div>
          <div class="cell">
            <div class="cell-bd">
              <input class="input text-left" placeholder="请输入班级名称,例如: 小小班" v-model="className" maxlength="10">
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd">
              <p class="p">
                <img src="@/assets/image/+.png" alt="" @click="handleAddClass">
              </p>
            </div>
          </div>
        </div> 
      </form>
    </div>
    <div class="page-ft">
      <div class="btn-area">
        <a v-if="!views" hclaref="javascript:;" class="btn btn-primary" @click="handleNextClick">下一步</a>
        <a v-if="views" hclaref="javascript:;" class="btn btn-primary" @click="handleSubmit">完成</a>
      </div>
    </div>
  </div>     
</template>
<script>
import service from "@/api";
import { schoolType } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
import { mapGetters } from "vuex";
export default {
  name: "schoolCreate",
  mixins: [schoolType],
  data() {
    return {
      views: false,
      className: "",
      form: {
        schoolName: "",
        location: "",
        type: 1,
        openId: "10086",
        leadName: "",
        tel: "",
        classes: []
      }
    };
  },
  computed: {
    ...mapGetters(["tel"])
  },
  methods: {
    handleNextClick() {
      let { schoolName, location, leadName, tel } = this.form;
      if (schoolName == "" || !schoolName.length) {
        this.$weui.topTips("请输入幼儿园名称");
        return false;
      }
      if (location == "" || !location.length) {
        this.$weui.topTips("请输入详细地址");
        return false;
      }
      if (leadName == "" || !leadName.length) {
        this.$weui.topTips("请输入园长姓名");
        return false;
      }
      if (isPhone(tel)) {
        this.views = true;
      } else {
        this.$weui.topTips("请正确填写手机号");
      }
    },
    handleAddClass() {
      if (this.className) {
        this.form.classes.push({ className: this.className });
        this.className = "";
      }
    },
    handleDelClass(index) {
      this.form.classes.splice(index, 1);
    },
    async handleSubmit() {
      let res = await service.schoolAdd(this.form);
      if (res.errorCode === 0) {
        let { schoolCode, schoolId } = res.data;
        this.$store.commit("user/SET_SCHOOLCODE", schoolCode);
        this.$store.commit("user/SET_SCHOOLID", schoolId);
        this.$router.push({ path: "/home" });
      }
    }
  },
  mounted() {
    this.form.tel = this.tel;
  },
  activated() {}
};
</script>
<style lang="less" scoped>
.getCenter {
  position: fixed;
  left: 0;
  top: 50%;
  height: auto;
  width: 100%;
  z-index: 100;
}
.page-hd {
  margin-bottom: 20px;
  height: 172px;
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

.setp {
  align-items: center;
  width: 380px;
  margin: 0 auto;
  padding-top: 40px;
  .circle {
    text-align: center;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    color: #fff;
    background-color: #e7e7e7;
    &.on {
      background-color: #9cd248;
    }
  }
  .line {
    flex: 1;
    span {
      display: inline-block;
      flex: 1;
      height: 4px;
      background-color: #e7e7e7;
      &.on {
        background-color: #9cd248;
      }
    }
  }
}
.stepwz {
  width: 460px;
  margin: 10px auto 0 auto;
  color: #d7d7d7;
  justify-content: space-between;
  .on {
    color: #9cd248;
  }
}
</style>
