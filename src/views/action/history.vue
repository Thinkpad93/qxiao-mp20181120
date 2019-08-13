<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells mb-20">
        <div class="cell min-h120">
          <div class="cell-bd">
            <p>
              {{ name }}已经坚持习惯培养
              <time style="color:#f44;">{{ days }}</time>天
            </p>
          </div>
        </div>
      </div>
      <!-- -->
      <van-collapse v-model="activeNames">
        <van-collapse-item :name="item.id" v-for="(item,indexs) in list" :key="indexs">
          <div class="flex" size-16 slot="title">
            <time>{{ item.day }}</time>
            <div class="ml-20 mr-20 flex">
              <span>获得</span>
              <span style="color:#f44;">{{ item.starCount }}</span>颗Q星
            </div>
            <span v-show="item.comment === 0" style="color:#f44">补评价</span>
          </div>
          <div class="action-cells">
            <div
              class="action-cell flex a-i-c j-c-s-b"
              v-for="(action, index) in item.actions"
              :key="index"
            >
              <div class="action-cell-bd flex a-i-c j-c-s-b">
                <div class="action-cell-label text-ellipsis">
                  <span>{{ action.title }}</span>
                </div>
                <div class="action-cell-rate">
                  <van-rate
                    v-model="action.starCount"
                    :count="5"
                    :size="22"
                    color="#febf56"
                    void-color="#e5eee0"
                    disabled-color="#febf56"
                    :readonly="rateReadonly"
                    :disabled="action.comment === 1"
                    @change="handleChangeRate(action)"
                  ></van-rate>
                </div>
                <div class="action-cell-edit" @click="handleNote(action)">
                  <van-icon name="eye-o" size="18px"></van-icon>
                </div>
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { mapState } from "vuex";
export default {
  name: "actionHistory",
  data() {
    return {
      dialogNote: false,
      rateReadonly: false,
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.studentId,
        page: 1,
        pageSize: 20
      },
      activeNames: [],
      list: []
    };
  },
  computed: {
    ...mapState("user", {
      name: state => state.info.name
    }),
    days() {
      if (this.list.length) {
        return this.list[0].days;
      }
    }
  },
  methods: {
    //备注打星
    handleNote(params) {
      let { remarks } = params;
      if (remarks != null) {
        this.$dialog
          .alert({
            title: "查看备注",
            message: remarks
          })
          .then(() => {});
      } else {
        this.$toast(`暂无备注信息`);
      }
    },
    //rate事件
    handleChangeRate(params = {}) {
      if (params) {
        let { comment, title, remarks, ...args } = params;
        let obj = Object.assign({}, args, {
          openId: this.query.openId
        });
        this.actionStrike(obj);
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
      this.rateReadonly = true;
      let res = await service.actionStrike(params);
      if (res.errorCode === 0) {
        this.rateReadonly = false;
        let { totalStarCount } = res.data;
        this.historyStrikeQuery(this.query);
        //更新星星数量
        let _cookie = Cookies.getJSON("info");
        let obj = Object.assign({}, _cookie, { totalStarCount });
        this.$store.dispatch("user/setInfo", obj).then(data => {
          if (data.success === "ok") {
          }
        });
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
  &-rate {
    flex: 1;
  }
  &-label {
    width: 280px;
    overflow: hidden;
  }
  &-edit {
    color: #999;
  }
}

.van-collapse-item {
  margin-bottom: 10px;
}
</style>
