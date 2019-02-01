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
          @confirm="handleClassConfirm">
        </van-picker>
      </van-popup>
      <template v-if="(roleType === 2) || (roleType === 3)">
        <router-link to="/community" class="release">
          <img src="@/assets/image/release-icon.png" alt="">
        </router-link>
      </template>
      <main class="main">
        <section class="classId">
          <span @click="popupShow = true">
            {{ className }}
            <i class="iconfont icon-xiangxia1"></i>
          </span>
        </section>
        <section class="community">
          <div class="box" v-for="(community, index) in communityData" :key="index">
            <div class="cell">
              <div class="cell-hd">
                <img v-if="community.photo" :src="community.photo" alt="">
              </div>
              <div class="cell-bd">
                <h5 size-15>{{ community.name }}</h5>
                <p size-15>{{ community.textContent }}</p>
                <template>
                  <div class="img-group">
                    <div
                      class="item"
                      :style="{backgroundImage: `url(${img.imageUrl})`}" 
                      v-for="(img, index) in community.images" :key="index"
                      @click="handlePreviewImage(index, community.images)"></div>
                  </div>
                </template>
                <div class="handle">
                  <div class="left">
                    <time>{{ community.postTime }}</time>
                    <!-- 园长和老师才能删除 -->
                    <template v-if="roleType === 1 || roleType === 2">
                      <span class="del" @click="handleCommunityDelete(community, index)">删除</span>
                    </template>
                  </div>
                  <div class="right">
                    <i class="iconfont icon-zantongfill" @click="handlePraise(community)"></i>
                    <i class="iconfont icon-liuyanfill" @click="handleComment(community)"></i>
                  </div>
                </div>
                <div class="data">
                  <template v-if="community.praiseList">
                    <div class="zan-list" size-12>
                      <i class="iconfont icon-zantong"></i>
                      <span v-for="(praise, index) in community.praiseList" :key="index">{{ praise.studentName }}</span>
                    </div>
                  </template>
                  <template v-if="community.commentList">
                    <ul class="comment-list" size-12>
                      <li v-for="(commen, index) in community.commentList" :key="index">
                        {{ commen.studentName }}:{{ commen.textContent }}
                      </li>
                    </ul>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>   
      <!-- 评论 -->
      <van-dialog 
        title="评论" 
        v-model="dialogVisible" 
        show-cancel-button 
        @cancel="dialogVisible = false" 
        :before-close="handleSubmit">
        <div class="comment-form">
          <form ref="form" action="" method="post">
            <div class="cells" style="padding:15px 0 15px 0;">
              <div class="cell">
                <div class="cell-bd" style="padding-left:0">
                  <textarea class="textarea" placeholder="请输入评论内容..." rows="6" v-model="form.textContent"></textarea>
                </div>
              </div>            
            </div>
          </form>
        </div>
      </van-dialog>
    </div>
    <div class="page-ft">
      <qxfooter></qxfooter>
    </div>    
  </div>
</template>
<script>
import { ImagePreview } from "vant";
import service from "@/api";
import qxfooter from "@/components/footer";
import qxmenu from "@/components/menu";
import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    qxfooter,
    qxmenu
  },
  data() {
    return {
      popupShow: false,
      dialogVisible: false,
      className: this.$store.getters.className,
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        classId: this.$store.getters.classId || this.$route.query.classId,
        openId: this.$store.getters.openId || this.$route.query.openId,
        page: 1,
        pageSize: 10
      },
      classList: this.$store.getters.classList,
      communityData: [],
      form: {
        openId: this.$store.getters.openId,
        communityId: null,
        textContent: ""
      }
    };
  },
  computed: {
    ...mapGetters(["id", "roleType"])
  },
  methods: {
    go(url) {
      if (url) {
        this.$router.push({ path: `${url}` });
      }
    },
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.communityQuery(this.query);
    },
    // handleSelectClass() {
    //   this.$weui.picker(this.classList, {
    //     defaultValue: [this.query.classId],
    //     onConfirm: result => {
    //       let value = result[0].value; //取第一个元素
    //       let label = result[0].label;
    //       this.className = label;
    //       this.query.classId = value;
    //       this.communityQuery(this.query);
    //     }
    //   });
    // },
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
    //点赞
    handlePraise(community) {
      let openId = this.$store.getters.openId;
      let { communityId } = community;
      this.communityPraise({ openId, communityId });
    },
    //班级圈评论
    handleComment(community) {
      let { communityId } = community;
      if (communityId) {
        this.dialogVisible = true;
        this.form.communityId = communityId;
      }
    },
    handleSubmit(action, done) {
      if (action === "confirm") {
        if (this.form.textContent == "") {
          this.$toast("请输入评论内容");
          done(false);
        } else {
          this.communityComment(this.form);
          done();
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
            message: "确实要删除该条班级较圈吗?"
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
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        // let classMap = res.data.map(item => {
        //   return {
        //     label: item.className,
        //     value: item.classId
        //   };
        // });
        this.classList = res.data;
        this.className = res.data[0].className;
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
    },
    //班级圈点赞
    async communityPraise(params = {}) {
      let res = await service.communityPraise(params);
      if (res.errorCode === 0) {
        this.query.page = 1;
        this.communityQuery(this.query);
      }
    },
    //班级圈评论
    async communityComment(params) {
      let res = await service.communityComment(params);
      if (res.errorCode === 0) {
        this.dialogVisible = false;
        this.form.textContent = "";
        this.query.page = 1;
        this.communityQuery(this.query);
      }
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleLoadingMore);
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      this.$store.dispatch("user/reload", this.$route.query, { root: true });
    }
    if (this.id) {
      this.queryClassId({ id: this.id, roleType: this.roleType });
    }
    this.communityQuery(this.query);
    document.addEventListener("scroll", this.handleLoadingMore);
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
      line-height: 1.4;
      margin-top: 5px;
      margin-bottom: 10px;
      text-align: justify;
    }
  }
  .cell-hd {
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .del {
    color: #ff87b7;
    margin-left: 20px;
  }
  .data {
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
    background-size: 100%;
    background-repeat: no-repeat;
  }
}
.handle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin-top: 10px;
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
  padding: 10px 20px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  i {
    font-size: 30px;
    color: #9aa4cb;
    margin-right: 10px;
  }
  span {
    margin-right: 5px;
  }
}
.comment-list {
  color: #9aa4cb;
  padding-bottom: 15px;
  border-top: 2px solid #e7e7e7;
  li {
    margin-top: 15px;
    padding: 0 20px 0 20px;
  }
}
.keyboard {
  position: absolute;
  z-index: -1;
  left: -1000px;
  top: 0px;
  display: block;
}
</style>
