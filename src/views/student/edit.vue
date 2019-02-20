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
    <div class="btn-area flex">
      <a href="javascript:;" class="btn btn-warn" @click="handleDel">删除</a>
      <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">保存</a>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "studentEdit",
  mixins: [sex, relation],
  data() {
    return {
      classList: [],
      query: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      querys: {
        openId: this.$store.getters.openId,
        tel: this.$route.query.tel
      },
      form: {}
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
    handleDel() {
      let { studentId } = this.form;
      if (studentId) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定要删除学生吗？"
          })
          .then(() => {
            this.studentDelete({
              studentId,
              openId: this.querys.openId,
              tel: this.querys.tel
            });
          })
          .catch(() => {});
      }
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
      for (let i = 0; i < linkMan.length; i++) {
        let tel = linkMan[i].tel;
        if (!isPhone(tel)) {
          this.$toast("请正确填写手机号");
          return;
        }
      }
      this.studentUpdate(this.form);
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //学生信息查询
    async studentInfoQuery(params = {}) {
      let res = await service.studentInfoQuery(params);
      if (res.errorCode === 0) {
        this.form = res.data[0];
      }
    },
    //学生修改
    async studentUpdate(params = {}) {
      let res = await service.studentUpdate(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    },
    //学生删除
    async studentDelete(params = {}) {
      let res = await service.studentDelete(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    this.queryClassId(this.query);
    this.studentInfoQuery(this.querys);
  }
};
</script>
<style lang="less">
.btn-area {
  justify-content: space-between;
  > a {
    width: 200px;
  }
}
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
