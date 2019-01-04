<template>
  <div class="page">
    <div class="page-hd">
      <div class="tab">
        <a href="javascript:;" @click="handleTabClick(0)" :class="[index === 0 ? 'curr': '']">通知消息</a>
        <a href="javascript:;" @click="handleTabClick(1)" :class="[index === 1 ? 'curr': '']">发送记录</a>
      </div>
    </div>
    <div class="page-bd">
      <router-link to="/notice/add" class="release">
        <img src="@/assets/image/release-icon.png" alt="">
      </router-link>      
      <div class="cells" style="background-color:transparent;">
        <figure class="figure" v-for="(notice, index) in noticeData" :key="index">
          <h3 class="text-ellipsis">{{ notice.title }}</h3>
          <div style="color:#8d8d8d;">
            <time>{{ notice.postTime }}</time>
          </div>        
          <img src="http://iph.href.lu/690x298" alt="">
          <p class="line-clamp">{{ notice.textContent }}</p>
          <div class="metedata flex">
            <span size-14>{{ notice.name }}<template v-if="notice.personType === 1">园长</template><template v-else>老师</template></span>
            <span size-14>阅读人数: {{ notice.classReadCount }}</span>
          </div>
        </figure>
      </div>
    </div>  
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "notice",
  data() {
    return {
      index: 0,
      query: {
        openId: this.$store.getters.openId,
        type: 0,
        classId: 0
      },
      noticeData: []
    };
  },
  methods: {
    handleRouteGo() {
      //this.$router.push({ path: "/notice/show/1993" });
    },
    handleTabClick(index) {
      this.index = index;
      this.query.type = index;
      this.noticeQuery(this.query);
    },
    handleNoticeAdd() {
      this.$router.push({ path: "/notice/add" });
    },
    //公告通知列表查询
    async noticeQuery(params = {}) {
      let res = await service.noticeQuery(params);
      if (res.errorCode === 0) {
        this.noticeData = res.data;
      }
    }
  },
  activated() {
    this.noticeQuery(this.query);
  }
};
</script>
<style lang="less">
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
}
.tab {
  display: flex;
  font-size: 32px;
  a {
    color: #d7d7d7;
    height: 100px;
    flex: 1;
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
      width: 50%;
      height: 4px;
      background-color: #92cd36;
      transform: translateX(-50%);
    }
  }
}
.figure {
  padding: 0 30px;
  margin-bottom: 30px;
  background-color: #fff;
  &:active {
    background-color: #f2f2f2;
  }
  h3 {
    font-size: 36px;
    padding: 20px 0;
  }
  p {
    font-size: 28px;
  }
  img {
    width: 690px;
    height: 298px;
    margin: 20px 0;
  }
  .metedata {
    color: #8d8d8d;
    margin: 20px -30px 0 -30px;
    padding: 0 30px;
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f5f5f5;
  }
}
</style>
