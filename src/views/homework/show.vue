<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>{{ info.title }}</h1>
        <div class="article-hd">
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
        <div class="article-ft">
          <div class="article-icon">
            <i class="iconfont icon-chakan"></i>
            <b>{{ info.classReadCount }}</b>
          </div>
        </div>
      </article>
      <template v-if="roleType == 1 || roleType == 2">
        <div class="tab-warp">
          <div class="tab">
            <div class="tab-head">
              <a
                href="javascript:void(0);"
                :class="[ readFlag === 0 ? 'curr': '' ]"
                @click="handleTabClick(0)"
              >已读({{ readCount }})</a>
              <a
                href="javascript:void(0);"
                :class="[ readFlag === 1 ? 'curr': '' ]"
                @click="handleTabClick(1)"
              >未读({{ unReadCount }})</a>
            </div>
            <div class="tab-content">
              <div class="item" :class="[ readFlag === 0 ? 'currs': '' ]">
                <div class="cell" v-for="(read, index) in readList" :key="index">
                  <div class="cell-hd">
                    <img :src="read.photo" :alt="read.studentName">
                  </div>
                  <div class="cell-bd">
                    <p class>{{ read.studentName }}</p>
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
                    <p class>{{ unread.studentName }}</p>
                  </div>
                  <div class="cell-ft">
                    <span v-if="unread.confirmFlag === 0" style="color:#ff87b7">未确认通知</span>
                    <span v-else style="color:#92cd36">已确认通知</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- 确认标志 0-无需确认 1-需要确认 -->
        <template v-if="needConfirm">
          <p class="_plac"></p>
          <section class="_confirm">
            <a
              :class="[ info.confirmFlag ? 'btn-default': 'btn-primary' ]"
              href="javascript:void(0);"
              class="btn"
              @click="handleConfirmFlag"
            >{{ info.confirmFlag ? '已确定':'确定' }}</a>
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
        openId: this.$store.getters.openId || this.$route.query.openId,
        homeId: this.$route.query.homeId || this.$route.query.homeId,
        classId: this.$route.query.classId
      },
      roleType: this.$store.getters.roleType || this.$route.query.roleType,
      needConfirm: this.$route.query.needConfirm,
      info: {},
      readList: [],
      unreadList: [],
      readCount: null,
      unReadCount: null
    };
  },
  methods: {
    handleTabClick(index) {
      //实时更新
      this.readFlag = index;
      this.homeworkReaders();
    },
    handleConfirmFlag() {
      //判断是否已经确定过了
      if (!this.info.confirmFlag) {
        this.homeWorkConfirm(this.query);
      }
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
        this.info = res.data;
      }
    },
    //作业阅读人员查询
    async homeworkReaders() {
      if (this.roleType == 1 || this.roleType == 2) {
        let obj = Object.assign({}, this.query, { readFlag: this.readFlag });
        let res = await service.homeworkReaders(obj);
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
    }
  },
  activated() {
    this.homeworkReaders();
    this.homeworkDetail(this.query);
  }
};
</script>
<style lang="less">
// .article {
//   padding: 30px;
//   word-wrap: break-word;
//   background-color: #fff;
//   h1 {
//     font-weight: bold;
//     margin-bottom: 10px;
//   }
// }
// .article-content {
//   text-align: justify;
//   p {
//     margin: 20px 0;
//     line-height: 1.4;
//   }
//   img {
//     max-width: 100%;
//   }
// }
// .article-ft {
//   .article-icon {
//     display: flex;
//     align-items: center;
//     color: #8d8d8d;
//     b {
//       font-size: 28px;
//       margin-left: 8px;
//     }

//     i {
//       font-size: 34px;
//     }
//   }
// }
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
        width: 100px;
        height: 100px;
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
