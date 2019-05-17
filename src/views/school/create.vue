<template>
  <div class="page">
    <div class="page-hd">
      <div class="school-head">
        <div class="setp flex">
          <div class="circle on">1</div>
          <div class="line flex">
            <span class="on"></span>
            <span></span>
          </div>
          <div class="circle">2</div>
        </div>
        <div class="stepwz flex">
          <div class="s-green on">创建学校</div>
          <div class="s-gray">创建班级</div>
        </div>
      </div>
    </div>
    <div class="page-bd">
      <!-- 提交成功提示 -->
      <form action ref="form">
        <div class="cells" :style="{display: !views ? 'block': 'none'}">
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校名称</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入学校名称" v-model="form.schoolName" maxlength="30">
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">学校类型</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="form.type">
                <option
                  :value="option.id"
                  v-for="(option,index) in schoolTypeList"
                  :key="index"
                >{{ option.name }}</option>
              </select>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">详细地址</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入详细地址" maxlength="120" v-model="form.location">
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">姓名</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入姓名" v-model="form.leadName" maxlength="10">
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">手机号</label>
            </div>
            <div class="cell-bd">
              <input type="number" class="input" placeholder="请输入手机号" readonly v-model="form.tel">
            </div>
          </div>
        </div>
        <div class="cells" :style="{display: views ? 'block': 'none'}">
          <div class="cell">
            <div class="cell-bd">
              <p class="p">
                请编辑班级信息
                <!-- <span size-14 style="color: #888;">（也可不编辑，完成后再编辑）</span> -->
              </p>
            </div>
          </div>
          <div class="cell">
            <div class="cell-bd">
              <input
                class="input text-left"
                placeholder="请输入班级名称,例如: 小小班"
                v-model="className"
                maxlength="20"
              >
            </div>
            <div class="ft">
              <div class="createClass" @click="handleAddClass">添加班级</div>
            </div>
          </div>
        </div>
        <div class="cells-title" :style="{display: views ? 'block': 'none'}">已有班级列表</div>
        <div class="cells" :style="{display: views ? 'block': 'none'}">
          <div class="cell" v-for="(cla, index) in form.classes" :key="index">
            <div class="cell-hd">
              <label for>班级名称:</label>
            </div>
            <div class="cell-bd">
              <input
                class="input text-center"
                readonly
                placeholder
                v-model="cla.className"
                maxlength="20"
              >
            </div>
            <div class="cell-ft">
              <span style="color:#ce3c39" @click="handleDelClass(index)">删除</span>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="btn-group">
      <a
        v-if="!views"
        hclaref="javascript:;"
        class="btn btn-large btn-primary"
        @click="handleNextClick"
      >下一步</a>
      <a
        v-if="views"
        hclaref="javascript:;"
        class="btn btn-large btn-primary"
        @click="handleSubmit"
      >完成</a>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { schoolType } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
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
        type: 0,
        leadName: "",
        tel: this.$route.query.tel,
        openId: this.$store.state.user.info.openId,
        classes: []
      }
    };
  },
  methods: {
    handleNextClick() {
      let { schoolName, location, leadName, tel } = this.form;
      if (schoolName == "" || !schoolName.length) {
        this.$toast("请输入名称");
        return false;
      }
      if (location == "" || !location.length) {
        this.$toast("请输入详细地址");
        return false;
      }
      if (leadName == "" || !leadName.length) {
        this.$toast("请输入姓名");
        return false;
      }
      if (isPhone(tel)) {
        this.views = true;
      } else {
        this.$toast("请正确填写手机号");
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
      if (!this.form.classes.length) {
        this.$toast("请至少添加一个班级，谢谢");
      } else {
        let res = await service.schoolAdd(this.form);
        if (res.errorCode === 0) {
          let _cookie = Cookies.getJSON("info");
          let { tel, ...args } = res.data;
          let obj = Object.assign({}, _cookie, args);
          this.$store.dispatch("user/setInfo", obj).then(data => {
            if (data.success === "ok") {
              this.$router.replace({ path: "/home" });
            }
          });
        } else if (res.errorCode === -1) {
          this.$toast(`${res.errorMsg}`);
        }
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.school-head {
  height: 172px;
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
.createClass {
  color: #9cd248;
}
</style>
