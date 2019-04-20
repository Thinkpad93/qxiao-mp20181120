<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- -->
      <van-dialog v-model="dialogVisible" title="评价标准" show-cancel-button @confirm="handleConfirm"></van-dialog>
      <van-collapse v-model="activeNames">
        <van-collapse-item :name="item.id" v-for="item in pageData" :key="item.id">
          <div slot="title">{{ item.day }} {{ item.starCount }}颗Q星</div>
          <div class="action-cells">
            <div class="action-cell" v-for="action in item.actions" :key="action.actionId">
              <div class="hd">
                <span>
                  {{ action.title }}
                  <van-icon name="question-o" size="16px"></van-icon>
                </span>
              </div>
              <div class="bd">
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
        studentId: this.$route.query.studentId,
        page: 1,
        pageSize: 20
      },
      activeNames: [0],
      pageData: []
    };
  },
  methods: {
    handleConfirm() {},
    //历史打星查询
    async historyStrikeQuery(params = {}) {
      let res = await service.historyStrikeQuery(params);
      if (res.errorCode === 0) {
        this.pageData = res.data.data || [];
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
  .hd {
    min-width: 200px;
  }
  .bd {
    flex: 1;
  }
}
.van-collapse-item {
  margin-bottom: 20px;
}
</style>
