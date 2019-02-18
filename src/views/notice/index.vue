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
          <img src="@/assets/image/release-icon.png" alt>
        </router-link>
      </template>
      <div class="cells" style="background-color:transparent;">
        <figure
          class="figure figure-skin-one"
          v-for="(notice, index) in noticeData"
          :key="index"
          @click="handleJump(notice)"
        >
          <div class="figure-bd">
            <div
              class="figure-thumb-small"
              v-if="notice.topImage"
              :style="{backgroundImage: `url(${notice.topImage})`}"
            ></div>
            <div class="figure-info">
              <figcaption size-18 class="text-ellipsis">
                <i v-if="!notice.status"></i>
                <span>{{ notice.title }}</span>
              </figcaption>
              <p size-15 class="text-ellipsis">{{ notice.textContent }}</p>
              <div class="metedata flex">
                <span class="name">{{ notice.name }}</span>
                <time class="time">{{ notice.postTime }}</time>
              </div>
            </div>
          </div>
          <div class="figure-ft">
            <div class="figure-total">
              <span>已读{{ notice.classReadCount }}人，共{{ notice.totalCount }}人</span>
            </div>
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
      throttleLoad: null,
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
    handleJump(notice) {
      this.$router.push({
        path: "/notice/show",
        query: { noticeId: notice.noticeId, needConfirm: notice.needConfirm }
      });
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
    //删除通知公告
    async deleteNotice(params = {}) {
      let res = await service.deleteNotice(params);
      if (res.errorCode === 0) {
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
  deactivated() {
    window.removeEventListener("scroll", this.handleLoadingMore);
  },
  activated() {
    window.addEventListener("scroll", this.handleLoadingMore);
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      this.$store.dispatch("user/reload", this.$route.query, { root: true });
    }
    this.noticeQuery();
  }
};
</script>
<style lang="less">
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
}
</style>
