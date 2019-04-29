<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- -->
      <van-collapse v-model="activeNames">
        <van-collapse-item :name="item.id" v-for="(item,indexs) in list" :key="indexs">
          <div slot="title">
            {{ item.day }}
            <strong style="color:#ff4d67;">{{ item.starCount }}</strong>颗Q星
          </div>
          <div class="action-cells">
            <div
              class="action-cell flex a-i-c j-c-s-b"
              v-for="(action, index) in item.actions"
              :key="index"
            >
              <div class="action-cell-bd flex a-i-c j-c-s-b">
                <div class="mr-40">
                  <span>{{ action.title }}</span>
                </div>
                <van-rate
                  v-model="action.starCount"
                  :count="5"
                  :size="22"
                  color="#09e2bb"
                  void-color="#e5eee0"
                  :readonly="item.starCount !== 0"
                  @change="handleChangeRate(indexs)"
                ></van-rate>
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "actionHistory",
  data() {
    return {
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.openStudentId,
        page: 1,
        pageSize: 20
      },
      activeNames: [],
      list: []
    };
  },
  methods: {
    //rate事件
    handleChangeRate(indexs) {
      let flag = false;

      let actions = this.list[indexs].actions;
      let len = actions.length;
      actions.forEach(element => {
        let { starCount, ...args } = element;
        //说明该行为已经打了
        if (starCount != 0) {
          flag = true;
          len -= 1;
        }
      });
      if (flag && len === 0) {
        let actionArray = [];
        let day = this.list[indexs].day;
        let { openId, studentId } = this.query;
        actions.forEach(element => {
          let { title, ...args } = element;
          actionArray.push(args);
        });
        if (actionArray.length) {
          this.$dialog
            .confirm({
              title: "提示",
              message: "确定完成评价？确定后无法更改"
            })
            .then(() => {
              let obj = Object.assign(
                {},
                { actionArray, day, openId, studentId }
              );
              this.actionStrike(obj);
            })
            .catch(() => {});
        }
      }
    },
    //历史打星查询
    async historyStrikeQuery(params = {}) {
      let res = await service.historyStrikeQuery(params);
      if (res.errorCode === 0) {
        this.list = res.data.data || [];
      }
    },
    //行为打星
    async actionStrike(params = {}) {
      let res = await service.actionStrike(params);
      if (res.errorCode === 0) {
        this.historyStrikeQuery(this.query);
      }
    }
  },
  mounted() {
    this.historyStrikeQuery(this.query);
  }
};
</script>
<style lang="less" scoped>
.action-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 20px 0;
  i {
    vertical-align: top;
  }
  &-bd {
    flex: 1;
  }
}
.van-collapse-item {
  margin-bottom: 10px;
}
</style>
