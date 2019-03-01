<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>{{ info.title }}</h1>
        <div class="article-hd">
          <div class="article-cell">
            <span>{{ info.schoolName }}</span>
          </div>
          <div class="article-cell">
            <time>{{ info.postTime }}</time>
          </div>
          <div class="article-cell">
            <i class="iconfont icon-chakan"></i>
            <b>{{ info.classReadCount }}</b>
          </div>
        </div>
        <section size-16 class="article-content">
          <p>{{ info.textContent }}</p>
          <template v-if="info.images">
            <p v-for="(img, index) in info.images" :key="index">
              <img :src="img.imageUrl">
            </p>
          </template>
        </section>
      </article>
      <div class="comment">
        <div class="comment-hd flex">
          <span>留言({{ commentLen }})</span>
          <!-- 只有家长能够评论 -->
          <template>
            <a href="javascript:void(0);" @click="dialogVisible = true">写留言</a>
          </template>
        </div>
        <div class="comment-bd">
          <div class="cells">
            <div class="cell" v-for="(comment, index) in info.commentList" :key="index">
              <div class="cell-hd">
                <img class="icon" :src="comment.photo" alt>
              </div>
              <div class="cell-bd">
                <span>{{ comment.name }}</span>
                <p>{{ comment.textContent }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <van-dialog
        title="评论"
        v-model="dialogVisible"
        show-cancel-button
        @cancel="dialogVisible = false"
        :before-close="handleSubmit"
      >
        <div class="comment-form">
          <form ref="form" action method="post">
            <div class="cells" style="padding:15px 0 15px 0;">
              <div class="cell">
                <div class="cell-bd" style="padding-left:0">
                  <textarea
                    class="textarea"
                    placeholder="请输入留言内容..."
                    rows="6"
                    v-model="form.textContent"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </van-dialog>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "freshShow",
  data() {
    return {
      dialogVisible: false,
      query: {
        openId: this.$store.getters.openId || this.$route.query.openId,
        freshId: this.$route.query.freshId || this.$route.query.freshId,
        classId: this.$route.query.classId
      },
      roleType: this.$store.getters.roleType || this.$route.query.roleType,
      form: {
        openId: this.$store.getters.openId || this.$route.query.openId,
        freshId: this.$route.query.freshId || this.$route.query.freshId,
        textContent: "",
        studentId: this.$store.getters.id || this.$route.query.studentId
      },
      commentLen: 0,
      info: {} //速报详情
    };
  },
  methods: {
    handleSubmit(action, done) {
      if (action === "confirm") {
        if (this.form.textContent == "") {
          this.$toast("请输入评论内容");
          done(false);
        } else {
          this.freshCommentAdd(this.form);
          done();
        }
      } else {
        done();
      }
    },
    //速报详情
    async freshDetail(params = {}) {
      let res = await service.freshDetail(params);
      if (res.errorCode === 0) {
        this.info = res.data;
        this.commentLen = res.data.commentList.length;
      }
    },
    //速报评论发表
    async freshCommentAdd(params = {}) {
      let res = await service.freshCommentAdd(params);
      if (res.errorCode === 0) {
        this.dialogVisible = false;
        this.form.textContent = "";
        //重新加载速报详情
        this.freshDetail(this.query);
      } else if (res.errorCode === -1) {
        this.$toast(`${res.errorMsg}`);
      }
    }
  },
  activated() {
    this.freshDetail(this.query);
  }
};
</script>
<style lang="less">
.comment {
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  &-hd {
    padding: 0 30px;
    height: 80px;
    align-items: center;
    justify-content: space-between;
    a {
      color: #fff;
      border-radius: 30px;
      display: inline-block;
      padding: 14px;
      box-shadow: 0 2px 20px 0 rgba(128, 199, 17, 0.3);
      background-image: linear-gradient(
        135deg,
        rgb(170, 221, 90) 10%,
        rgb(146, 205, 54) 100%
      );
    }
  }
  &-bd {
    .cell {
      padding-top: 20px;
      padding-bottom: 20px;
      align-items: flex-start;
    }
    span {
      color: #44649f;
      font-weight: bold;
    }
    p {
      margin-top: 20px;
      text-align: justify;
    }
    .icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
}
</style>
