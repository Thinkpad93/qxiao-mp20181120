<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells-title">基础信息</div>
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label class="label">姓名</label>
          </div>
          <div class="cell-bd">
            <input class="input" placeholder="请输入老师姓名" maxlength="10" v-model="form.teacherName">
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label for class="label">性别</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="form.sex">
              <option
                :value="option.id"
                v-for="(option,index) in sexList"
                :key="index"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label class="label">手机号码</label>
          </div>
          <div class="cell-bd">
            <input class="input" pattern="[0-9]*" placeholder="请输入手机号" v-model="form.tel">
          </div>
        </div>
      </div>
      <div class="cells-title">职务信息</div>
      <div class="cells">
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label class="label">职务类别</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="form.type">
              <option
                :value="option.id"
                v-for="(option,index) in typeList"
                :key="index"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label class="label">任教班级</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="selected" multiple size="5">
              <!-- 兼容性问题修改 -->
              <optgroup disabled hidden></optgroup>
              <option
                :value="option.classId"
                v-for="(option,index) in classList"
                :key="index"
              >{{ option.className }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="btn-area btn-area-group">
        <van-button size="normal" type="danger" @click="handleDel">删除</van-button>
        <van-button size="normal" type="primary" @click="handleSubmit">保存</van-button>
        <!-- <a href="javascript:void(0);" class="btn btn-warn" @click="handleDel">删除</a>
        <a href="javascript:void(0);" class="btn btn-primary" @click="handleSubmit">保存</a>-->
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { type, sex } from "@/mixins/type";
import classList from "@/mixins/classList";
export default {
  name: "teacherAdd",
  mixins: [type, sex, classList],
  data() {
    return {
      selected: [],
      querys: {
        openId: this.$store.state.user.info.openId,
        teacherId: this.$route.query.teacherId
      },
      form: {
        classes: []
      }
    };
  },
  methods: {
    handleDel() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除老师吗？"
        })
        .then(() => {
          let obj = {
            openId: this.$store.state.user.info.openId,
            teacherId: this.$route.query.teacherId
          };
          this.teacherDelete(obj);
        })
        .catch(() => {});
    },
    handleSubmit() {
      if (!this.selected.length) {
        this.$toast("请选择任教班级，支持多选");
        return false;
      }
      let classes = this.selected.map(item => {
        return { classId: item };
      });
      let obj = Object.assign({}, this.form, {
        classes,
        openId: this.$store.state.user.info.openId
      });
      this.teacherUpdate(obj);
    },
    //老师删除
    async teacherDelete(params = {}) {
      let res = await service.teacherDelete(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    //老师修改
    async teacherUpdate(params = {}) {
      let res = await service.teacherUpdate(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //老师信息查询
    async teacherQuery(params = {}) {
      let res = await service.teacherQuery(params);
      if (res.errorCode === 0) {
        let { classes, ...args } = res.data;
        this.form = args;
        this.selected = classes;
      }
    }
  },
  mounted() {
    this.teacherQuery(this.querys);
  }
};
</script>
<style lang="less" scoped>
.btn-area-group {
  justify-content: space-between;
  > a {
    width: 200px;
  }
}
</style>
