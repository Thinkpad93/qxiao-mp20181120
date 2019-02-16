<template>
  <div class="page">
    <div class="page-bd">
      <form action ref="form">
        <div class="cells-title">基础信息</div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">学生姓名</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入学生姓名" maxlength="10" v-model="form.studentName">
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
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">学生所在班级</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="form.classId">
                <option
                  :value="option.classId"
                  v-for="(option,index) in classList"
                  :key="index"
                >{{ option.className }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="cells-title">
          <span></span>
          <a href="javascript:void(0);" class="btn btn-primary" @click="handleAddLinkMan">新增家长</a>
        </div>
        <div class="cells" v-for="(link,index) in form.linkMan" :key="index">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">家长手机号</label>
            </div>
            <div class="cell-bd">
              <input
                type="number"
                class="input"
                pattern="[0-9]*"
                placeholder="请输入手机号"
                v-model="link.tel"
              >
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">学生和家长关系</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="link.relation">
                <option
                  :value="option.id"
                  v-for="(option,index) in relationList"
                  :key="index"
                >{{ option.name }}</option>
              </select>
            </div>
          </div>
          <div class="cells-footer" v-if="form.linkMan.length > 1">
            <div class="cell">
              <a href="javascript:void(0);" class="btn btn-warn" @click="handleDelLinkMan(index)">删除</a>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="btn-area">
      <a href="javascript:void(0);" class="btn btn-large btn-primary" @click="handleSubmit">提交</a>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "studentAdd",
  mixins: [sex, relation],
  data() {
    return {
      classList: [],
      query: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      form: {
        openId: this.$store.getters.openId,
        studentName: "",
        sex: 1,
        linkMan: [{ relation: 1, tel: "" }],
        classId: null
      }
    };
  },
  methods: {
    handleAddLinkMan() {
      if (this.form.linkMan.length >= 2) {
        this.$toast("只能添加两名家长");
        return;
      }
      this.form.linkMan.push({ relation: 1, tel: "" });
    },
    handleDelLinkMan(index) {
      return this.form.linkMan.splice(index, 1);
    },
    handleSubmit() {
      let { studentName, classId, linkMan } = this.form;
      if (studentName == "" || !studentName.length) {
        this.$toast("请输入学生姓名");
        return false;
      }
      if (!classId) {
        this.$toast("请选择学生所在班级");
        return false;
      }
      //for
      for (let i = 0; i < linkMan.length; i++) {
        let tel = linkMan[i].tel;
        if (!isPhone(tel)) {
          this.$toast("请正确填写手机号");
          return;
        }
      }
      let obj = Object.assign({}, this.form);
      this.studentAdd(obj);
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //学生新增
    async studentAdd(params = {}) {
      let res = await service.studentAdd(params);
      if (res.errorCode === 0) {
        this.$refs.form.reset();
        this.$router.go(-1);
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    this.queryClassId(this.query);
  }
};
</script>
<style lang="less">
.cells-footer {
  .cell {
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
  }
  a {
    font-size: 28px;
    border-radius: 0;
  }
}
</style>
