<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- dialog -->
      <van-dialog v-model="dialogVisible" title="行为说明" show-cancel-button @confirm="handleConfirm"></van-dialog>
      <div class="wrap">
        <div class="mod">
          <div class="guanaco">
            <h4>我的行为</h4>
            <a href="javascript:void(0);" @click="isShow = !isShow">{{ isShow ? '编辑':'完成' }}</a>
          </div>
          <div class="narwhal">
            <div
              class="monodon"
              v-for="(item, index) in myActions"
              :key="index"
              @click="handleEdit(item)"
            >
              <div class="monoceros">
                <span>{{ item.title }}</span>
                <!-- 系统默认行为不可删除 -->
                <van-icon
                  name="clear"
                  size="18px"
                  class="clear"
                  @click.stop="handleActionDelete(index, item)"
                  v-show="!isShow"
                ></van-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="mod">
          <div class="guanaco">
            <h4>推荐行为</h4>
          </div>
          <div class="narwhal">
            <div
              class="monodon"
              v-for="(item, index) in recommends"
              :key="index"
              @click="handleEdit(item)"
            >
              <div class="monoceros text-ellipsis">
                <span class="ml-10">{{ item.title }}</span>
              </div>
            </div>
            <!-- -->
            <router-link :to="{path: '/action/add'}" tag="div" class="monodon">
              <div class="monoceros">
                <span class="ml-10">自定义</span>
              </div>
            </router-link>
          </div>
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
      isShow: true,
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.openStudentId
      },
      myActions: [],
      recommends: []
    };
  },
  methods: {
    handleEdit(params = {}) {
      let { serial, title, textContent, ...args } = params;
      this.$router.push({
        path: "/action/edit",
        query: {
          ...args
        }
      });
    },
    handleActionDelete(index, params) {
      let obj = {
        openId: this.$store.state.user.info.openId,
        actionId: params.actionId,
        actionType: params.actionType
      };
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认要删除该行为吗?"
        })
        .then(async () => {
          let res = await service.actionDelete(obj);
          if (res.errorCode === 0) {
            this.queryMyAction(this.query);
          }
        });
    },
    handleConfirm() {},
    //按行为查询已选中的规则
    async actionQuery(params = {}) {
      let res = await service.actionQuery(params);
      if (res.errorCode === 0) {
      }
    },
    //行为标准关联
    async ruleConnect(params = {}) {
      let res = await service.ruleConnect(params);
      if (res.errorCode === 0) {
      }
    },
    //行为删除
    async actionDelete(params = {}) {
      let res = await service.actionDelete(params);
      if (res.errorCode === 0) {
      }
    },
    //行为编辑
    async actionUpdate(params = {}) {
      let res = await service.actionUpdate(params);
      if (res.errorCode === 0) {
      }
    },
    //行为列表查询
    async queryMyAction(params = {}) {
      let res = await service.queryMyAction(params);
      if (res.errorCode === 0) {
        this.myActions = res.data.myAction;
        this.recommends = res.data.noChoiceAction;
      }
    }
  },
  mounted() {
    this.queryMyAction(this.query);
  }
};
</script>
<style lang="less" scoped>
.mod {
  position: relative;
  background-color: #fff;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    z-index: 2;
  }
}
.guanaco {
  display: flex;
  justify-content: space-between;
  padding: 30px 30px 0 30px;
  a {
    color: #04b6ff;
  }
}
.narwhal {
  display: flex;
  flex-wrap: wrap;
  padding: 30px 20px;
}
.monodon {
  padding: 10px;
  width: 25%;
}
.monoceros {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  height: 80px;
  border-radius: 8px;
  position: relative;
  background-color: #f6f8f9;
  .clear {
    position: absolute;
    right: -6%;
    top: -12%;
    color: #d2dde0;
  }
}
</style>
