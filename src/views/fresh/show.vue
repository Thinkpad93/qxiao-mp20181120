<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>{{ info.title }}</h1>
        <div class="article-head flex">
          <div class="article-cell">
            <span style="color:#8d8d8d;">{{ info.schoolName }}</span>
          </div>
          <div class="article-cell">
            <time style="color:#8d8d8d;">{{ info.postTime }}</time>    
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
        <div class="class flex" style="color:#8d8d8d;">
          <span class="read">{{ info.classReadCount }}人阅读</span>
          <span class="zan">{{ info.classCommentCount }}人评论</span>
        </div>
      </article>
      <div class="comment">
        <div class="comment-hd flex">
          <span>留言({{ commentLen }})</span>
          <!-- 只有家长能够评论 -->
          <template v-if="roleType === 3">
            <a href="javascript:void(0);" @click="dialogVisible = true">写留言</a>
          </template>
        </div>
        <div class="comment-bd">
          <div class="cells">
            <div class="cell" 
              v-for="(comment, index) in info.commentList" :key="index">
              <div class="cell-hd">
                <img class="icon" :src="comment.photo" alt="">
              </div>   
              <div class="cell-bd">
                <span style="color:#44649f;">{{ comment.name }}</span>
                <p>{{ comment.textContent }}</p>
              </div>           
            </div>
          </div>
        </div>
      </div>
      <div class="weui-mask" v-show="dialogVisible"></div>
      <!-- 评论 -->
      <QXDialog title="速报留言" :visible.sync="dialogVisible">
        <div class="comment-form">
          <form action="" method="post">
            <div class="cells">
              <div class="cell">
                <div class="cell-bd" style="padding-left:0">
                  <textarea class="textarea" placeholder="请输入留言内容..." rows="6" v-model="form.textContent"></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div slot="footer" class="dialog-ft">
          <a href="javascript:void(0);" class="dialog-btn-default" @click="dialogVisible = false">取消</a>
          <a href="javascript:void(0);" class="dialog-btn-primary" @click="handleSubmit">提交</a>
        </div>
      </QXDialog>
    </div>
  </div>  
</template>
<script>
import service from "@/api";
import { mapGetters } from "vuex";
import QXDialog from "@/components/dialog";
export default {
  name: "freshShow",
  components: {
    QXDialog
  },
  data() {
    return {
      dialogVisible: false,
      query: {
        openId: this.$store.getters.openId,
        freshId: parseInt(this.$route.query.freshId),
        classId: parseInt(this.$route.query.classId)
      },
      form: {
        openId: this.$store.getters.openId,
        freshId: parseInt(this.$route.query.freshId),
        textContent: "",
        studentId: this.$store.getters.id
      },
      commentLen: 0,
      info: {} //速报详情
    };
  },
  computed: {
    ...mapGetters(["roleType"])
  },
  methods: {
    handleSubmit() {
      if (this.form.textContent) {
        this.freshCommentAdd(this.form);
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
      }
    }
  },
  activated() {
    this.freshDetail(this.query);
  }
};
</script>
<style lang="less">
.article {
  padding: 30px;
  word-wrap: break-word;
  background-color: #fff;
  h1 {
    margin-bottom: 15px;
  }
}
.article-content {
  text-align: justify;
  p {
    margin: 20px 0;
    line-height: 1.4;
  }
  img {
    max-width: 100%;
  }
}
.class {
  justify-content: space-between;
}
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
    p {
      margin-top: 10px;
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
