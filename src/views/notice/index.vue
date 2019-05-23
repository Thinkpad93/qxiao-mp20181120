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
              <div class="cell-bd pl-20">
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
        <qxRelease url="/notice/add"/>
      </template>
      <van-swipe-cell
        ref="swipeCell"
        :right-width="60"
        v-for="(notice, index) in list"
        :key="index"
        :disabled="roleType == 3 || roleType == 2"
        :on-close="onClose(notice, index)"
      >
        <van-cell-group>
          <figure class="figure figure-skin-one" @click="go(notice)">
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
        </van-cell-group>
        <span slot="right" style="line-height: 80px;">删除</span>
      </van-swipe-cell>
      <div class="empty" v-if="!list.length">
        <img src="@/assets/image/kong.png" alt>
        <p>暂无通知公告</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import qxRelease from "@/components/Release";
import { scrollMixins } from "@/mixins/scroll";
import classList from "@/mixins/classList";
import { mapState } from "vuex";
export default {
  name: "notice",
  mixins: [scrollMixins, classList],
  components: {
    qxRelease
  },
  data() {
    return {
      popupShow: false,
      classId: parseInt(this.$store.state.user.info.classId),
      index: 0,
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        openId: this.$store.state.user.info.openId,
        classId: this.$store.state.user.info.classId,
        studentId: this.$store.state.user.info.studentId,
        type: 0,
        page: 1,
        pageSize: 10
      },
      roleType: this.$store.state.user.info.roleType,
      list: []
    };
  },
  computed: {
    className: {
      get() {
        return this.$store.state.user.info.className;
      },
      set(newValue) {
        return (this.$store.state.user.info.className = newValue);
      }
    }
  },
  filters: {
    brReplace(value) {
      if (!value) return "";
      return value.replace(/<br\/>/g, "");
    }
  },
  methods: {
    onClose(notice, index) {
      return (clickPosition, instance) => {
        switch (clickPosition) {
          case "right":
            this.$dialog
              .confirm({
                title: "提示",
                message: "确认要删除该条公告吗?"
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
                  instance.close();
                  this.list.splice(index, 1);
                }
              })
              .catch(() => {
                instance.close();
              });
            break;
        }
      };
    },
    go(notice) {
      let { noticeId, needConfirm, classId, studentId } = notice;
      let openId = this.query.openId;
      let roleType = this.roleType;
      this.$router.push({
        path: "/notice/show",
        query: {
          noticeId,
          needConfirm,
          classId,
          studentId
        }
      });
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
                  this.list.push(element);
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
        this.list = res.data.data || [];
      }
    }
  },
  mounted() {
    //this.wxSdk.wxShare(this.roleType);
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
