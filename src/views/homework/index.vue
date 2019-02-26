
<template>
  <div class="page">
    <template v-if="roleType == 1 || roleType == 2 || roleType == 4">
      <div class="page-hd">
        <div class="button-sp-area flex" size-17>
          <a href="javascript:;" id="showDatePicker" @click="popupShow = true">
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
        <router-link to="/homework/add" class="release">
          <img src="@/assets/image/release-icon.png" alt>
        </router-link>
      </template>
      <figure
        class="figure figure-skin-two"
        v-for="(homework, index) in homeworkData"
        :key="index"
        @click="handleJump(homework)"
      >
        <div class="figure-bd">
          <div class="figure-info">
            <figcaption size-18 class="text-ellipsis">
              <i v-if="!homework.status"></i>
              <span>{{ homework.title }}</span>
            </figcaption>
            <div class="metedata flex">
              <time class="time">{{ homework.postTime }}</time>
            </div>
            <div
              class="figure-thumb-medium"
              v-if="homework.topImage"
              :style="{backgroundImage: `url(${homework.topImage})`}"
            ></div>
            <p class="line-clamp">{{ homework.textContent }}</p>
          </div>
        </div>
        <div class="figure-ft">
          <div class="figure-icon">
            <i class="iconfont icon-chakan"></i>
            <b>{{ homework.classReadCount }}</b>
          </div>
        </div>
      </figure>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapGetters } from "vuex";
import { scrollMixins } from "@/mixins/scroll";
export default {
  name: "homeWork",
  mixins: [scrollMixins],
  data() {
    return {
      popupShow: false,
      className: this.$store.getters.className,
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        openId: this.$store.getters.openId,
        classId: this.$store.getters.classId,
        page: 1,
        pageSize: 10
      },
      queryClass: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      homeworkData: []
    };
  },
  computed: {
    ...mapGetters(["roleType", "classList"])
  },
  methods: {
    //选择班级
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.homeworkQuery(this.query);
    },
    handleJump(homework) {
      this.$router.push({
        path: "/homework/show",
        query: {
          classId: homework.classId,
          homeId: homework.homeId,
          needConfirm: homework.needConfirm
        }
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
          service.homeworkQuery(this.query).then(res => {
            if (res.errorCode === 0) {
              this.totalPage = res.data.totalPage;
              this.query.page = res.data.page;
              this.isLoading = false;
              let list = res.data.data;
              if (list.length) {
                list.forEach(element => {
                  this.homeworkData.push(element);
                });
              }
            }
          });
        }
      }
    },
    //作业列表查询
    async homeworkQuery(params = {}) {
      let res = await service.homeworkQuery(params);
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.isLoading = false;
        this.homeworkData = res.data.data;
      }
    }
  },
  mounted() {
    this.homeworkQuery(this.query);
  }
};
</script>
<style lang="less">
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
}
</style>
