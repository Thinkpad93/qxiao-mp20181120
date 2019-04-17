<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label for class="label">头像</label>
          </div>
          <div class="cell-bd"></div>
          <div class="cell-ft">
            <img class="teacher-icon" src="http://iph.href.lu/50x50" alt>
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label class="label">宝宝姓名</label>
          </div>
          <div class="cell-bd">
            <input class="input" placeholder="请输入宝宝姓名" maxlength="4">
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label for class="label">性别</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl">
              <option selected>男</option>
              <option>女</option>
            </select>
          </div>
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label class="label">家长手机号码</label>
          </div>
          <div class="cell-bd">
            <input class="input" pattern="[0-9]*" placeholder="请输入家长手机号码">
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label class="label">与宝宝关系</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl">
              <option selected>父</option>
              <option>母</option>
            </select>
          </div>
        </div>
        <div class="cell cell-select cell-select-after">
          <div class="cell-hd">
            <label class="label">宝宝所在班级</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl">
              <option selected>父</option>
              <option>母</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary">提交</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "babyAdd",
  data() {
    return {};
  },
  activated() {
    console.log(this.$route);
  }
};
</script>
<style lang="less" scoped>
</style>
