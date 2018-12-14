<template>
  <div class="page">
    <nav class="nav">
      <div class="nav-item" v-for="(menu, index) in menuList" :key="index" @click="go(menu.url)">
        <img :src="menu.icon" alt="">
        <div class="text-ellipsis">{{ menu.name }}</div>
      </div>
    </nav>
    <div class="release">
      <img src="@/assets/image/release-icon.png" alt="">
    </div>
    <main class="main">
      <section class="community">
        <div class="box" v-for="(ity, index) in 6" :key="index">
          <div class="cell">
            <div class="cell-hd">
              <img class="" src="http://iph.href.lu/48x48" alt="">
            </div>
            <div class="cell-bd">
              <h5 size-15>李一花老师</h5>
              <p size-17 class="line-clamp">那么对于刚接触VBA的新手,没有人能在这首BGM下打赢我,谁说的？我就打赢了，楼上是SB</p>
              <div class="img-group">
                <img class="" src="http://iph.href.lu/80x80" alt="">
                <img class="" src="http://iph.href.lu/80x80" alt="">
                <img class="" src="http://iph.href.lu/80x80" alt="">
              </div>
              <div class="handle">
                <div class="left">
                  <time>2分钟</time>
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
                  <span v-for="(zan, index) in 6" :key="index">黄飞鸿{{index}},</span>
                </div>
                <ul class="comment-list" size-12>
                  <li>黄飞鸿: 没有人能在这首BGM下打赢我</li>
                  <li>赵天霸: 谁说的？我就打赢了，楼上是SB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <qxfooter></qxfooter>
  </div>
</template>
<script>
import service from "@/api";
import qxfooter from "@/components/footer";
export default {
  name: "home",
  components: {
    qxfooter
  },
  data() {
    return {
      menuList: [
        {
          name: "通知公告",
          url: "",
          icon: "./static/image/men-icon-7@2x.png"
        },
        {
          name: "营养食谱",
          url: "",
          icon: "./static/image/men-icon-9@2x.png"
        },
        {
          name: "亲子作业",
          url: "",
          icon: "./static/image/men-icon-5@2x.png"
        },
        {
          name: "考勤记录",
          url: "",
          icon: "./static/image/men-icon-3@2x.png"
        },
        {
          name: "新鲜速报",
          url: "/fresh",
          icon: "./static/image/men-icon-8@2x.png"
        },
        {
          name: "班级相册",
          url: "",
          icon: "./static/image/men-icon-2@2x.png"
        },
        {
          name: "班级管理",
          url: "/class",
          icon: "./static/image/men-icon-1@2x.png"
        },
        {
          name: "老师管理",
          url: "/teacher",
          icon: "./static/image/men-icon-4@2x.png"
        }
      ]
    };
  },
  methods: {
    go(url) {
      if (url) {
        this.$router.push({ path: `${url}` });
      }
    },
    //班级圈信息查询
    async communityQuery(params = {}) {
      let res = await service.communityQuery(params);
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  &-item {
    width: 25%;
    min-width: 0; /*解决方案*/
    height: 168px;
    text-align: center;
    &:active {
      background-color: #f2f2f2;
    }
    img {
      width: 114px;
      height: 114px;
    }
  }
}
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
    font-weight: bold;
    color: #656895;
  }
  .cell-bd {
    flex: 1;
    padding-left: 20px;
    p {
      margin: 20px 0;
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
  padding: 10px;
}
.comment-list {
  padding: 10px;
}
.release {
  position: fixed;
  right: 5%;
  bottom: 10%;
  z-index: 100;
}
</style>
