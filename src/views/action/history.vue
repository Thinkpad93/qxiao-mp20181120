<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- -->
      <van-dialog v-model="dialogVisible" title="评价标准" show-cancel-button @confirm="handleConfirm"></van-dialog>
      <van-collapse v-model="activeNames">
        <van-collapse-item :name="item.id" v-for="item in list" :key="item.day">
          <div slot="title">{{ item.day }} {{ item.starCount }}颗Q星</div>
          <div class="action-cells">
            <div
              class="action-cell flex a-i-c j-c-s-b"
              v-for="(action, index) in item.actions"
              :key="index"
            >
              <div class="action-cell-bd flex a-i-c j-c-s-b">
                <div class="mr-40">
                  <span>{{ action.title }}</span>
                  <van-icon name="question-o" size="16px"></van-icon>
                </div>
                <van-rate
                  v-model="action.starCount"
                  :count="5"
                  :size="22"
                  color="#09e2bb"
                  void-color="#e5eee0"
                  :readonly="action.starCount !== 0"
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
import pageMixin from "@/mixins/page";
export default {
  name: "actionHistory",
  mixins: [pageMixin],
  data() {
    return {
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.openStudentId,
        page: 1,
        pageSize: 20
      },
      activeNames: [0],
      list: []
    };
  },
  methods: {
    handleConfirm() {},
    //历史打星查询
    async historyStrikeQuery(params = {}) {
      let res = await service.historyStrikeQuery(params);
      if (res.errorCode === 0) {
        this.list = res.data.data || [];
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
  margin-bottom: 20px;
}
</style>
