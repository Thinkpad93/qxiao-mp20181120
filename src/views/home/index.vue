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
                <img v-if="community.photo" src="http://iph.href.lu/48x48" alt="">
              </div>
              <div class="cell-bd">
                <h5 size-15>{{ community.name }}</h5>
                <p size-15 class="line-clamp">{{ community.textContent }}</p>
                <template>
                  <div class="img-group">
                    <img v-for="(img, index) in community.images" :key="index" :src="img.imageUrl" alt="">
                  </div>
                </template>
                <div class="handle">
                  <div class="left">
                    <time>{{ community.postTime }}</time>
                    <span class="del" @click="handleCommunityDelete(community)">删除</span>
                  </div>
                  <div class="right">
                    <img src="@/assets/image/zan-active-icon.png" alt="">
                    <img src="@/assets/image/comment-icon.png" alt="">
                  </div>
                </div>
                <div class="data">
                  <div class="zan-list" size-12>
                    <img src="@/assets/image/zan-icon.png" alt="">
                    <span v-for="(zan, index) in 2" :key="index"></span>
                  </div>
                  <ul class="comment-list" size-12>
                    <li v-for="(commen, index) in community.commentList" :key="index">{{ commen.textContent }}</li>
                  </ul>
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
export default {
  name: "home",
  components: {
    qxfooter,
    qxmenu
  },
  data() {
    return {
      query: {
        openId: this.$store.getters.openId,
        classId: null
      },
      className: null,
      classList: [],
      communityData: []
    };
  },
  methods: {
    go(url) {
      if (url) {
        this.$router.push({ path: `${url}` });
      }
    },
    handleSelectClass() {
      let classMap = this.classList.map(item => {
        return {
          label: item.className,
          value: item.classId
        };
      });
      this.$weui.picker(classMap, {
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
    handleCommunityDelete(community) {
      let { openId, communityId } = community;
      if (openId && communityId) {
        this.$weui.confirm(
          "确实要删除该条班级较圈吗",
          () => {
            this.communityDelete({ openId, communityId });
          },
          { title: "提示" }
        );
      }
    },
    //根据类型查询相关班级
    async queryClassId() {
      let roleType = this.$store.getters.roleType;
      let obj = {
        id: null,
        roleType
      };
      switch (roleType) {
        case 1:
          obj.id = this.$store.getters.schoolId;
          break;
        case 2:
          obj.id = this.$store.getters.teacherId;
        default:
      }
      let res = await service.queryClassId(obj);
      if (res.errorCode === 0) {
        this.classList = res.data;
        let copy = this.classList.slice(0, 1);
        this.className = copy[0].className;
        this.query.classId = copy[0].classId;
        await service.communityQuery(this.query);
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
      }
    },
    //班级圈点赞
    async communityPraise(params = {}) {
      let res = await service.communityPraise(params);
      if (res.errorCode === 0) {
      }
    }
  },
  activated() {
    this.queryClassId();
  }
};
</script>
<style lang="less" scoped>
.community {
  .box {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .cell {
    padding: 0 30px;
    display: flex;
    position: relative;
    align-items: flex-start;
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
}
.zan-list {
  color: #9aa4cb;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  img {
    margin-right: 20px;
  }
}
.comment-list {
  color: #9aa4cb;
  border-top: 2px solid #e7e7e7;
  li {
    padding: 10px 20px;
  }
}
.release {
  display: block;
  position: fixed;
  right: 5%;
  bottom: 10%;
  z-index: 100;
}
</style>
