<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>{{ info.title }}</h1>
        <div class="article-head flex">
          <div class="article-cell">
            <!-- <img src="@/assets/image/109951163721579973.jpg" alt=""> -->
          </div>
          <div class="article-cell">
            <p>刘家明(园长)</p>
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
        </div>
      </article>
      <template v-if="roleType === 1 || roleType === 2">
        <div class="cells-title">班级阅读情况</div>
        <div class="tab-warp">
          <div class="tab">
            <div class="tab-head">
              <a href="javascript:void(0);" :class="[ readFlag === 0 ? 'curr': '' ]" @click="handleTabClick(0)">已读({{ readCount }})</a>
              <a href="javascript:void(0);" :class="[ readFlag === 1 ? 'curr': '' ]" @click="handleTabClick(1)">未读({{ unReadCount }})</a>
            </div>
            <div class="tab-content">
              <div class="item" :class="[ readFlag === 0 ? 'currs': '' ]">
                <div class="cell" v-for="(read, index) in readList" :key="index">
                  <div class="cell-hd">
                    <img :src="read.photo" :alt="read.studentName">
                  </div>
                  <div class="cell-bd">
                    <p class="">
                      {{ read.studentName }}
                      <template v-if="read.relation === 1">(妈妈)</template>
                      <template v-else-if="read.relation === 2">(爸爸)</template>
                      <template v-else-if="read.relation === 3">(爷爷)</template>
                      <template v-else-if="read.relation === 4">(奶奶)</template>
                      <template v-else-if="read.relation === 5">(外公)</template>
                      <template v-else>(外婆)</template>
                    </p>                    
                  </div>
                  <div class="cell-ft">
                    <span v-if="read.confirmFlag === 0" style="color:#ff87b7">未确认通知</span>
                    <span v-else style="color:#92cd36">已确认通知</span>                    
                  </div>
                </div>
              </div>
              <div class="item" :class="[ readFlag === 1 ? 'currs': '' ]">
                <div class="cell" v-for="(unread, index) in unreadList" :key="index">
                  <div class="cell-hd">
                    <img :src="unread.photo" :alt="unread.studentName">
                  </div>                  
                  <div class="cell-bd">
                    <p class="">
                      {{ unread.studentName }}
                      <template v-if="unread.relation === 1">(妈妈)</template>
                      <template v-else-if="unread.relation === 2">(爸爸)</template>
                      <template v-else-if="unread.relation === 3">(爷爷)</template>
                      <template v-else-if="unread.relation === 4">(奶奶)</template>
                      <template v-else-if="unread.relation === 5">(外公)</template>
                      <template v-else>(外婆)</template>
                    </p>
                  </div>
                  <div class="cell-ft">
                    <span v-if="unread.confirmFlag === 0" style="color:#92cd36">未确认通知</span>
                    <span v-else style="color:#ff87b7">已确认通知</span>
                  </div>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="_plac"></p>
        <section class="_confirm">
          <a 
            :class="[ info.confirmFlag ? 'btn-default': 'btn-primary' ]" 
            href="javascript:void(0);" class="btn" 
            @click="handleConfirmFlag">
            {{ info.confirmFlag ? '已确认':'确认通知' }}
          </a>
        </section>
      </template>
    </div>  
  </div>  
</template>
<script>
import service from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "noticeShow",
  data() {
    return {
      readFlag: 0, //0-已读 1-未读
      query: {
        openId: this.$store.getters.openId, //用户openid
        noticeId: this.$route.query.noticeId,
        classId: this.$store.getters.classId
      },
      info: {},
      readList: [],
      unreadList: [],
      readCount: null,
      unReadCount: null
    };
  },
  computed: {
    ...mapGetters(["roleType"])
  },
  methods: {
    handleTabClick(index) {
      this.readFlag = index;
      this.noticeReaders();
    },
    handleConfirmFlag() {
      //0-无需确认 1-需要确认
      if (!this.info.confirmFlag) {
        let { openId, noticeId } = this.query;
        this.noticeConfirm({ openId, noticeId });
      }
    },
    //公告通知详情
    async noticeDetail(params = {}) {
      let loading = this.$weui.loading("加载中");
      let res = await service.noticeDetail(params);
      if (res.errorCode === 0) {
        loading.hide();
        this.info = res.data;
      }
    },
    //公告阅读人员查询
    async noticeReaders() {
      if (this.roleType === 1 || this.roleType === 2) {
        //如果是园长则为0
        if (this.roleType === 1) {
          this.query.classId = 0;
        }
        let obj = Object.assign({}, this.query, { readFlag: this.readFlag });
        let res = await service.noticeReaders(obj);
        if (res.errorCode === 0) {
          if (this.readFlag) {
            this.unreadList = res.data.readers || []; //后端有可能返回null
            this.readCount = res.data.readCount;
            this.unReadCount = res.data.unReadCount;
          } else {
            this.readList = res.data.readers || []; //后端有可能返回null
            this.readCount = res.data.readCount;
            this.unReadCount = res.data.unReadCount;
          }
        }
      }
    },
    //公告确认
    async noticeConfirm(params = {}) {
      if (this.roleType === 3) {
        let res = await service.noticeConfirm(params);
        if (res.errorCode === 0) {
          this.info.confirmFlag = 1;
          this.$weui.alert("通知确认成功", () => {}, { title: "提示" });
        }
      }
    }
  },
  activated() {
    this.noticeReaders();
    this.noticeDetail(this.query);
  }
};
</script>
<style lang="less">
.article {
  padding: 20px;
  word-wrap: break-word;
  background-color: #fff;
  h1 {
    margin-bottom: 20px;
  }
}
.article-head {
  align-items: center;
  .article-cell {
    margin-right: 20px;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
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
.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.tab-warp {
  margin-top: 20px;
  margin-bottom: 30px;
  .tab-head {
    display: flex;
  }
  .tab-content {
    .item {
      position: relative;
      display: none;
    }
    .currs {
      display: block;
    }
    .cell {
      color: #252525;
      padding-top: 20px;
      padding-bottom: 20px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
  }
  .tab {
    display: block;
    font-size: 30px;
    background-color: #fff;
    a {
      width: 200px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .curr {
      color: #92cd36;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        display: block;
        width: 70%;
        height: 4px;
        background-color: #92cd36;
        transform: translateX(-50%);
      }
    }
  }
}
._plac {
  height: 130px;
}
._confirm {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 11;
  padding: 20px 0;
  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  > a {
    width: 200px;
  }
}
</style>
