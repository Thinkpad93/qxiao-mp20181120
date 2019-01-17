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
        </div>                    
      </article>
      <template v-if="roleType === 1 || roleType === 2">
        <div class="tab-warp">
          <div class="tab">
            <div class="tab-head">
              <a href="javascript:void(0);" :class="[ readFlag === 0 ? 'curr': '' ]" @click="handleTabClick(0)">已读({{ readCount }})</a>
              <a href="javascript:void(0);" :class="[ readFlag === 1 ? 'curr': '' ]" @click="handleTabClick(1)">未读({{ unreadCount }})</a>
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
        <div class="btn-area">
          <a :class="[ info.confirmFlag ? 'btn-default': 'btn-primary' ]" href="javascript:void(0);" 
          class="btn" @click="handleConfirmFlag">确认通知</a>
        </div>
      </template>
    </div>  
  </div>  
</template>
<script>
import service from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "homeWorkShow",
  data() {
    return {
      readFlag: 0, //0-已读 1-未读
      query: {
        openId: this.$store.getters.openId,
        homeId: parseInt(this.$route.query.homeId),
        classId: parseInt(this.$route.query.classId)
      },
      info: {},
      readList: [],
      unreadList: []
    };
  },
  computed: {
    ...mapGetters(["roleType"]),
    readCount() {
      return this.readList.length;
    },
    unreadCount() {
      return this.unreadList.length;
    }
  },
  methods: {
    handleTabClick(index) {
      //实时更新
      this.readFlag = index;
      this.homeworkReaders();
    },
    handleConfirmFlag() {
      if (!this.info.confirmFlag) {
        this.homeWorkConfirm(this.query);
      }
    },
    //作业阅读确认
    async homeWorkConfirm(params = {}) {
      if (this.roleType === 3) {
        let res = await service.homeWorkConfirm(params);
        if (res.errorCode === 0) {
          this.$weui.alert("作业确认成功", () => {}, { title: "提示" });
        }
      }
    },
    //作业详情查询
    async homeworkDetail(params = {}) {
      let res = await service.homeworkDetail(params);
      if (res.errorCode === 0) {
        this.info = res.data;
      }
    },
    //作业阅读人员查询
    async homeworkReaders() {
      if (this.roleType === 1 || this.roleType === 2) {
        let obj = Object.assign({}, this.query, { readFlag: this.readFlag });
        let res = await service.homeworkReaders(obj);
        if (res.errorCode === 0) {
          if (this.readFlag) {
            this.unreadList = res.data.readers || []; //后端有可能返回null
          } else {
            this.readList = res.data.readers || []; //后端有可能返回null
          }
        }
      }
    }
  },
  activated() {
    this.homeworkReaders();
    this.homeworkDetail(this.query);
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
</style>
