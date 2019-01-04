<template>
  <div class="page">
    <div class="page-hd">
      <qxmenu @change="go"></qxmenu>
    </div>
    <div class="page-bd">
      <router-link to="/community" class="release">
        <img src="@/assets/image/release-icon.png" alt="">
      </router-link>
      <main class="main">
        <section class="classId">
          <span @click="handleSelectClass">{{ className }}</span>
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
                    <img v-for="(img, index) in community.images" :key="index" :src="img.imageUrl" alt="">
                  </div>
                </template>
                <div class="handle">
                  <div class="left">
                    <time>{{ community.postTime }}</time>
                    <span class="del" @click="handleCommunityDelete(community, index)">删除</span>
                  </div>
                  <div class="right">
                    <img src="@/assets/image/zan-active-icon.png" alt="" @click="handlePraise(community)">
                    <img src="@/assets/image/comment-icon.png" alt="">
                  </div>
                </div>
                <div class="data">
                  <template v-if="community.praiseList">
                    <div class="zan-list" size-12>
                      <img src="@/assets/image/zan-icon.png" alt="">
                      <span v-for="(praise, index) in community.praiseList" :key="index">{{ praise.studentName }}</span>
                    </div>
                  </template>
                  <template v-if="community.commentList">
                    <ul class="comment-list" size-12>
                      <li v-for="(commen, index) in community.commentList" :key="index">{{ commen.textContent }}</li>
                    </ul>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>      
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
import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    qxfooter,
    qxmenu
  },
  data() {
    return {
      className: this.$store.getters.className,
      query: {
        openId: this.$store.getters.openId,
        classId: this.$store.getters.classId
      },
      classList: this.$store.getters.classList,
      communityData: []
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
    //点赞
    handlePraise(community) {
      let openId = this.$store.getters.openId;
      let { communityId } = community;
      this.communityPraise({ openId, communityId });
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
    }
  },
  mounted() {
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
    color: #656895;
  }
  .cell-bd {
    flex: 1;
    padding-left: 20px;
    p {
      line-height: 1.4;
      margin-top: 5px;
      margin-bottom: 20px;
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
  img {
    width: 160px;
    height: 160px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
.handle {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .right {
    img {
      margin-left: 20px;
    }
  }
}
.zan-list {
  color: #9aa4cb;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  img {
    margin-right: 20px;
  }
  span {
    margin-right: 5px;
  }
}
.comment-list {
  color: #9aa4cb;
  border-top: 2px solid #e7e7e7;
  li {
    padding: 10px 20px;
  }
}
</style>
