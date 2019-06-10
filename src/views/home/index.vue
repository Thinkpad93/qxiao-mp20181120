<template>
  <div class="page">
    <div class="page-bd">
      <!-- 角色选择 -->
      <!-- 用户信息 -->
      <div class="flex a-i-c home-user gradient-two">
        <router-link to="/role/select" class="switch-role" v-if="roleList.length == 2">
          <van-icon name="replay" size="16px"></van-icon>
          <span>切换角色</span>
        </router-link>
        <router-link tag="div" class="switch-children" to="/baby" v-if="roleType == 3">
          <van-icon name="arrow" size="18px"></van-icon>
        </router-link>
        <div class="flex a-i-c">
          <div class="avatar" @click="jumpRole">
            <img :src="photo" width="60" height="60" radius="50">
          </div>
          <div class="pl-20">
            <h3 class="mb-20" size-18>{{ name }}</h3>
            <p size-12>知识是智慧的火炬</p>
          </div>
        </div>
      </div>
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
        <qxRelease url="/community"/>
      </template>
      <div class="experience" v-if="experience == 1">
        <p>快去邀请老师成为班级管理员吧</p>
        <van-button type="primary" size="small" @click="handleShare">邀请</van-button>
      </div>
      <main class="main">
        <div class="classId flex a-i-c j-c-s-b">
          <p>班级圈</p>
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
import Cookies from "js-cookie";
import service from "@/api";
import wxapi from "@/config/wxapi";
import qxMenu from "@/components/Menu";
import qxCommunity from "@/components/Community";
import qxRelease from "@/components/Release";
import qxFooter from "@/components/Footer";
import { scrollMixins } from "@/mixins/scroll";
import classList from "@/mixins/classList";
import pageMixin from "@/mixins/page";
import { mapState } from "vuex";
import { API_ROOT } from "@/config/isdev";
export default {
  name: "home",
  mixins: [pageMixin, scrollMixins, classList],
  components: {
    qxMenu,
    qxCommunity,
    qxRelease,
    qxFooter
  },
  data() {
    return {
      popupShow: false,
      isLoading: false,
      totalPage: 1, //总页数
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
      },
      roleList: []
    };
  },
  computed: {
    ...mapState("user", {
      isOpen: state => state.info.isOpen,
      photo: state => state.info.photo,
      name: state => state.info.name,
      roleType: state => state.info.roleType,
      experience: state => state.info.experience
    }),
    className: {
      get() {
        return this.$store.state.user.info.className;
      },
      set(newValue) {
        return (this.$store.state.user.info.className = newValue);
      }
    }
  },
  methods: {
    wxRegCallback() {
      //用于微信JS-SDK回调

      this.wxShareAppMessage();
    },
    wxShareAppMessage() {
      let that = this;
      let shareUrl = API_ROOT + "#/teacher/share";
      let option = {
        title: "亲爱的用户您好", // 分享标题
        desc: "小Q智慧欢迎您的加入", // 分享描述
        link: shareUrl, // 分享链接，根据自身项目决定是否需要split
        success: () => {
          that.$toast("分享成功");
        },
        error: () => {
          that.$toast("已取消分享");
        }
      };
      wxapi.wxShareAppMessage(option);
    },
    handleShare() {
      this.$toast("请点击右上角发送给好友");
    },
    jumpRole() {
      if (this.roleType != 3) {
        this.$router.push({
          path: "/role"
        });
      }
    },
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
      let indexs;
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
          //取消点赞
          this.communityData[index].praiseList.forEach((elem, index) => {
            if (elem.openId == openId && elem.studentId == studentId) {
              indexs = index;
            }
          });
          if (indexs != undefined) {
            this.communityData[index].praiseList.splice(indexs, 1);
          }
        } else {
          //点赞
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
    //删除该条班级圈
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
    },
    //多角色列表
    async queryRole(params = {}) {
      let res = await service.queryRole(params);
      if (res.errorCode === 0) {
        this.roleList = res.data;
      }
    }
  },
  mounted() {
    this.communityQuery(this.query);
    this.queryRole({ openId: this.query.openId });
    if (this.experience == 1) {
      wxapi.wxRegister(this.wxRegCallback);
    }
  }
};
</script>
<style lang="less" scoped>
.home-user {
  color: #fff;
  height: 180px;
  padding: 0 30px;
  position: relative;
}

.switch-role {
  color: #fff;
  position: absolute;
  top: 22px;
  right: 0;
  display: flex;
  height: 60px;
  padding: 0 30px;
  align-items: center;
  border-radius: 30px 0 0 30px;
  background-color: #c1e77e;
}
.switch-children {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.home-myStudent {
  min-height: 120px;
  padding: 0 30px;
  background-color: #fff;
  margin-bottom: 10px;
}

.experience {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  color: #ed6a0c;
  padding: 0 20px;
  position: relative;
  margin-top: 20px;
  background-color: #fffbe8;
}
</style>
