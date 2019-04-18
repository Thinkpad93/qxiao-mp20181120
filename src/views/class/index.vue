<template>
  <div class="flex">
    <div class="flex-bd">
      <div class="class-head">
        <a href="javascript:void(0);" class="btn btn-primary" @click="dialogVisible = true">添加班级</a>
      </div>
      <!-- -->
      <van-dialog
        v-model="dialogVisible"
        title="班级名称"
        show-cancel-button
        @cancel="dialogVisible = false"
        :before-close="handleSubmit"
      >
        <div class="cells" style="padding:15px 0 15px 0;">
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <input
                class="input"
                placeholder="请输入班级名称"
                maxlength="20"
                v-model="className"
                style="text-align:left;"
              >
            </div>
          </div>
        </div>
      </van-dialog>
      <div class="cells mb-20">
        <div
          class="cell class-boxs"
          @click="handleEditClass(item)"
          v-for="(item, index) in classList"
          :key="index"
        >
          <div class="cell-bd">
            <p size-17 class="text-ellipsis">{{ item.className }}</p>
            <p>
              <span class="t" size-12>带班老师{{ item.countTeacher }}人</span>
              <span class="s" size-12>关联学生{{ item.countStudent }}人</span>
            </p>
          </div>
          <div class="cell-ft">
            <a href="javascript:;" class="btn btn-del" size-12 @click.stop="handleDelClass(item)">删除</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "class",
  data() {
    return {
      dialogVisible: false,
      className: "",
      schoolId: this.$store.state.users.id,
      openId: this.$store.state.wx.openId,
      classList: []
    };
  },
  methods: {
    handleSubmit(action, done) {
      if (action === "confirm") {
        if (this.className == "") {
          this.$toast("请输入班级名称");
          done(false);
        } else {
          let obj = Object.assign(
            {},
            {
              className: this.className,
              schoolId: this.schoolId,
              openId: this.openId
            }
          );
          this.classAdd(obj);
          done();
        }
      } else {
        done();
      }
    },
    handleDelClass(params) {
      let { classId, countStudent, countTeacher } = params;
      if (countStudent > 0 || countTeacher > 0) {
        this.$toast("班级还有关联学生和老师，不能删除班级");
        return;
      }
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除班级吗？"
        })
        .then(() => {
          this.classDelete({ classId, openId: this.openId });
        })
        .catch(() => {});
    },
    handleEditClass(item) {
      this.$router.push({
        path: "/class/edit",
        query: { classId: item.classId, className: item.className }
      });
    },
    //查询对应学校的所有班级
    async queryClass(schoolId) {
      let res = await service.queryClass({ schoolId });
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //班级创建
    async classAdd(params = {}) {
      let res = await service.classAdd(params);
      if (res.errorCode === 0) {
        this.className = "";
        this.queryClass(this.schoolId);
      }
    },
    //班级删除
    async classDelete(params = {}) {
      let res = await service.classDelete(params);
      if (res.errorCode === 0) {
        this.queryClass(this.schoolId);
      } else if (res.errorCode === -1) {
        this.$weui.topTips(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    this.queryClass(this.schoolId);
  }
};
</script>
<style lang="less" scoped>
.class-head {
  padding: 30px 0;
  margin-bottom: 20px;
  text-align: center;
  background-color: #fff;
  > a {
    width: 240px;
  }
}
.class-boxs {
  height: 120px;
  margin-bottom: 0;
  .cell-bd {
    padding-left: 0;
  }
}
.btn-edit {
  width: 100px;
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
  background-color: #d1e0f6;
}
.btn-del {
  width: 100px;
  height: 50px;
  line-height: 50px;
  background-color: #ce3c39;
}
span.t {
  color: #409eff;
}
span.s {
  color: #ff40d9;
}
</style>
