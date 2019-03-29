<template>
  <div class="community">
    <div class="box" v-for="(fuck, index) in data" :key="fuck.communityId">
      <div class="cell">
        <div class="cell-hd">
          <img v-if="fuck.photo" :src="fuck.photo">
        </div>
        <div class="cell-bd">
          <h5 size-15>{{ fuck.name }}</h5>
          <p size-15>{{ fuck.textContent }}</p>
          <template>
            <div class="img-group">
              <div
                class="item"
                :style="{backgroundImage: `url(${img.imageUrl})`}"
                v-for="(img, index) in fuck.images"
                :key="index"
                @click="handlePreviewImage(index, fuck.images)"
              ></div>
            </div>
          </template>
          <div class="handle">
            <div class="left">
              <time>{{ fuck.postTime }}</time>
              <!-- 园长和老师才能删除 -->
              <template v-if="roleType == 1 || roleType == 2">
                <span class="del" @click="handleCommunityDelete(fuck, index)">删除</span>
              </template>
            </div>
            <div class="right">
              <i class="iconfont icon-zantongfill" @click="handlePraise(fuck, index)"></i>
              <i class="iconfont icon-liuyanfill" @click="handleComment(fuck, index)"></i>
            </div>
          </div>
          <div class="data">
            <template v-if="fuck.praiseList.length">
              <div class="zan-list" size-14>
                <i class="iconfont icon-zantong"></i>
                <span
                  v-for="(praise, index) in fuck.praiseList"
                  :key="index"
                >{{ praise.studentName | capitalize }}</span>
              </div>
            </template>
            <template v-if="fuck.commentList.length">
              <ul class="comment-list" size-14>
                <li
                  v-for="(commen, index) in fuck.commentList"
                  :key="index"
                >{{ commen.studentName }}:{{ commen.textContent }}</li>
              </ul>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapState } from "vuex";
import { ImagePreview } from "vant";
export default {
  name: "community",
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {};
  },
  filters: {
    capitalize(value) {
      return `${value},`;
    }
  },
  computed: {
    ...mapState("users", {
      roleType: state => state.roleType
    })
  },
  methods: {
    handlePreviewImage(index, images) {
      if (images.length) {
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
    handleCommunityDelete(fuck, index) {
      this.$emit("on-del", fuck, index);
    },
    handlePraise(fuck, index) {
      this.$emit("on-praise", fuck, index);
    },
    handleComment(fuck, index) {
      this.$emit("on-comment", fuck, index);
    }
  }
};
</script>
<style lang="less">
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
