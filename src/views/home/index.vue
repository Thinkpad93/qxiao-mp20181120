<template>
  <div class="page">
    <nav class="nav">
      <div class="nav-item" v-for="(menu, index) in menuList" :key="index" @click="go(menu.url)">
        <img :src="menu.icon" alt="">
        <div class="text-ellipsis">{{ menu.name }}</div>
      </div>
    </nav>
    <main class="main">
      <section class="community">
        <div class="box" v-for="(ity, index) in 1" :key="index">
          <div class="cell">
            <div class="cell-hd">
              <img class="" src="http://iph.href.lu/48x48" alt="">
            </div>
            <div class="cell-bd">
              <h5>李一花老师</h5>
              <p>那么对于刚接触VBA的新手</p>
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

                </div>
              </div>
              <div class="data">
                <div class="zan-list">
                  <span v-for="(zan, index) in 6" :key="index">黄飞鸿{{index}},</span>
                </div>
                <ul class="comment-list">
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
          name: "通知公告做一个好人",
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
          url: "",
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
    }
  }
};
</script>
<style lang="less">
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
    font-size: 30px;
  }
  .cell-bd {
    flex: 1;
    padding-left: 20px;
    p {
      font-size: 32px;
      margin: 20px 0;
    }
  }
  .cell-hd {
    img {
      border-radius: 50%;
    }
  }
  .del {
    color: #ff87b7;
  }
  .data {
    background-color: #f2f2f2;
  }
}
.img-group {
  font-size: 0;
  img {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
.handle {
  display: flex;
  justify-content: space-between;
}
</style>
