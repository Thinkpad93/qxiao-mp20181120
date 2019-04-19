<template>
  <div class="flex-page">
    <div class="flex-bd">
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
        <section size-16 class="article-content">
          <p v-html="info.textContent"></p>
          <template v-if="info.images">
            <p v-for="(img, index) in info.images" :key="index">
              <img :src="img.imageUrl">
            </p>
          </template>
        </section>
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
        <!-- 确认标志 0-无需确认 1-需要确认 -->
        <template v-if="needConfirm">
          <section class="mamba">
            <a
              :class="[ info.confirmFlag ? 'btn-default': 'btn-primary' ]"
              href="javascript:void(0);"
              class="btn"
              @click="handleConfirmFlag"
            >{{ info.confirmFlag ? '已确认':'确认' }}</a>
          </section>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "homeWorkShow",
  data() {
    return {
      readFlag: 0, //0-已读 1-未读
      query: {
        openId: this.$route.query.openId,
        homeId: this.$route.query.homeId,
        classId: this.$route.query.classId,
        studentId: this.$route.query.studentId
      },
      roleType: this.$route.query.roleType,
      needConfirm: parseInt(this.$route.query.needConfirm), //0 不用确认
      info: {}
    };
  },
  methods: {
    handleConfirmFlag() {
      //判断是否已经确定过了
      if (!this.info.confirmFlag) {
        this.homeWorkConfirm(this.query);
      }
    },
    handleReaders(params) {
      let obj = {
        homeId: params.homeId,
        classId: this.$route.query.classId,
        needConfirm: this.$route.query.needConfirm,
        openId: this.$route.query.openId
      };
      this.$router.push({
        path: "/homework/read",
        query: obj
      });
    },
    //作业阅读确认
    async homeWorkConfirm(params = {}) {
      if (this.roleType == 3) {
        let res = await service.homeWorkConfirm(params);
        if (res.errorCode === 0) {
          //确认成功后设置为1
          this.info.confirmFlag = 1;
          this.$toast("作业确认成功");
        }
      }
    },
    //作业详情查询
    async homeworkDetail(params = {}) {
      let res = await service.homeworkDetail(params);
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
    }
  },
  activated() {
    this.homeworkDetail(this.query);
  }
};
</script>
<style lang="less" scoped>
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
