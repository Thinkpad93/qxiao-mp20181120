<template>
  <div class="flex-page">
    <div class="flex-bd">
      <template v-if="list.length">
        <div class="album">
          <div class="album-figrue-box flex f-w-w" style="margin-left: -10px; margin-right: -10px;">
            <figure
              class="album-figure"
              v-for="(album, index) in list"
              :key="index"
              @click="jump(album)"
            >
              <a href="javascript:void(0);">
                <div class="album-thumb">
                  <img v-if="album.image" :src="album.image" alt>
                  <img v-else src="@/assets/image/kong.png" alt>
                </div>
                <figcaption>
                  <p size-16>{{ album.className }}</p>
                  <p size-14>{{ album.imagesCount }}张</p>
                </figcaption>
              </a>
            </figure>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import service from "@/api";
export default {
  name: "album",
  data() {
    return {
      query: {
        openId: this.$store.state.user.info.openId,
        roleType: this.$store.state.user.info.roleType
      },
      list: []
    };
  },
  methods: {
    jump(item) {
      if (this.roleType != 2) {
        if (item.imagesCount === 0) {
          this.$toast("暂无班级图片查看");
          return;
        }
      }
      this.$router.push({
        path: "/album/view",
        query: {
          classId: item.classId
        }
      });
    },
    //查询相册所属班级
    async albumClassQuery(params = {}) {
      let res = await service.albumClassQuery(params);
      if (res.errorCode === 0) {
        this.list = res.data;
      }
    }
  },
  mounted() {
    this.albumClassQuery(this.query);
  }
};
</script>
<style lang="less" scoped>
.album {
  padding: 30px;
  background-color: #fff;
  .album-figure {
    width: 50%;
    padding: 0 20px;
    margin-bottom: 30px;
    > a {
      position: relative;
      display: block;
      box-shadow: 0 0 14px 0 rgba(21, 21, 21, 0.2);
    }
    figcaption {
      padding: 20px;
      p {
        &:first-child {
          font-weight: bold;
        }
      }
    }
  }
  .album-thumb {
    // width: 310px;
    height: 310px;
    position: relative;
    padding-bottom: 100%;
    overflow: hidden;
    background-color: #e4f1ff;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
