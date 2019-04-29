<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- -->
      <van-dialog
        v-model="dialogVisible"
        title="评价标准"
        show-cancel-button
        :before-close="handleSubmit"
      >
        <form class="form" ref="dialogForm">
          <div class="form-item">
            <textarea
              class="textarea min-h400"
              placeholder="请输入评价标准"
              maxlength="20"
              v-model.trim="dialogForm.ruleText"
            ></textarea>
          </div>
          <div class="form-item">
            <van-checkbox v-model="dialogForm.stressFlag">是否侧重</van-checkbox>
          </div>
        </form>
      </van-dialog>
      <div class="mod mb-30">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">行为名称</div>
            <div class="cell-bd">
              <input placeholder="请输入行为名称" maxlength="4" class="input" v-model.trim="form.title">
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">行为说明</div>
            <div class="cell-bd">
              <input
                placeholder="例如: 培养孩子坚持力"
                maxlength="20"
                class="input"
                v-model.trim="form.textContent"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="cells-title">
        <p>评价标准</p>
        <a href="javascript:void(0);">侧重</a>
      </div>
      <div class="rule-list">
        <div class="cells">
          <van-swipe-cell
            ref="swipeCell"
            :right-width="60"
            v-for="(item, index) in form.rules"
            :key="index"
            :on-close="onClose(index)"
          >
            <van-cell-group>
              <div class="cell min-h120">
                <div class="cell-bd">
                  <p>{{ item.ruleText }}</p>
                </div>
                <div class="cell-ft">
                  <van-rate
                    v-model="item.stressFlag"
                    color="#f44"
                    void-color="#eee"
                    readonly
                    :count="1"
                    v-if="item.stressFlag"
                  />
                </div>
              </div>
            </van-cell-group>
            <span slot="right">删除</span>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <div class="flex-ft">
      <div class="tapeti">
        <div class="tapeti-left">
          <van-button type="default" @click="dialogVisible = true">新增评价标准</van-button>
        </div>
        <div class="tapeti-right">
          <van-button type="info" @click="handleSave">添加行为</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import pageMixin from "@/mixins/page";
export default {
  name: "actionAdd",
  mixins: [pageMixin],
  data() {
    return {
      form: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.openStudentId,
        title: "",
        textContent: "",
        rules: []
      },
      dialogForm: {
        ruleText: "",
        stressFlag: true
      }
    };
  },
  methods: {
    onClose(index) {
      return (clickPosition, instance) => {
        switch (clickPosition) {
          case "right":
            this.$dialog
              .confirm({
                title: "提示",
                message: "确认要删除该行为标准吗?"
              })
              .then(() => {
                instance.close();
                this.form.rules.splice(index, 1);
              })
              .catch(() => {
                instance.close();
              });
            break;
        }
      };
    },
    //新增标准提交
    handleSubmit(action, done) {
      if (action === "confirm") {
        if (this.dialogForm.ruleText == "") {
          this.$toast("请输入评价标准");
          done(false);
        } else {
          let { stressFlag, ...args } = this.dialogForm;
          stressFlag ? (stressFlag = 1) : (stressFlag = 0);
          this.form.rules.push(Object.assign({}, args, { stressFlag }));
          this.dialogForm.ruleText = "";
          done();
        }
      } else {
        done();
      }
    },
    //保存添加
    handleSave() {
      if (this.form.title == "") {
        this.$toast("请输入行为名称");
        return;
      }
      if (this.form.textContent == "") {
        this.$toast("请输入行为说明");
        return;
      }
      if (!this.form.rules.length) {
        this.$toast("请给行为添加评价标准");
        return;
      }
      this.actionAdd(this.form);
    },
    //行为添加
    async actionAdd(params = {}) {
      let res = await service.actionAdd(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.tapeti {
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    button {
      width: 100%;
      border-radius: 0;
    }
  }
}

.form {
  position: relative;
}
.form-item {
  margin: 30px;
}

.cells-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 20px;
  background-color: #fff;
}

.rule-list {
  margin-bottom: 20px;
}
</style>
