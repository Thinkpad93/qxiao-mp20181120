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
        <form class="form" id="form" ref="form">
          <div class="form-tiem">
            <textarea
              class="textarea min-h400"
              placeholder="请输入评价标准"
              maxlength="20"
              v-model.trim="dialogForm.ruleText"
            ></textarea>
          </div>
          <div class="form-tiem">
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
            :on-close="onClose(index, item.ruleId)"
          >
            <van-cell-group>
              <div class="cell min-h120">
                <div class="cell-hd">
                  <van-checkbox-group v-model="chenkedList">
                    <van-checkbox
                      :key="item.ruleId"
                      :name="item.ruleId"
                      checked-color="#1989fa"
                      ref="checkboxes"
                    ></van-checkbox>
                  </van-checkbox-group>
                </div>
                <div class="cell-bd pl-20">
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
    <div class="page-ft">
      <div class="tapeti">
        <div class="tapeti-left">
          <van-button type="default" @click="dialogVisible = true">新增评价标准</van-button>
        </div>
        <div class="tapeti-right">
          <van-button type="info" @click="handleSave">确认</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import pageMixin from "@/mixins/page";
export default {
  name: "actionEdit",
  mixins: [pageMixin],
  data() {
    return {
      form: {},
      chenkedList: [],
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.openStudentId,
        actionId: this.$route.query.actionId,
        actionType: this.$route.query.actionType
      },
      dialogForm: {
        openId: this.$store.state.user.info.openId,
        actionId: this.$route.query.actionId,
        actionType: this.$route.query.actionType,
        ruleText: "",
        stressFlag: true
      }
    };
  },
  methods: {
    onClose(index, ruleId) {
      return (clickPosition, instance) => {
        switch (clickPosition) {
          case "right":
            this.$dialog
              .confirm({
                title: "提示",
                message: "确认要删除该行为标准吗?"
              })
              .then(async () => {
                instance.close();
                let obj = {
                  openId: this.dialogForm.openId,
                  actionType: this.dialogForm.actionType,
                  ruleId
                };
                //行为标准删除
                let res = await service.ruleDelete(obj);
                if (res.errorCode === 0) {
                  this.form.rules.splice(index, 1);
                }
              })
              .catch(() => {
                instance.close();
              });
            break;
        }
      };
    },
    //新增标准提交
    async handleSubmit(action, done) {
      if (action === "confirm") {
        if (this.dialogForm.ruleText == "") {
          this.$toast("请输入评价标准");
          done(false);
        } else {
          let { stressFlag, ...args } = this.dialogForm;
          stressFlag ? (stressFlag = 1) : (stressFlag = 0);
          //行为标准增加
          let res = await service.ruleAdd(
            Object.assign({}, args, { stressFlag })
          );
          if (res.errorCode === 0) {
            this.dialogForm.ruleText = "";
            this.queryStudentRule(this.query);
            done();
          }
        }
      } else {
        done();
      }
    },
    //提交保存
    async handleSave() {
      let { rules, actionId, actionType, ...args } = this.form;
      let openId = this.dialogForm.openId;
      let studentId = this.query.studentId;
      let obj = Object.assign({}, args, { openId, actionId, actionType });
      if (this.chenkedList.length) {
        //行为编辑更新
        let res = await service.actionUpdate(obj);
        if (res.errorCode === 0) {
          let rules = [...this.chenkedList];
          let params = Object.assign(
            {},
            { openId, studentId, actionId, actionType, rules }
          );
          //行为标准关联
          let result = await service.ruleConnect(params);
          if (result.errorCode === 0) {
            this.$router.go(-1);
          }
        } else if (res.errorCode === -1) {
          this.$toast(`${res.errorMsg}`);
        }
      } else {
        this.$toast("请勾选标准");
      }
    },
    //按行为查询已选中的规则
    async queryStudentRule(params = {}) {
      let res = await service.queryStudentRule(params);
      if (res.errorCode === 0) {
        this.form = res.data;
        let ruleList = [];
        res.data.rules.forEach(element => {
          //是否有选中的数据
          if (element.choice) {
            ruleList.push(element.ruleId);
          }
        });
        this.chenkedList = ruleList;
      }
    }
  },
  mounted() {
    this.queryStudentRule(this.query);
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
.form-tiem {
  margin: 30px;
}

.mod {
  margin-bottom: 20px;
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
