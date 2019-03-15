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
      <!-- student Picker -->
      <!-- <van-popup v-model="studentPicker" position="bottom">
        <van-picker :columns="studentList" show-toolbar @change="onChange"></van-picker>
      </van-popup>-->
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
          <!-- <div class="student-picker">
            <a href="javascript:void(0);" @click="studentPicker = true">打开</a>
          </div>-->
        </div>
        <div class="community">
          <div class="box" v-for="(community, index) in communityData" :key="index">
            <div class="cell">
              <div class="cell-hd">
                <img v-if="community.photo" :src="community.photo" alt>
              </div>
              <div class="cell-bd">
                <h5 size-15>{{ community.name }}</h5>
                <p size-15>{{ community.textContent }}</p>
                <template>
                  <div class="img-group">
                    <div
                      class="item"
                      :style="{backgroundImage: `url(${img.imageUrl})`}"
                      v-for="(img, index) in community.images"
                      :key="index"
                      @click="handlePreviewImage(index, community.images)"
                    ></div>
                  </div>
                </template>
                <div class="handle">
                  <div class="left">
                    <time>{{ community.postTime }}</time>
                    <!-- 园长和老师才能删除 -->
                    <template v-if="roleType == 1 || roleType == 2">
                      <span class="del" @click="handleCommunityDelete(community, index)">删除</span>
                    </template>
                  </div>
                  <div class="right">
                    <i class="iconfont icon-zantongfill" @click="handlePraise(community, index)"></i>
                    <i class="iconfont icon-liuyanfill" @click="handleComment(community, index)"></i>
                  </div>
                </div>
                <div class="data">
                  <template v-if="community.praiseList">
                    <div class="zan-list" size-14>
                      <i class="iconfont icon-zantong"></i>
                      <span
                        v-for="(praise, index) in community.praiseList"
                        :key="index"
                      >{{ praise.studentName | capitalize }}</span>
                    </div>
                  </template>
                  <template v-if="community.commentList">
                    <ul class="comment-list" size-14>
                      <li
                        v-for="(commen, index) in community.commentList"
                        :key="index"
                      >{{ commen.studentName }}:{{ commen.textContent }}</li>
                    </ul>
                  </template>
                </div>
              </div>
            </div>
          </div>
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
import { mapState } from "vuex";
import { scrollMixins } from "@/mixins/scroll";

const citys = {
  太平洋: ["孙志明"],
  印度洋: ["致命"]
};

const hit = [{ 南极班: ["三明", "泉州"] }, { 北极班: ["厦门", "福州"] }];

export default {
  name: "home",
  mixins: [scrollMixins],
  components: {
    qxmenu
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
      studentList: [
        {
          values: ["太平洋", "印度洋"]
        },
        {
          values: ["孙志明"]
        }
      ],
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
    }),
    ...mapState("queryClass", {
      classList: state => state.classList
    }),
    hotStudentList() {
      let tt = this.classList.map((element, inden) => {
        let res = [];
        let obj = {};
        res.push(element.className);
        obj.values = res;
        return obj;
      });
      console.log(tt);
    },
    hitStudentList() {
      let result = this.classList.map((element, index) => {
        if (element.student.length) {
          let rObj = {};
          let res = [];
          element.student.forEach(item => {
            res.push(item.studentName);
          });
          rObj[element.className] = res;
          return rObj;
        }
      });
      return result;
    }
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
    //预览图片
    handlePreviewImage(index, images) {
      //通过传入配置对象，可以指定初始图片的位置、监听关闭事件
      if (Array.isArray(images)) {
        let resule = [];
        images.forEach(item => {
          resule.push(item.imageUrl);
        });
        ImagePreview({
          images: resule,
          startPosition: index
        });
      }
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
            elem => elem.openId !== openId
          );
          console.log(praise);
          this.communityData[index].praiseList = praise.length ? praise : null;
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
      this.$store.dispatch("users/reloadUserInfo", this.$route.query, {
        root: true
      });
    }
    this.communityQuery(this.query);
  }
};
</script>
<style lang="less">
.page-ft {
  padding-top: 130px;
}
.community {
  .box {
    border-top: 1px solid #f2f2f2;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .cell {
    padding: 0 30px;
    display: flex;
    position: relative;
    align-items: flex-start;
    &::before {
      display: none;
    }
  }
  h5 {
    font-weight: bold;
    color: #656895;
  }
  .cell-bd {
    flex: 1;
    padding-left: 20px;
    p {
      line-height: 1.2;
      margin-top: 16px;
      margin-bottom: 16px;
    }
  }
  .cell-hd {
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
  }
  .del {
    color: #ff87b7;
    margin-left: 20px;
  }
  .data {
    margin-top: 20px;
    background-color: #f5f5f5;
  }
}
.img-group {
  font-size: 0;
  .item {
    display: inline-block;
    width: 160px;
    height: 160px;
    margin-right: 10px;
    margin-bottom: 10px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
}
.handle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .right {
    font-size: 0;
    i {
      font-size: 36px;
      color: #9aa4cb;
      display: inline-block;
      margin-left: 20px;
    }
  }
}
.zan-list {
  color: #9aa4cb;
  padding: 10px 20px 0 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  i {
    font-size: 30px;
    color: #9aa4cb;
    margin-right: 10px;
  }
  span {
    margin-right: 5px;
    margin-bottom: 10px;
  }
}
.comment-list {
  position: relative;
  color: #9aa4cb;
  padding: 15px 0;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e7e7e7;
    color: #e7e7e7;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  li {
    margin-top: 15px;
    padding: 0 20px 0 20px;
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
