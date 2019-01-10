<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>大班组KC3《跳房子》游戏活动</h1>
        <div class="article-head flex">
          <div class="article-cell">
            <span style="color:#8d8d8d;">广州市天河区黄村艺术幼儿园</span>
          </div>
          <div class="article-cell">
            <time style="color:#8d8d8d;">09-22 10:15</time>    
          </div>
        </div>
        <section size-16 class="article-content">
          <p>
            <img src="http://iph.href.lu/690x298" alt="">
          </p>
          <p>
            1.展幼儿投准，单脚跳跃动作，增强幼儿腿部力量，提高幼儿平衡能力。
          </p>
          <p>
            请各单位安排好放假期间的值班、安全保卫等工作，做好应对各类突发事件的预案。如遇有重大突发事件，要按规定及时报告并妥善处理。
          </p>
          <p>
            1969年，在周星驰7岁的时候，他的父母正式离异。于是，周星驰和姐姐周文姬、妹妹周星霞一起在母亲凌宝儿的抚养下成长 [22] 。
            周星驰在学校成绩并不好，偏科，除了语文，其它科目成绩都不怎样，老师称赞周星驰画画不错。 
            [21] 周星驰中学就读于香港圣玛利奥英文书院。在中学毕业以后，他做过两个月的办公室助理地上画好格子当作房子。
          </p>
        </section>
        <div class="class flex" style="color:#8d8d8d;">
          <span class="read">73人阅读</span>
          <span class="zan">73人点赞</span>
        </div>
      </article>
      <div class="comment">
        <div class="comment-hd flex">
          <span>留言(1)</span>
          <a href="javascript:;" style="color:#44649f;">写留言</a>
        </div>
        <div class="comment-bd">
          <div class="cells">
            <div class="cell">
              <div class="cell-hd">
                <img class="icon" src="@/assets/image/109951163721579973.jpg" alt="">
              </div>   
              <div class="cell-bd">
                <span style="color:#44649f;">刘家明(园长)</span>
                <p>
                  周星驰中学就读于香港圣玛利奥英文书院
                </p>
              </div>           
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "freshShow",
  data() {
    return {
      query: {
        openId: this.$store.getters.openId,
        freshId: this.$route.params.id,
        classId: 0
      },
      info: {}
    };
  },
  methods: {
    //速报详情
    async freshDetail(params = {}) {
      let res = await service.freshDetail(params);
      if (res.errorCode === 0) {
        this.ifno = res.data;
      }
    },
    //速报评论发表
    async freshCommentAdd(params = {}) {
      let res = await service.freshDetail(params);
      if (res.errorCode === 0) {
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
    margin-bottom: 20px;
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
  background-color: #fff;
  &-hd {
    padding: 0 30px;
    height: 80px;
    align-items: center;
    justify-content: space-between;
  }
  &-bd {
    .cell {
      padding-top: 20px;
      padding-bottom: 20px;
    }
    p {
      margin-top: 10px;
    }
    .icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
}
</style>
