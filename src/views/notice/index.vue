<template>
  <div class="page">
    <template v-if="roleType == 1">
      <div class="page-hd">
        <van-tabs v-model="index" color="#92cd36" :line-height="2" @click="handleTabClick">
          <van-tab title="通知消息"></van-tab>
          <van-tab title="发送记录"></van-tab>          
        </van-tabs>
      </div>
    </template>
    <div class="page-bd">
      <template v-if="roleType == 1">
        <router-link to="/notice/add" class="release">
          <img src="@/assets/image/release-icon.png" alt="">
        </router-link> 
      </template>     
      <div class="cells" style="background-color:transparent;">
        <figure class="figure" v-for="(notice, index) in noticeData" :key="index">
          <router-link  :to="{ path: '/notice/show', query: { noticeId: notice.noticeId } }">
            <h3 class="text-ellipsis">{{ notice.title }}</h3>
            <div class="nocice-time" style="color:#8d8d8d;">
              <time>{{ notice.postTime }}</time>
            </div>        
            <template v-if="notice.topImage">
              <div class="pic" :style="{backgroundImage: `url(${notice.topImage})`}"></div>
            </template>
            <p class="line-clamp">{{ notice.textContent }}</p>
            <div class="metedata flex">
              <div size-14>{{ notice.name }}<template v-if="notice.personType === 1">园长</template><template v-else>老师</template>
              </div>
              <div size-14 class="metedata-count">
                <template v-if="notice.classReadCount">
                  <span style="color:#ff87b7">{{ notice.classReadCount }}人阅读</span>
                </template>
                <template v-if="notice.classConfirmCount">
                  <span style="color:#92cd36">{{ notice.classConfirmCount }}人确定</span>
                </template>
                <template v-if="notice.classUnreadCount">
                  <span style="color:#8d8d8d">{{ notice.classUnreadCount }}人未读</span>
                </template>
              </div>
            </div>
          </router-link>
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
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        openId: this.$store.getters.openId || this.$route.query.openId,
        type: 0,
        page: 1,
        pageSize: 10
      },
      roleType: this.$store.getters.roleType || this.$route.query.roleType,
      noticeData: []
    };
  },
  watch: {
    $route(to, from) {
      //如果是发布过来的，则重新请求数据
      if (from.path === "/notice/add") {
      }
    }
  },
  methods: {
    handleTabClick(index, title) {
      this.index = index;
      this.query.page = 1; //切换时从第一页查起
      this.query.type = index;
      this.noticeQuery(this.query);
    },
    //加载分页数据
    handleLoadingMore(e) {
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      let bottom =
        document.body.offsetHeight - scrollTop - window.innerHeight <= 200;
      if (bottom && this.isLoading === false) {
        //判断总页数
        if (this.query.page < this.totalPage) {
          this.isLoading = true;
          this.query.page += 1;
          let classId = this.roleType === 1 ? 0 : this.$store.getters.classId;
          let obj = Object.assign({}, this.query, { classId });
          service.noticeQuery(obj).then(res => {
            if (res.errorCode === 0) {
              this.totalPage = res.data.totalPage;
              this.query.page = res.data.page;
              this.isLoading = false;
              let list = res.data.data;
              if (list.length) {
                list.forEach(element => {
                  this.noticeData.push(element);
                });
              }
            }
          });
        }
      }
    },
    //公告通知列表查询
    async noticeQuery() {
      let classId =
        this.roleType == 1
          ? 0
          : this.$store.getters.classId || this.$route.query.classId;
      let obj = Object.assign({}, this.query, { classId });
      let res = await service.noticeQuery(obj);
      if (res.errorCode === 0) {
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.isLoading = false;
        this.noticeData = res.data.data;
      }
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleLoadingMore, false);
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      this.$store.dispatch("user/reload", this.$route.query, { root: true });
    }
    this.noticeQuery();
    document.addEventListener("scroll", this.handleLoadingMore, false);
  }
};
</script>
<style lang="less">
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
}
.figure {
  margin-bottom: 30px;
  background-color: #fff;
  > a {
    position: relative;
    padding: 0 30px;
    display: block;
  }
  &:active {
    background-color: #f2f2f2;
  }
  h3 {
    position: relative;
    font-weight: bold;
    font-size: 36px;
    padding: 20px 0 10px 0;
  }
  p {
    font-size: 30px;
    margin: 10px 0 20px 0;
    line-height: 1.5;
  }
  .pic {
    width: 690px;
    height: 298px;
    margin: 20px 0;
    background-size: 100%;
    background-repeat: no-repeat;
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
  .metedata-count {
    font-size: 0;
    span {
      font-size: 28px;
      display: inline-block;
      margin-left: 10px;
    }
  }
  .nocice-time {
    font-size: 28px;
  }
}
</style>
