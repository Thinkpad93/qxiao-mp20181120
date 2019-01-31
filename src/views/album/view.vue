<template>
  <div class="page" style="padding-bottom: 65px;">
    <div class="page-bd">
      <van-dialog 
        v-model="dialogVisible" 
        title="相册名称" 
        show-cancel-button 
        @cancel="dialogVisible = false" 
        :before-close="handleSubmit">
        <div class="cells" style="padding:15px 0 15px 0;">
          <div class="cell">
            <div class="cell-bd" style="padding-left:0">
              <input class="input" placeholder="请输入相册名称" maxlength="10" v-model="title" style="text-align:left;">
            </div>
          </div>
        </div>
      </van-dialog>
      <!-- -->
      <div class="album-show">
        <div class="album-channel flex" 
          v-for="(channel, index) in albumChannel" 
          :key="index"
          @click="handleGo(channel.channelId)">
          <div class="album-thumb">
            <img v-if="channel.image" :src="album.image" alt="">
            <img v-else src="@/assets/image/kong.png" alt="">
          </div>
          <div class="album-box">
            <p size-15>{{ channel.title }}</p>
            <div size-12 style="margin-top: 4px;margin-bottom: 6px;">
              <span>共{{ channel.imagesCount }}张</span>
              <span>阅读{{ channel.readCount }}</span>
            </div>
            <time size-12>更新于{{ channel.updateTime }}</time>
          </div>
        </div>
      </div>
    </div>  
    <template v-if="roleType == 2">
      <section class="_confirm">
        <a href="javascript:void(0);" class="btn btn-primary" @click="dialogVisible = true">新增栏目</a>
      </section>
    </template>
  </div>  
</template>
<script>
import { Toast } from "vant";
import service from "@/api";
export default {
  name: "albumChannel",
  data() {
    return {
      title: "",
      dialogVisible: false,
      roleType: this.$store.getters.roleType,
      query: {
        openId: this.$store.getters.openId,
        classId: this.$route.query.classId
      },
      albumChannel: []
    };
  },
  methods: {
    handleGo(channelId) {
      this.$router.push({
        path: "/album/show",
        query: { channelId }
      });
    },
    handleSubmit(action, done) {
      if (action === "confirm") {
        if (this.title == "") {
          Toast("请输入相册名称");
          done(false);
        } else {
          let obj = Object.assign({}, this.query, { title: this.title });
          this.addChannel(obj);
          done();
        }
      } else {
        done();
      }
    },
    //查询班级所属的相册栏目
    async albumChannelQuery(params = {}) {
      let res = await service.albumChannelQuery(params);
      if (res.errorCode === 0) {
        this.albumChannel = res.data;
      }
    },
    //新增相册栏目
    async addChannel(params = {}) {
      let res = await service.addChannel(params);
      if (res.errorCode === 0) {
        this.dialogVisible = false;
        this.title = "";
        this.albumChannelQuery(this.query);
      }
    }
  },
  mounted() {
    this.albumChannelQuery(this.query);
  }
};
</script>
<style lang="less">
.album-channel {
  position: relative;
  padding: 24px 30px;
  justify-content: flex-start;
  background-color: #fff;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  }
  .album-thumb {
    width: 120px;
    height: 120px;
    position: relative;
    overflow: hidden;
    margin-right: 20px;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
  .album-box {
    p {
      font-weight: bold;
    }
    span {
      color: #8d8d8d;
    }
    time {
      color: #92cd36;
    }
  }
}
._confirm {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 11;
  padding: 20px 0;
  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  > a {
    width: 200px;
  }
}
</style>
