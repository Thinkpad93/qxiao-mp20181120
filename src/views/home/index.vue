<template>
  <div class="page">
    <div class="page-hd">
      <qxmenu @change="go"></qxmenu>
    </div>
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="classList"
          show-toolbar
          value-key="className"
          @cancel="popupShow = false"
          @confirm="handleClassConfirm"
        ></van-picker>
      </van-popup>
      <template v-if="isOpen">
        <router-link to="/community" class="release">
          <img src="@/assets/image/release-icon.png" alt>
        </router-link>
      </template>
      <main class="main">
        <div class="classId">
          <div @click="popupShow = true">
            <span>{{ className }}</span>
            <i class="iconfont icon-xiangxia1"></i>
          </div>
        </div>
        <!-- 班级圈 -->
        <qx-community
          :data="communityData"
          @on-del="handleCommunityDelete"
          @on-praise="handlePraise"
          @on-comment="handleComment"
        ></qx-community>
      </main>
      <!-- 评论 -->
      <van-dialog
        title="评论"
        v-model="dialogVisible"
        show-cancel-button
        @cancel="dialogVisible = false"
        :before-close="handleSubmit"
      >
        <div class="comment-form">
          <form ref="form" action method="post">
            <div class="cells" style="padding:15px 0 15px 0;">
              <div class="cell">
                <div class="cell-bd" style="padding-left:0">
                  <textarea
                    class="textarea"
                    placeholder="请输入评论内容..."
                    rows="6"
                    v-model="form.textContent"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </van-dialog>
    </div>
    <div class="page-ft">
      <footer class="footer">
        <div class="item">
          <router-link to="/home">
            <i class="iconfont icon-shouyefill"></i>
            <div>首页</div>
          </router-link>
        </div>
        <div class="item">
          <template>
            <router-link to="/my">
              <i class="iconfont icon-yonghufill"></i>
              <div>我的</div>
            </router-link>
          </template>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import service from "@/api";
import qxmenu from "@/components/menu";
import qxCommunity from "@/components/Community";
import { mapState } from "vuex";
import { scrollMixins } from "@/mixins/scroll";

export default {
  name: "home",
  mixins: [scrollMixins],
  components: {
    qxmenu,
    "qx-community": qxCommunity
  },
  data() {
    return {
      studentPicker: false,
      popupShow: false,
      dialogVisible: false,
      className:
        this.$store.state.users.className || this.$route.query.className,
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        classId: this.$store.state.users.classId || this.$route.query.classId,
        openId: this.$store.state.wx.openId || this.$route.query.openId,
        studentId:
          this.$store.state.student.studentId || this.$route.query.studentId,
        page: 1,
        pageSize: 10
      },
      communityData: [],
      form: {
        index: null,
        openId: this.$store.state.wx.openId,
        studentId:
          this.$store.state.student.studentId || this.$route.query.studentId,
        communityId: null,
        textContent: ""
      }
    };
  },
  computed: {
    ...mapState("users", {
      roleType: state => state.roleType,
      isOpen: state => state.isOpen,
      id: state => state.id
      //className: state => state.className
    }),
    ...mapState("queryClass", {
      classList: state => state.classList
    })
  },
  filters: {
    capitalize(value) {
      return `${value},`;
    }
  },
  methods: {
    go(url) {
      if (url) {
        this.$router.push({ path: `${url}` });
      }
    },
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.communityQuery(this.query);
    },
    //班级圈点赞
    async handlePraise(community, index) {
      let openId = this.$store.state.wx.openId;
      let studentId =
        this.$store.state.student.studentId || this.$route.query.studentId;
      let { communityId } = community;
      let res = await service.communityPraise({
        openId,
        communityId,
        studentId
      });
      if (res.errorCode === 0) {
        if (!this.communityData[index].praiseList) {
          this.communityData[index].praiseList = [];
        }
        if (!res.data) {
          let praise = this.communityData[index].praiseList.filter(
            elem => elem.openId !== openId && elem.studentId !== studentId
          );
          console.log(praise);
          this.communityData[index].praiseList = praise.length ? praise : [];
        } else {
          this.communityData[index].praiseList.push(res.data);
        }
      }
    },
    //班级圈评论
    handleComment(community, index) {
      this.dialogVisible = true;
      this.form.communityId = community.communityId;
      this.form.index = index;
    },
    async handleSubmit(action, done) {
      let { index, ...args } = this.form;
      if (action === "confirm") {
        if (this.form.textContent == "") {
          this.$toast("请输入评论内容");
          done(false);
        } else {
          if (!this.communityData[index].commentList) {
            this.communityData[index].commentList = [];
          }
          let res = await service.communityComment(args);
          if (res.errorCode === 0) {
            this.dialogVisible = false;
            this.form.textContent = "";
            this.communityData[index].commentList.push(res.data);
            done();
          }
        }
      } else {
        done();
      }
    },
    handleCommunityDelete(community, index) {
      let { openId, communityId } = community;
      if (openId && communityId) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确实要删除该条班级圈吗?"
          })
          .then(() => {
            this.communityData.splice(index, 1);
            this.communityDelete({ openId, communityId });
          })
          .catch(() => {});
      }
    },
    //加载更多班级圈
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
        if (this.query.page < this.totalPage) {
          this.isLoading = true;
          this.query.page += 1;
          service.communityQuery(this.query).then(res => {
            if (res.errorCode === 0) {
              this.popupShow = false;
              this.totalPage = res.data.totalPage;
              this.query.page = res.data.page;
              this.isLoading = false;
              let list = res.data.data;
              if (list.length) {
                list.forEach(element => {
                  this.communityData.push(element);
                });
              }
            }
          });
        }
      }
    },
    //班级圈信息查询
    async communityQuery(params = {}) {
      let res = await service.communityQuery(params);
      if (res.errorCode === 0) {
        let list = res.data.data || [];
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.isLoading = false;
        this.popupShow = false;
        this.communityData = list;
      }
    },
    //班级圈删除
    async communityDelete(params = {}) {
      let res = await service.communityDelete(params);
      if (res.errorCode === 0) {
        //...
      }
    }
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      this.$store.dispatch("users/reloadUserInfo", this.$route.query);
    }
    this.wxSdk.wxShare(this.roleType);
    this.communityQuery(this.query);
  }
};
</script>
<style lang="less">
.page-ft {
  padding-top: 130px;
}
</style>
