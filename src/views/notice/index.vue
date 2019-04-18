<template>
  <div class="page">
    <div class="page-hd">
      <template v-if="roleType == 1 || roleType == 4 || roleType == 2">
        <div class="button-sp-area flex" size-17>
          <a href="javascript:;" id="showDatePicker" @click="popupShow = true">
            <span>{{ className }}</span>
            <van-icon name="arrow-down" size="16px"></van-icon>
          </a>
        </div>
      </template>
      <template v-if="roleType == 1 || roleType == 4">
        <van-tabs v-model="index" :line-height="2" @click="handleTabClick">
          <van-tab title="通知消息"></van-tab>
          <van-tab title="发送记录"></van-tab>
        </van-tabs>
      </template>
    </div>
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <div class="popup-class">
          <div class="cells">
            <div class="cell popup-box" v-for="(p, index) in classList" :key="index">
              <div class="cell-hd">
                <img src="@/assets/image/kong.png" width="54" height="54">
              </div>
              <div class="cell-bd">
                <p>{{ p.className }}</p>
              </div>
              <div class="cell-ft">
                <van-radio-group v-model="classId">
                  <van-radio
                    :name="p.classId"
                    checked-color="#92cd36"
                    @click="handleClassConfirm(p)"
                  ></van-radio>
                </van-radio-group>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
      <template v-if="roleType == 1 || roleType == 4">
        <router-link to="/notice/add" class="release">
          <img src="@/assets/image/release-icon.png" alt>
        </router-link>
      </template>
      <figure
        class="figure figure-skin-one"
        v-for="(notice, index) in noticeData"
        :key="index"
        @touchstart="start(notice, index)"
        @touchmove="move"
        @touchend="end(notice)"
      >
        <div class="figure-bd">
          <div
            class="figure-thumb-small"
            v-if="notice.topImage"
            :style="{backgroundImage: `url(${notice.topImage})`}"
          ></div>
          <div class="figure-info">
            <figcaption class="text-ellipsis">
              <i v-if="!notice.status" style="width:6px;height:6px;"></i>
              <span size-18>{{ notice.title }}</span>
            </figcaption>
            <p size-15 class="text-ellipsis">{{ notice.textContent | brReplace }}</p>
            <div class="metedata flex">
              <span class="name">{{ notice.name }}</span>
              <time class="time">{{ notice.postTime }}</time>
            </div>
          </div>
        </div>
        <div class="figure-ft">
          <div class="figure-total">
            <span>已读{{ notice.classReadCount }}人</span>
            <span v-if="roleType == 1 || roleType == 4">共{{ notice.totalCount }}人</span>
          </div>
        </div>
      </figure>
      <div class="empty" v-if="!noticeData.length">
        <img src="@/assets/image/kong.png" alt>
        <p>暂无通知公告</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapState } from "vuex";
import { scrollMixins } from "@/mixins/scroll";
export default {
  name: "notice",
  mixins: [scrollMixins],
  data() {
    return {
      long: 0,
      time: 0,
      popupShow: false,
      className:
        this.$store.state.users.className || this.$route.query.className,
      classId: this.$store.state.users.classId,
      index: 0,
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        openId: this.$store.state.wx.openId || this.$route.query.openId,
        classId: this.$store.state.users.classId || this.$route.query.classId,
        studentId:
          this.$store.state.student.studentId || this.$route.query.studentId,
        type: 0,
        page: 1,
        pageSize: 10
      },
      roleType: this.$store.state.users.roleType || this.$route.query.roleType,
      noticeData: []
    };
  },
  computed: {
    ...mapState("queryClass", {
      classList: state => state.classList
    })
  },
  filters: {
    brReplace(value) {
      if (!value) return "";
      return value.replace(/<br\/>/g, "");
    }
  },
  methods: {
    start(notice, index) {
      this.long = 0;
      this.time = setTimeout(() => {
        this.long = 1;
        if (this.roleType == 1 || this.roleType == 4) {
          this.$dialog
            .confirm({
              title: "提示",
              message: "确定删除该条公告吗？"
            })
            .then(async () => {
              let obj = {
                openId: this.query.openId,
                noticeId: notice.noticeId,
                classId: notice.classId
              };
              //删除通知公告
              let res = await service.deleteNotice(obj);
              if (res.errorCode === 0) {
                this.noticeData.splice(index, 1);
              }
            })
            .catch(() => {});
        }
      }, 500);
    },
    move() {
      clearTimeout(this.time);
      this.time = 0;
    },
    end(notice) {
      clearTimeout(this.time);
      if (this.long == 0 && this.time != 0) {
        this.$router.push({
          path: "/notice/show",
          query: {
            noticeId: notice.noticeId,
            needConfirm: notice.needConfirm,
            classId: notice.classId,
            studentId: notice.studentId
          }
        });
      }
      return false;
    },
    handleTabClick(index, title) {
      this.index = index;
      this.query.page = 1; //切换时从第一页查起
      this.query.type = index;
      this.noticeQuery(this.query);
    },
    //选择班级
    handleClassConfirm(obj) {
      this.popupShow = false;
      this.className = obj.className;
      this.query.classId = obj.classId;
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
          let classId =
            this.roleType === 1 ? 0 : this.$store.state.users.classId;
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
    async noticeQuery(params = {}) {
      let res = await service.noticeQuery(params);
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.isLoading = false;
        this.noticeData = res.data.data || [];
      }
    }
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      this.wxSdk.wxShare(this.roleType);
      this.$store.dispatch("users/reloadUserInfo", this.$route.query);
    }
    this.noticeQuery(this.query);
  }
};
</script>
<style lang="less" scoped>
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
}
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
}
</style>
