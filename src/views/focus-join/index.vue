<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells mb-20">
        <div class="cell min-h120" v-for="(item, index) in studentList" :key="index">
          <div class="cell-hd">
            <label class="label">{{ item.studentName }}</label>
          </div>
        </div>
      </div>
      <div class="cells">
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">家长手机号码</label>
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
        <div class="cell cell-select cell-select-after min-h120">
          <div class="cell-hd">
            <label for class="label">关系</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="form.relation">
              <!-- 兼容性问题修改 -->
              <optgroup disabled hidden></optgroup>
              <option
                :value="option.id"
                v-for="(option,index) in relationList"
                :key="index"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleSubmit">提交</van-button>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { isPhone } from "@/utils/validator";
import { relation } from "@/mixins/type";
export default {
  name: "focusJoin",
  mixins: [relation],
  data() {
    return {
      form: {
        id: this.$route.query.id,
        openId: this.$store.state.user.info.openId,
        tel: "",
        relation: 1
      },
      studentList: []
    };
  },
  methods: {
    handleSubmit() {
      let { tel } = this.form;
      if (isPhone(tel)) {
        this.joinStudent(this.form);
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    //查询学生列表--开放版
    async queryStudentByParId(params = {}) {
      let res = await service.queryStudentByParId(params);
      if (res.errorCode === 0) {
        this.studentList = res.data;
      }
    },
    //家长关注孩子
    async joinStudent(params = {}) {
      let res = await service.joinStudent(params);
      if (res.errorCode === 0) {
        let _cookie = Cookies.getJSON("info");
        let obj = Object.assign({}, _cookie, res.data);
        this.$dialog
          .confirm({
            title: "提示",
            message: "关注成功，是否进入小Q智慧？"
          })
          .then(() => {
            this.$store.dispatch("user/setInfo", obj).then(data => {
              if (data.success === "ok") {
                this.$router.replace({
                  path: "/single"
                });
              }
            });
          })
          .catch(() => {
            this.form.tel = "";
          });
      }
    }
  },
  mounted() {
    this.queryStudentByParId({ id: this.form.id });
  }
};
</script>
<style lang="less" scoped>
</style>
