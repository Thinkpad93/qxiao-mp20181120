<template>
  <div class="page">
    <div class="page-hd">
      <qxmenu @change="go"></qxmenu>
    </div>
    <div class="page-bd">
      <div class="release">
        <img src="@/assets/image/release-icon.png" alt="">
      </div>
      <main class="main">
        <section class="classId">
        </section>
        <section class="community">
          <div class="box" v-for="(item, index) in 1" :key="index">
            <div class="cell">
              <div class="cell-hd">
                <img class="" src="http://iph.href.lu/48x48" alt="">
              </div>
              <div class="cell-bd">
                <h5 size-15>李一花老师</h5>
                <p size-15 class="line-clamp">那么对于刚接触VBA的新手,没有人能在这首BGM下打赢我,谁说的？我就打赢了，楼上是SB</p>
                <div class="img-group">
                  <img class="" src="@/assets/image/109951163721592032.jpg" alt="">
                  <img class="" src="@/assets/image/109951163721592032.jpg" alt="">
                  <img class="" src="@/assets/image/109951163721592032.jpg" alt="">
                </div>
                <div class="handle">
                  <div class="left">
                    <time>2018年12月10号 08:00</time>
                    <span class="del">删除</span>
                  </div>
                  <div class="right">
                    <img src="@/assets/image/zan-active-icon.png" alt="">
                    <img src="@/assets/image/comment-icon.png" alt="">
                  </div>
                </div>
                <div class="data">
                  <div class="zan-list" size-12>
                    <img src="@/assets/image/zan-icon.png" alt="">
                    <span v-for="(zan, index) in 2" :key="index">黄飞鸿{{index}},</span>
                  </div>
                  <ul class="comment-list" size-12>
                    <li>黄飞鸿: 没有人能在这首BGM下打赢我，做一个好人吧，跟我说一下志</li>
                    <li>赵天霸: 谁说的？我就打赢了，楼上是SB</li>
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
import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    qxfooter,
    qxmenu
  },
  data() {
    return {
      query: {
        openId: "10086",
        classId: 10086
      },
      classList: []
    };
  },
  computed: {
    ...mapGetters(["roleType", "openId"])
  },
  methods: {
    go(url) {
      if (url) {
        this.$router.push({ path: `${url}` });
      }
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    },
    //班级圈信息查询
    async communityQuery(params = {}) {
      let res = await service.communityQuery(params);
    }
  },
  activated() {
    this.queryClassId({ id: 1, roleType: 1 });
    //this.communityQuery(this.query);
  },
  mounted() {
    console.log(this.roleType);
  }
};
</script>
<style lang="less" scoped>
.community {
  margin: 30px 0;
  background-color: #fff;
  .box {
    padding: 40px 0;
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
  position: fixed;
  right: 5%;
  bottom: 10%;
  z-index: 100;
}
</style>
