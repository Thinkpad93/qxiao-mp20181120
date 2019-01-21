<template>
  <div class="page">
    <template v-if="roleType === 1">
      <div class="page-hd">
        <div class="tab">
          <a href="javascript:;" @click="handleTabClick(0)" :class="[index === 0 ? 'curr': '']">通知消息</a>
          <a href="javascript:;" @click="handleTabClick(1)" :class="[index === 1 ? 'curr': '']">发送记录</a>
        </div>
      </div>
    </template>
    <div class="page-bd">
      <template v-if="roleType === 1">
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
import { mapGetters } from "vuex";
export default {
  name: "notice",
  data() {
    return {
      index: 0,
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        openId: this.$store.getters.openId,
        type: 0,
        page: 1,
        pageSize: 10
      },
      noticeData: []
    };
  },
  computed: {
    ...mapGetters(["roleType"])
  },
  watch: {
    $route(to, from) {}
  },
  methods: {
    handleTabClick(index) {
      this.index = index;
      this.query.type = index;
      this.noticeQuery(this.query);
    },
    //加载分页数据
    handleLoadingMore() {
      window.addEventListener("scroll", e => {
        let scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        let bottom =
          document.body.offsetHeight - scrollTop - window.innerHeight <= 200;
        if (bottom && this.isLoading === false) {
          //判断是否总页数
          if (this.query.page < this.totalPage) {
            this.isLoading = true;
            this.query.page += 1;
            this.noticeQuery(this.query);
          } else {
            console.log("已经不用加载了");
          }
        }
      });
    },
    //公告通知列表查询
    async noticeQuery() {
      let classId = null;
      if (this.roleType === 1) {
        classId = 0;
      } else {
        classId = this.$store.getters.classId;
      }
      let obj = Object.assign({}, this.query, { classId });
      let res = await service.noticeQuery(obj);
      if (res.errorCode === 0) {
        let list = res.data.data;
        if (list.length) {
          this.totalPage = res.data.totalPage;
          this.query.page = res.data.page;
          this.isLoading = false;
          list.forEach(element => {
            this.noticeData.push(element);
          });
        } else {
          this.noticeData = [];
        }
      }
    }
  },
  mounted() {
    this.handleLoadingMore();
  },
  activated() {
    this.noticeQuery();
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
  > a {
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
