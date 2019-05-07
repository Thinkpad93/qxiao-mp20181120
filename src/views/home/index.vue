<template>
  <div class="page">
    <div class="page-bd">
      <qx-menu @on-change="go"></qx-menu>
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
        <router-link :to="{path: '/community'}" class="release">
          <van-icon name="description" size="24px"></van-icon>
        </router-link>
      </template>
      <main class="main">
        <div class="classId">
          <div @click="popupShow = true">
            <span class="mr-10">{{ className }}</span>
            <van-icon name="arrow-down" size="16px"></van-icon>
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
      <qx-footer></qx-footer>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import qxMenu from "@/components/Menu";
import qxCommunity from "@/components/Community";
import qxFooter from "@/components/Footer";
import { scrollMixins } from "@/mixins/scroll";
import classList from "@/mixins/classList";
export default {
  name: "home",
  mixins: [scrollMixins, classList],
  components: {
    qxMenu,
    qxCommunity,
    qxFooter
  },
  data() {
    return {
      studentPicker: false,
      popupShow: false,
      dialogVisible: false,
      className: this.$store.state.user.info.className,
      isLoading: false,
      totalPage: 1, //总页数
      isOpen: this.$store.state.user.info.isOpen,
      roleType: this.$store.state.user.info.roleType,
      id: this.$store.state.user.info.id,
      query: {
        classId: this.$store.state.user.info.classId,
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.studentId,
        page: 1,
        pageSize: 10
      },
      communityData: [],
      form: {
        index: null,
        openId: this.$store.state.user.info.openId,
        studentId: this.$store.state.user.info.studentId,
        communityId: null,
        textContent: ""
      }
    };
  },
  filters: {
    capitalize(value) {
      return `${value},`;
    }
  },
  methods: {
    go(url, params) {
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
      let openId = this.query.openId;
      let studentId = this.query.studentId;
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
        //这里添加两个新的属性
        this.communityData = list.map(item => {
          return {
            ...item,
            showMore: false,
            showNumber: 3
          };
        });
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
    this.communityQuery(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
