
<template>
  <div class="page">
    <template v-if="roleType === 1 || roleType === 2">
      <div class="page-hd">
        <div class="button-sp-area flex" size-17>
          <a href="javascript:;" @click="popupShow = true">
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
      <template v-if="roleType === 2">
        <router-link to="/homework/add" class="release">
          <img src="@/assets/image/release-icon.png" alt>
        </router-link>
      </template>
      <figure class="figure" v-for="(homework, index) in homeworkData" :key="index">
        <router-link
          :to="{ path: '/homework/show', query: { classId: homework.classId, homeId: homework.homeId} }"
        >
          <h3 class="text-ellipsis">{{ homework.title }}</h3>
          <div style="color:#8d8d8d;">
            <time>{{ homework.postTime }}</time>
          </div>
          <template v-if="homework.topImage">
            <div class="pic" :style="{backgroundImage: `url(${homework.topImage})`}"></div>
          </template>
          <p class="line-clamp">{{ homework.textContent }}</p>
          <div class="metedata" style="color:#8d8d8d;">
            <span>{{ homework.classReadCount }}人阅读</span>
          </div>
        </router-link>
      </figure>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "homeWork",
  data() {
    return {
      popupShow: false,
      className: "",
      classList: this.$store.getters.classList,
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
    ...mapGetters(["roleType"])
  },
  methods: {
    //选择班级
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.homeworkQuery(this.query);
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
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
        this.className = res.data[0].className;
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
  deactivated() {
    window.removeEventListener("scroll", this.handleLoadingMore);
  },
  activated() {
    window.addEventListener("scroll", this.handleLoadingMore);
  },
  mounted() {
    this.homeworkQuery(this.query);
    this.queryClassId(this.queryClass);
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
.figure {
  margin-bottom: 30px;
  background-color: #fff;
  > a {
    position: relative;
    padding: 0 30px;
    display: block;
  }
  &:active {
    background-color: #f2f2f2;
  }
  h3 {
    font-weight: bold;
    font-size: 36px;
    padding: 20px 0 0 0;
  }
  p {
    font-size: 30px;
    margin: 10px 0 20px 0;
    line-height: 1.5;
  }
  .pic {
    width: 690px;
    height: 298px;
    margin: 20px 0;
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .metedata {
    margin: 20px -30px 0 -30px;
    padding: 0 30px;
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f5f5f5;
  }
}
</style>
