<template>
  <div class="page">
    <template v-if="roleType == 1 || roleType == 2 || roleType == 4">
      <div class="page-hd">
        <div class="button-sp-area flex" size-17>
          <a href="javascript:void(0);" id="showDatePicker" @click="popupShow = true">
            <span>{{ className }}</span>
            <i class="iconfont icon-xiangxia1"></i>
          </a>
        </div>
      </div>
    </template>
    <div class="page-bd">
      <!-- -->
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="classList"
          show-toolbar
          value-key="className"
          @cancel="popupShow = false"
          @confirm="handleClassConfirm"
        ></van-picker>
      </van-popup>
      <template v-if="roleType == 2">
        <router-link to="/fresh/add" class="release">
          <img src="@/assets/image/release-icon.png" alt>
        </router-link>
      </template>
      <figure
        class="figure figure-skin-two"
        v-for="(fresh, index) in freshData"
        :key="index"
        @click="handleJump(fresh)"
      >
        <div class="figure-bd">
          <div class="figure-info">
            <figcaption size-18 class="text-ellipsis">{{ fresh.title }}</figcaption>
            <div class="metedata flex">
              <time class="time">{{ fresh.postTime }}</time>
            </div>
            <div
              class="figure-thumb-medium"
              v-if="fresh.topImage"
              :style="{backgroundImage: `url(${fresh.topImage})`}"
            ></div>
            <p class="line-clamp">{{ fresh.textContent | brReplace }}</p>
          </div>
        </div>
        <div class="figure-ft">
          <div class="figure-icon">
            <i class="iconfont icon-chakan"></i>
            <b>{{ fresh.classReadCount }}</b>
          </div>
          <div class="figure-icon">
            <i class="iconfont icon-pinglun"></i>
            <b>{{ fresh.classCommentCount }}</b>
          </div>
        </div>
      </figure>
      <div class="empty" v-if="!freshData.length">
        <img src="@/assets/image/kong.png" alt>
        <p size-18>暂无新鲜速报</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapGetters } from "vuex";
import { scrollMixins } from "@/mixins/scroll";
export default {
  name: "fresh",
  mixins: [scrollMixins],
  data() {
    return {
      popupShow: false,
      className: this.$store.getters.className,
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        openId: this.$store.getters.openId || this.$route.query.openId,
        classId: this.$store.getters.classId || this.$route.query.classId,
        page: 1,
        pageSize: 10
      },
      roleType: this.$store.getters.roleType || this.$route.query.roleType,
      queryClass: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType || this.$route.query.roleType
      },
      freshData: []
    };
  },
  computed: {
    ...mapGetters(["classList"])
  },
  filters: {
    brReplace(value) {
      if (!value) return "";
      return value.replace(/<br\/>/g, "");
    }
  },
  methods: {
    //选择班级
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.freshQuery(this.query);
    },
    handleJump(fresh) {
      this.$router.push({
        path: "/fresh/show",
        query: { freshId: fresh.freshId, classId: fresh.classId }
      });
    },
    //加载分页数据
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
          service.freshQuery(this.query).then(res => {
            if (res.errorCode === 0) {
              this.totalPage = res.data.totalPage;
              this.query.page = res.data.page;
              this.isLoading = false;
              let list = res.data.data;
              if (list.length) {
                list.forEach(element => {
                  this.freshData.push(element);
                });
              }
            }
          });
        }
      }
    },
    //速报列表查询
    async freshQuery(params = {}) {
      let res = await service.freshQuery(params);
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.isLoading = false;
        this.freshData = res.data.data || [];
      }
    }
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      this.$store.dispatch("user/reload", this.$route.query, { root: true });
    }
    this.freshQuery(this.query);
  }
};
</script>
<style lang="less">
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
}
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
}
</style>
