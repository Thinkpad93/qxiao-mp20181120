<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells">
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">学生姓名</label>
          </div>
          <div class="cell-bd">
            <input
              class="input"
              placeholder="请输入姓名"
              maxlength="5"
              v-model="info.studentName"
              readonly
            >
          </div>
        </div>
        <div class="cell cell-select cell-select-after min-h120">
          <div class="cell-hd">
            <label for class="label">性别</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="info.sex" disabled>
              <option
                :value="option.id"
                v-for="(option,index) in sexList"
                :key="index"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
        <div class="cell min-h120" v-if="info.schoolName">
          <div class="cell-hd">
            <label class="label">就读学校</label>
          </div>
          <div class="cell-bd">
            <input class="input" v-model="info.schoolName" readonly>
          </div>
        </div>
        <div class="cell min-h120" v-if="info.className">
          <div class="cell-hd">
            <label class="label">所在班级</label>
          </div>
          <div class="cell-bd">
            <input class="input" v-model="info.className" readonly>
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">出生日期</div>
          <div class="cell-bd">
            <input
              class="input"
              placeholder="请选择出生日期"
              v-model="info.birthday"
              readonly
              maxlength="20"
            >
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">地址</label>
          </div>
          <div class="cell-bd">
            <input
              class="input"
              placeholder="请输入地址"
              maxlength="100"
              v-model="info.address"
              readonly
            >
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label for class="label">家长手机号码</label>
          </div>
          <div class="cell-bd">
            <input class="input" placeholder="请输入手机号" v-model="info.tel" readonly unselectable="on">
          </div>
        </div>
        <div class="cell cell-select cell-select-after min-h120">
          <div class="cell-hd">
            <label for class="label">关系</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="info.relation" disabled>
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
  </div>
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
export default {
  name: "babyEdit",
  mixins: [sex, relation],
  data() {
    return {
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$route.query.studentId
      },
      info: {}
    };
  },
  methods: {
    //查询学生信息
    async studentQueryMe(params = {}) {
      let res = await service.studentQueryMe(params);
      if (res.errorCode === 0) {
        this.info = res.data;
      }
    }
  },
  mounted() {
    this.studentQueryMe(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
