<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- dialog -->
      <van-dialog
        v-model="dialogVisible"
        title="添加奖励"
        show-cancel-button
        :before-close="handleSubmit"
      >
        <form class="form">
          <div class="form-item">
            <textarea
              class="textarea min-h400"
              placeholder="请输入与孩子约定奖项内容,例如奖励20分钟游戏时间..."
              v-model="form.textContent"
            ></textarea>
          </div>
          <div class="form-item">
            <input
              type="number"
              placeholder="请输入Q星数量"
              class="input input-border"
              v-model="form.starCount"
            >
          </div>
        </form>
      </van-dialog>
      <div class="mod">
        <div class="pichi flex a-i-c">
          <div class="pichi-box">
            <div class="pichi-figure flex a-i-c" radius="50">
              <img src="@/assets/rate-icon@2x.png" width="30" height="30">
            </div>
            <div class="pichi-meta">
              <p>可交换Q星</p>
              <strong size-20>{{ statrCount }}</strong>
            </div>
          </div>
          <div class="pichi-btn">
            <a href="javascript:void(0);" @click="dialogVisible = true">添加奖励</a>
            <router-link :to="{path: '/prize/log'}">兑换记录</router-link>
          </div>
        </div>
      </div>
      <div class="cells-title">
        <p>奖励列表</p>
      </div>
      <div class="cells mb-30">
        <!-- 缺省的奖励不可删除 -->
        <van-swipe-cell
          ref="swipeCell"
          :right-width="60"
          v-for="(item, index) in list"
          :key="item.itemId"
          :disabled="item.prizeType === 0"
          :on-close="onClose(index,item.itemId, item.prizeType)"
        >
          <van-cell-group>
            <div class="cell min-h160">
              <div class="cell-hd">
                <van-checkbox v-model="item.checked" checked-color="#04b6ff" @change="chg"></van-checkbox>
              </div>
              <div class="cell-bd pl-20">
                <p class="mb-20" size-16>{{ item.textContent }}</p>
                <p style="color:#ff4d67">{{ item.starCount }}颗</p>
              </div>
              <div class="cell-ft">
                <van-stepper v-model="item.value" @change="chg"></van-stepper>
              </div>
            </div>
          </van-cell-group>
          <span slot="right" style="line-height: 80px;">删除</span>
        </van-swipe-cell>
      </div>
    </div>
    <div class="flex-ft">
      <div class="tapeti">
        <div class="tapeti-left">
          <p class="pl-20">合计Q星: {{ total }}</p>
        </div>
        <div class="tapeti-right">
          <van-button type="info" @click="handleSave">兑换</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import pageMixin from "@/mixins/page";
export default {
  name: "action",
  mixins: [pageMixin],
  data() {
    return {
      statrCount: 0,
      studentId: this.$store.state.user.info.openStudentId,
      query: {
        openId: this.$store.state.user.info.openId,
        page: 1,
        pageSize: 20
      },
      form: {
        openId: this.$store.state.user.info.openId,
        textContent: "",
        starCount: ""
      },
      list: [],
      total: 0
    };
  },
  methods: {
    onClose(index, itemId, prizeType) {
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
                  openId: this.query.openId,
                  itemId,
                  prizeType
                };
                //行为标准删除
                let res = await service.prizeDelete(obj);
                if (res.errorCode === 0) {
                  instance.close();
                  this.list.splice(index, 1);
                }
              })
              .catch(() => {
                instance.close();
              });
            break;
        }
      };
    },
    chg() {
      let n = 0;
      this.list.forEach(element => {
        if (element.checked) {
          n += element.starCount * element.value;
        }
      });
      this.total = n;
    },
    async handleSubmit(action, done) {
      if (action === "confirm") {
        if (this.form.textContent == "") {
          this.$toast("请输入奖项说明");
          done(false);
          return;
        }
        if (this.form.starCount == "") {
          this.$toast("请输入Q星数量");
          done(false);
          return;
        }
        let res = await service.prizeAdd(this.form);
        if (res.errorCode === 0) {
          done();
          this.dialogVisible = false;
          this.prizeListQuery(this.query);
        }
      } else {
        done();
      }
    },
    handleSave() {
      if (!this.total) {
        this.$toast("请勾选你要兑换的奖项");
        return;
      }
      if (this.total > this.statrCount) {
        this.$toast("你的Q星数量不够兑换的奖项哦");
        return;
      }
      let itemArray = [];
      this.list.forEach(element => {
        if (element.checked) {
          itemArray.push({
            itemId: element.itemId,
            times: element.value,
            prizeType: element.prizeType
          });
        }
      });
      if (itemArray.length) {
        let obj = {
          studentId: this.$store.state.user.info.openStudentId,
          openId: this.query.openId,
          itemArray
        };
        this.prizeExchange(obj);
      }
    },
    //获取可兑换星星数
    async queryTotalCountStar(params = {}) {
      let res = await service.queryTotalCountStar(params);
      if (res.errorCode === 0) {
        this.statrCount = res.data.totalCountStar;
      }
    },
    //奖励兑换
    async prizeExchange(params = {}) {
      let res = await service.prizeExchange(params);
      if (res.errorCode === 0) {
        this.$dialog
          .alert({
            message: "奖励兑换成功"
          })
          .then(() => {
            this.queryTotalCountStar({
              studentId: this.studentId,
              openId: this.query.openId
            });
            this.prizeListQuery(this.query);
          });
      }
    },
    //奖励列表查询
    async prizeListQuery(params = {}) {
      let res = await service.prizeListQuery(params);
      if (res.errorCode === 0) {
        if (res.data.data.length) {
          let m = res.data.data.map(element => {
            return {
              ...element,
              checked: false,
              value: 1 //由于后端没有该字段返回，默认设置一个
            };
          });
          this.list = m;
        }
      }
    }
  },
  mounted() {
    this.queryTotalCountStar({
      studentId: this.studentId,
      openId: this.query.openId
    });
    this.prizeListQuery(this.query);
  }
};
</script>
<style lang="less" scoped>
.tapeti {
  display: flex;
  align-items: center;
  background-color: #fff;
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

.mod {
  padding: 40px 0;
  background-color: #fff;
}

.cells-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 20px;
  background-color: #f6f8f9;
}
.pichi {
  position: relative;
  color: #fff;
  width: calc(100% - 90px);
  height: 200px;
  margin: 0 auto;
  background-image: url("~@/assets/prize-bg@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  &-figure {
    justify-content: center;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    margin-left: 60px;
    margin-right: 30px;
    background-color: #fff;
  }
  &-box {
    display: flex;
    align-items: center;
  }
  &-btn {
    position: absolute;
    bottom: 20px;
    right: 40px;
    a {
      display: inline-block;
      min-width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding: 0 15px;
      font-size: 24px;
      color: #04b6ff;
      border-radius: 20px;
      background-color: #fff;
    }
  }
}
</style>
