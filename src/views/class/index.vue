<template>
  <div class="page">
    <div class="page-bd">
      <!-- <div class="class-head">
        <a href="javascript:void(0);" class="btn btn-primary" @click="dialogVisible = true">添加班级</a>
      </div>-->
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
              />
            </div>
          </div>
        </div>
      </van-dialog>
      <van-swipe-cell
        ref="swipeCell"
        :right-width="60"
        v-for="(item, index) in list"
        :key="index"
        :on-close="onClose(index, item)"
      >
        <van-cell-group>
          <div class="cells">
            <div class="cell min-h120" @click="handleEditClass(item)">
              <div class="cell-bd">
                <p size-17 class="text-ellipsis">{{ item.className }}</p>
                <p>
                  <span class="t" size-12>带班老师{{ item.countTeacher }}人</span>
                  <span class="s" size-12>关联学生{{ item.countStudent }}人</span>
                </p>
              </div>
            </div>
          </div>
        </van-cell-group>
        <span slot="right">删除</span>
      </van-swipe-cell>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom" style="z-index: 100;">
        <van-button type="info" size="large" class="no-radius" to="/class/add">添加</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import pageMixin from "@/mixins/page";
export default {
  name: "class",
  mixins: [pageMixin],
  data() {
    return {
      className: "",
      schoolId: this.$store.state.user.info.id,
      openId: this.$store.state.user.info.openId,
      list: []
    };
  },
  methods: {
    onClose(index, item) {
      return (clickPosition, instance) => {
        switch (clickPosition) {
          case "right":
            this.$dialog
              .confirm({
                title: "提示",
                message: "确认要删除该班级吗?"
              })
              .then(async () => {
                let { classId, countStudent, countTeacher } = item;
                if (countStudent > 0 || countTeacher > 0) {
                  instance.close();
                  this.$toast("班级还有关联学生和老师，不能删除班级");
                  return;
                }
                let res = await service.classDelete({
                  classId,
                  openId: this.openId
                });
                if (res.errorCode === 0) {
                  this.list.splice(index, 1);
                } else if (res.errorCode === -1) {
                  this.$toast(`${res.errorMsg}`);
                }
              })
              .catch(() => {
                instance.close();
              });
        }
      };
    },
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
    handleEditClass(item) {
      this.$router.push({
        path: "/class/edit",
        query: {
          classId: item.classId,
          className: item.className
        }
      });
    },
    //查询对应学校的所有班级
    async queryClass(schoolId) {
      let res = await service.queryClass({ schoolId });
      if (res.errorCode === 0) {
        this.list = res.data;
      }
    },
    //班级创建
    async classAdd(params = {}) {
      let res = await service.classAdd(params);
      if (res.errorCode === 0) {
        this.className = "";
        this.queryClass(this.schoolId);
        //更新store
        let obj = {
          id: this.$store.state.user.info.id,
          roleType: 1,
          studentId: this.$store.state.user.info.studentId
        };
        this.$store.dispatch("queryClass/queryClassId", obj);
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  mounted() {
    this.queryClass(this.schoolId);
  }
};
</script>
<style lang="less" scoped>
span.t {
  color: #409eff;
}
span.s {
  color: #ff40d9;
}
</style>
