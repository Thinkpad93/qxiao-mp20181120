<template>
  <div class="page">
    <div class="page-bd">
      <form action="" ref="form">
        <div class="cells-title">基础信息</div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label class="label">班级名称</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入班级名称" maxlength="10" v-model="form.className">
            </div>            
          </div>          
        </div>
      </form>
    </div>  
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary" @click="handleSubmit">提交</a>
      </div>
    </div>     
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "classAdd",
  data() {
    return {
      form: {
        className: "",
        openId: this.$store.getters.openId,
        schoolId: this.$store.getters.id
      }
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.className == "") {
        this.$weui.alert("请输入班级名称", () => {}, { title: "提示" });
      } else {
        this.classAdd(this.form);
      }
    },
    //班级创建
    async classAdd(params = {}) {
      let res = await service.classAdd(params);
      if (res.errorCode === 0) {
        this.$weui.alert(
          "班级创建成功",
          () => {
            this.$refs.form.reset();
            this.$router.go(-1);
          },
          {
            title: "提示"
          }
        );
      }
    }
  }
};
</script>
<style lang="less">
</style>
