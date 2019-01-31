<template>
  <div class="page">
    <template v-if="roleType == 1 || roleType == 2">
      <div class="page-hd">
        <div class="button-sp-area flex" size-17>
          <a href="javascript:void(0);" @click="popupShow = true">
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
          @confirm="handleClassConfirm">
        </van-picker>
      </van-popup>      
      <template v-if="roleType == 2">
        <router-link to="/fresh/add" class="release">
          <img src="@/assets/image/release-icon.png" alt="">
        </router-link>
      </template>
      <figure class="figure" v-for="(fresh, index) in freshData" :key="index">
        <router-link  :to="{ path: '/fresh/show', query: { freshId: fresh.freshId, classId: fresh.classId} }">
          <h3 class="text-ellipsis">{{ fresh.title }}</h3>
          <div style="color:#8d8d8d;">
            <time>{{ fresh.postTime }}</time>
          </div>
          <template v-if="fresh.topImage">
            <div class="pic" :style="{backgroundImage: `url(${fresh.topImage})`}"></div>
          </template>
          <p class="line-clamp">{{ fresh.textContent }}</p>
          <div class="metedata" style="color:#8d8d8d;">
            <div>
              <span>{{ fresh.classReadCount }}人阅读</span>
              <span>留言{{ fresh.classCommentCount }}</span>
            </div>
          </div>
        </router-link>  
      </figure>  
    </div>
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "fresh",
  data() {
    return {
      popupShow: false,
      className: "",
      classList: [],
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
  methods: {
    //选择班级
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.freshQuery(this.query);
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
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        this.classList = res.data;
        this.className = res.data[0].className;
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
        this.freshData = res.data.data;
      }
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleLoadingMore);
  },
  mounted() {
    this.queryClassId(this.queryClass);
    this.freshQuery(this.query);
    document.addEventListener("scroll", this.handleLoadingMore);
  },
  activated() {}
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
    padding: 20px 0 10px 0;
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
