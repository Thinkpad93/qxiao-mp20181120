<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label class="label">姓名</label>
          </div>
          <div class="cell-bd">
            <input class="input" placeholder="请输入姓名" maxlength="5" v-model="form.studentName">
          </div>
        </div>
      </div>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleSubmit">添加</van-button>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "childEdit",
  data() {
    return {
      form: {}
    };
  },
  methods: {
    handleSubmit() {}
  }
};
</script>
<style lang="less" scoped>
</style>
