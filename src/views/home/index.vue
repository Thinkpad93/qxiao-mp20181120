<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="visibility">
        <div class="overlay" @click="visibility = false"></div>
        <div class="share-tip">
          <img src="@/assets/share-tip.png" />
          <p size-18>请点击右上角按钮邀请好友吧</p>
        </div>
      </template>
      <!-- 角色选择 -->
<<<<<<< HEAD
      <!-- 用户信息 -->
      <div class="flex a-i-c home-user gradient-two">
        <router-link to="/role/select" class="switch-role" v-if="roleList.length == 2">
          <van-icon name="replay" size="16px"></van-icon>
          <span>切换角色</span>
        </router-link>
        <router-link tag="div" class="switch-children" to="/baby" v-if="roleType == 3">
          <van-icon name="arrow" size="18px"></van-icon>
        </router-link>
=======
      <div class="flex a-i-c home-user gradient-two" @click="jumpRole">
<<<<<<< HEAD
        <div class="switch-role" v-if="roleList.length == 2" @click.stop="jumpRoleSelect">
          <van-icon name="replay" size="16px"></van-icon>
          <span>切换角色</span>
        </div>
>>>>>>> open-dev
=======
>>>>>>> open-dev-190701
        <div class="flex a-i-c">
          <div class="avatar">
            <img
              src="@/assets/child-default@2x.png"
              width="60"
              height="60"
              radius="50"
              v-if="experience == 1 || photo == ''"
            />
            <img :src="photo" width="60" height="60" radius="50" v-else />
          </div>
          <div class="js-user-change">
            <h3 class="mb-20" size-18>{{ name }}</h3>
            <p size-12>知识是智慧的火炬</p>
          </div>
        </div>
        <van-icon name="arrow" size="16px"></van-icon>
      </div>
      <!-- 用户信息 -->
      <!-- 菜单 -->
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
        <qxRelease url="/community" />
      </template>
<<<<<<< HEAD
      <div class="experience" v-if="experience == 1">
        <p>快去邀请老师成为班级管理员吧</p>
        <van-button type="primary" size="small" @click="handleShare">邀请</van-button>
=======
      <div class="experience flex" v-if="experience == 1">
        <div class="item" @click="handleCreateClass">
          <p>创建班级</p>
          <span size-12>我是老师我要创建班级</span>
        </div>
        <div class="item" @click="visibility = true">
          <p>邀请老师</p>
          <span size-12>我是家长邀请老师创建班级</span>
        </div>
>>>>>>> open-dev
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
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          :offset="100"
          @load="onLoad"
        >
          <qx-community
            :data="communityData"
            @on-del="handleCommunityDelete"
            @on-praise="handlePraise"
            @on-comment="handleComment"
          ></qx-community>
        </van-list>

        <div class="empty" v-if="!communityData.length">
          <img src="@/assets/kong.png" alt />
          <p>快来分享精彩的内容吧</p>
        </div>
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
import classList from "@/mixins/classList";
import pageMixin from "@/mixins/page";
import { mapState } from "vuex";
import { API_ROOT } from "@/config/isdev";
export default {
  name: "home",
  mixins: [pageMixin, classList],
  components: {
    qxMenu,
    qxCommunity,
    qxRelease,
    qxFooter
  },
  data() {
    return {
      visibility: false,
      popupShow: false,
      loading: false,
      finished: false,
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
<<<<<<< HEAD
      experience: state => state.info.experience
=======
      experience: state => state.info.experience,
      tel: state => state.info.tel
>>>>>>> open-dev
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
    //加载更多班级圈
    onLoad() {
      //当组件滚动到底部时，会触发load事件
      if (this.query.page < this.totalPage) {
        this.query.page += 1;
        service.communityQuery(this.query).then(res => {
          if (res.errorCode === 0) {
            let list = res.data.data;
            this.totalPage = res.data.totalPage;
            this.query.page = res.data.page;
            // 加载状态结束
            this.loading = false;
            for (let i = 0; i < list.length; i++) {
              let obj = {
                ...list[i],
                showMore: false,
                showNumber: 3
              };
              this.communityData.push(obj);
            }
          }
        });
      } else {
        // 数据全部加载完成
        console.log("数据全部加载完成");
        this.loading = false;
        this.finished = true;
      }
    },
    wxRegCallback() {
      //用于微信JS-SDK回调
<<<<<<< HEAD

=======
>>>>>>> open-dev
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
<<<<<<< HEAD
=======
    handleCreateClass() {
      this.$router.push({
        path: "/teacher/createClass",
        query: {
          openId: this.tel
        }
      });
    },
<<<<<<< HEAD
>>>>>>> open-dev
    handleShare() {
      this.$toast("请点击右上角发送给好友");
    },
=======
>>>>>>> open-dev-190701
    jumpRole() {
      if (this.roleType != 3) {
        this.$router.push({
          path: "/role"
        });
      } else {
        if (this.experience == 1) {
          return false;
        }
        this.$router.push({
          path: "/baby"
        });
      }
    },
<<<<<<< HEAD
<<<<<<< HEAD
=======
    jumpRoleSelect() {
      this.$router.push({
        path: "/role/select"
      });
    },
>>>>>>> open-dev
=======
>>>>>>> open-dev-190701
    go(url, params) {
      if (url) {
        this.$router.push({ path: `${url}` });
      }
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
  justify-content: space-between;
  .js-user-change {
    margin-left: 20px;
  }
}
<<<<<<< HEAD

.switch-role {
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  height: 60px;
  padding: 0 30px;
  align-items: center;
  border-radius: 30px 0 0 30px;
  background-color: #c1e77e;
}
<<<<<<< HEAD
.switch-children {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
=======
>>>>>>> open-dev

=======
>>>>>>> open-dev-190701
.experience {
  color: #84ce09;
  font-size: 32px;
  padding: 36px 20px;
  position: relative;
  margin-top: 20px;
  background-color: #fff;
  .item {
    flex: 1;
    text-align: center;
    span {
      color: #999;
    }
  }
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
