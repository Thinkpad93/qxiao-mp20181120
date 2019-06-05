<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells-title">基础信息</div>
      <div class="cells">
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">学校名称</label>
          </div>
          <div class="cell-bd">
            <div class="cell-bd">
              <input class="input" placeholder="请输入学校名称" v-model="form.schoolName">
            </div>
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">班级名称</label>
          </div>
          <div class="cell-bd">
            <div class="cell-bd">
              <input class="input" placeholder="请输入班级名称" v-model="form.className">
            </div>
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">老师姓名</label>
          </div>
          <div class="cell-bd">
            <div class="cell-bd">
              <input class="input" placeholder="请输入老师姓名" maxlength="5" v-model="form.teacherName">
            </div>
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">老师手机号</label>
          </div>
          <div class="cell-bd">
            <input
              class="input"
              type="number"
              pattern="[0-9]*"
              placeholder="请输入手机号"
              v-model="form.tel"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex-ft">
      <van-button size="large" type="info" class="no-radius" @click="handleSubmit">提交</van-button>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { isPhone } from "@/utils/validator";
export default {
  name: "createClass",
  data() {
    return {
      form: {
        schoolName: "",
        id: null,
        className: "",
        teacherName: "",
        tel: "",
        code: "",
        openId: null
      },
      schoolList: []
    };
  },
  methods: {
    handleSubmit() {},
    //查询学校模板
    async querySchoolName(schoolName) {
      let res = await service.querySchoolName({ schoolName });
      if (res.errorCode === 0) {
      }
    },
    //创建班级
    async addPlaySchoolWithTemplate(params = {}) {
      let res = await service.addPlaySchoolWithTemplate(params);
      if (res.errorCode === 0) {
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
