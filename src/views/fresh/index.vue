<template>
  <div class="page">
    <div class="page-hd">
      <div class="button-sp-area flex" size-17>
        <a href="javascript:void(0);" @click="handleSelectClass">
          <span>{{ className }}</span>
        </a>
      </div>
    </div>
    <div class="page-bd">
      <router-link to="/fresh/add" class="release">
        <img src="@/assets/image/release-icon.png" alt="">
      </router-link>
      <figure class="figure" v-for="(f, index) in freshData" :key="index" @click="handleRouteGo">
        <h3 class="text-ellipsis">{{ f.title }}</h3>
        <div style="color:#8d8d8d;">
          <time>{{ f.postTime }}</time>
        </div>
        <img src="http://iph.href.lu/690x298" alt="">
        <p class="line-clamp">{{ f.textContent }}</p>
        <div class="metedata" style="color:#8d8d8d;">
          <span>{{ f.classReadCount }}人阅读</span>
          <span>留言{{ f.classCommentCount }}</span>
        </div>
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
      className: "选择班级查看",
      classList: [],
      query: {
        openId: this.$store.getters.openId,
        classId: 0
      },
      queryClass: {
        id: this.$store.getters.id,
        roleType: this.$store.getters.roleType
      },
      freshData: []
    };
  },
  methods: {
    handleRouteGo() {
      //this.$router.push({ path: "/fresh/show" });
    },
    handleSelectClass() {
      this.$weui.picker(this.classList, {
        defaultValue: [this.query.classId],
        onConfirm: result => {
          let value = result[0].value; //取第一个元素
          let label = result[0].label;
        }
      });
    },
    //根据类型查询相关班级
    async queryClassId(params = {}) {
      let res = await service.queryClassId(params);
      if (res.errorCode === 0) {
        let classMap = res.data.map(item => {
          return {
            label: item.className,
            value: item.classId
          };
        });
        this.classList = classMap;
      }
    },
    //速报列表查询
    async freshQuery(params = {}) {
      let res = await service.freshQuery(params);
      if (res.errorCode === 0) {
        this.freshData = res.data;
      }
    }
  },
  mounted() {
    this.queryClassId(this.queryClass);
  },
  activated() {
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
.figure {
  padding: 0 30px;
  margin-bottom: 30px;
  background-color: #fff;
  &:active {
    background-color: #f2f2f2;
  }
  h3 {
    font-size: 36px;
    padding: 20px 0;
  }
  p {
    font-size: 28px;
  }
  img {
    width: 690px;
    height: 298px;
    margin: 20px 0;
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
