<template>
  <div class="flex-page">
    <div class="flex-bd" v-show="!parseInt(info.isDel)">
      <article class="article">
        <h1 size-24>{{ info.title }}</h1>
        <div class="article-hd">
          <div class="article-cell">
            <time>{{ info.postTime }}</time>
          </div>
          <div class="article-cell">
            <van-icon name="eye-o" size="16px"></van-icon>
            <b>{{ info.classReadCount }}</b>
          </div>
        </div>
        <div size-16 class="article-content">
          <p v-html="info.textContent"></p>
          <template v-if="info.images">
            <p v-for="(img, index) in info.images" :key="index">
              <img :src="img.imageUrl">
            </p>
          </template>
        </div>
      </article>
    </div>
    <div class="flex-ft">
      <template v-if="roleType == 1 || roleType == 2 || roleType == 4">
        <section class="mamba">
          <p
            style="color:#92cd36;margin: 4px 0"
            size-16
            @click="handleReaders(info)"
          >班级已读{{ info.classReadCount }}人，共{{ info.totalCount }}人，查看详情</p>
        </section>
      </template>
      <template v-if="roleType == 3">
        <template v-if="needConfirm">
          <section class="mamba">
            <a
              :class="[ info.confirmFlag ? 'btn-default': 'btn-primary' ]"
              href="javascript:void(0);"
              class="btn btn-large"
              @click="handleConfirmFlag"
            >{{ info.confirmFlag ? '已确认':'确认阅读' }}</a>
          </section>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "noticeShow",
  data() {
    return {
      query: {
        openId: this.$store.state.user.info.openId || this.$route.query.openId, //用户openid
        noticeId: this.$route.query.noticeId,
        classId: this.$route.query.classId,
        studentId: this.$route.query.studentId
      },
      roleType:
        this.$store.state.user.info.roleType || this.$route.query.roleType,
      needConfirm: parseInt(this.$route.query.needConfirm), //0 不用确认
      info: {}
    };
  },
  methods: {
    handleConfirmFlag() {
      //0-无需确认 1-需要确认
      if (!this.info.confirmFlag) {
        let { openId, noticeId, studentId } = this.query;
        this.noticeConfirm({ openId, noticeId, studentId });
      }
    },
    handleReaders(params) {
      let obj = {
        noticeId: params.noticeId,
        openId: this.query.openId,
        classId: this.$route.query.classId,
        needConfirm: this.$route.query.needConfirm
      };
      this.$router.push({
        path: "/notice/read",
        query: obj
      });
    },
    //公告通知详情
    async noticeDetail(params = {}) {
      let res = await service.noticeDetail(params);
      if (res.errorCode === 0) {
        let { isDel } = res.data;
        if (isDel) {
          this.$dialog.alert({
            showConfirmButton: false,
            message: "内容已被删除"
          });
        } else {
          this.info = res.data;
        }
      }
    },
    //公告确认
    async noticeConfirm(params = {}) {
      if (this.roleType == 3) {
        let res = await service.noticeConfirm(params);
        if (res.errorCode === 0) {
          this.info.confirmFlag = 1;
          this.$toast("通知确认成功");
        }
      }
    }
  },
  activated() {
    this.noticeDetail(this.query);
  }
};
</script>
<style lang="less" scoped>
.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.mamba {
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 0 15px 2px rgba(88, 88, 88, 0.1);
  background-color: #fff;
  > a {
    width: 500px;
  }
}
</style>
