<template>
  <div class="page">
    <div class="page-hd">
      <qxmenu @change="go"></qxmenu>
    </div>
    <div class="page-bd">
      <template v-if="(roleType === 2) || (roleType === 3)">
        <router-link to="/community" class="release">
          <img src="@/assets/image/release-icon.png" alt="">
        </router-link>
      </template>
      <main class="main">
        <section class="classId">
          <span @click="handleSelectClass">
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
                      @click="handlePreviewImage(img.imageUrl, community.images)"></div>
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
      <div class="weui-mask" v-show="dialogVisible"></div>
      <!-- 评论 -->
      <QXDialog title="班级圈评论" :visible.sync="dialogVisible">
        <div class="comment-form">
          <form action="" method="post">
            <div class="cells">
              <div class="cell">
                <div class="cell-bd" style="padding-left:0">
                  <textarea class="textarea" placeholder="请输入评论内容..." rows="6" v-model="form.textContent"></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div slot="footer" class="dialog-ft">
          <a href="javascript:void(0);" class="dialog-btn-default" @click="dialogVisible = false">取消</a>
          <a href="javascript:void(0);" class="dialog-btn-primary" @click="handleSubmit">提交</a>
        </div>
      </QXDialog>         
    </div>
    <div class="page-ft">
      <qxfooter></qxfooter>
    </div>    
  </div>
</template>
<script>
import service from "@/api";
import qxfooter from "@/components/footer";
import qxmenu from "@/components/menu";
import QXDialog from "@/components/dialog";
import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    qxfooter,
    qxmenu,
    QXDialog
  },
  data() {
    return {
      dialogVisible: false,
      className: this.$store.getters.className,
      query: {
        openId: this.$store.getters.openId,
        classId: this.$store.getters.classId
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
    handleSelectClass() {
      this.$weui.picker(this.classList, {
        defaultValue: [this.query.classId],
        onConfirm: result => {
          let value = result[0].value; //取第一个元素
          let label = result[0].label;
          this.className = label;
          this.query.classId = value;
          this.communityQuery(this.query);
        }
      });
    },
    //预览图片
    handlePreviewImage(url, images) {
      let imgArray = [];
      images.forEach(element => {
        imgArray.push(element.imageUrl);
      });
      //华为手机 encodeURI
      wx.previewImage({
        current: encodeURI(url),
        urls: imgArray
      });
    },
    //点赞
    handlePraise(community) {
      let openId = this.$store.getters.openId;
      let { communityId } = community;
      this.communityPraise({ openId, communityId });
    },
    //班级圈评论
    handleComment(community) {
      console.log(community);
      let { communityId } = community;
      if (communityId) {
        this.dialogVisible = true;
        this.form.communityId = communityId;
      }
      //this.commForm.communityId = communityId;
      //this.$refs.keys.click();
      //alert(communityId);
    },
    handleSubmit() {
      this.communityComment(this.form);
    },
    handleCommunityDelete(community, index) {
      let { openId, communityId } = community;
      if (openId && communityId) {
        this.$weui.confirm(
          "确实要删除该条班级较圈吗",
          () => {
            this.communityData.splice(index, 1);
            this.communityDelete({ openId, communityId });
          },
          { title: "提示" }
        );
      }
    },
    //加载更多班级圈
    handleLoadingMore() {
      window.addEventListener("scroll", e => {
        // 滚动高度
        console.log(document.body.scrollTop);
        // 文档高度
        console.log(document.body.offsetHeight);
        // 可视区域高度
        console.log(window.innerHeight);
      });
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        let classMap = res.data.map(item => {
          return {
            label: item.className,
            value: item.classId
          };
        });
        this.classList = classMap;
      }
    },
    //班级圈信息查询
    async communityQuery(params = {}) {
      let res = await service.communityQuery(params);
      if (res.errorCode === 0) {
        this.communityData = res.data;
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
        this.communityQuery(this.query);
      }
    },
    //班级圈评论
    async communityComment(params) {
      let res = await service.communityComment(params);
      if (res.errorCode === 0) {
        this.dialogVisible = false;
        this.communityQuery(this.query);
      }
    },
    //通过config接口注入权限验证配置
    getWxConfig() {
      let url = window.location.href.split("#")[0];
      service.sign({ url }).then(res => {
        wx.config({
          debug: false, // 开启调试模式,开发时可以开启
          appId: res.appid, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: ["previewImage"] // 必填，需要使用的JS接口列表
        });
      });
    }
  },
  created() {
    this.handleLoadingMore();
    this.getWxConfig();
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      console.log("haha");
      this.$store.dispatch("user/reload", this.$route.query, { root: true });
    }
    if (this.id) {
      this.queryClassId({ id: this.id, roleType: this.roleType });
    }
  },
  activated() {
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
      line-height: 1.4;
      margin-top: 5px;
      margin-bottom: 10px;
      text-align: justify;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
  .cell-hd {
    img {
      width: 84px;
      height: 84px;
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
