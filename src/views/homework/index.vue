
<template>
  <div class="page">
    <template v-if="roleType === 1 || roleType === 2">
      <div class="page-hd">
        <div class="button-sp-area flex" size-17>
          <a href="javascript:;" @click="handleSelectClass">
            <span>{{ className }}</span>
          </a>
        </div>      
      </div>
    </template>
    <div class="page-bd">
      <template v-if="roleType === 2">
        <router-link to="/homework/add" class="release">
          <img src="@/assets/image/release-icon.png" alt="">
        </router-link>
      </template>
      <figure class="figure" v-for="(homework, index) in homeworkData" :key="index" @click="handleRouteGo(homework)">
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
      className: this.$store.getters.className,
      classList: this.$store.getters.classList,
      query: {
        openId: this.$store.getters.openId,
        classId: this.$store.getters.classId
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
    handleRouteGo(homework) {
      this.$router.push({
        path: `/homework/show`,
        query: { classId: `${homework.classId}`, homeId: `${homework.homeId}` }
      });
    },
    //选择班级
    handleSelectClass() {
      this.$weui.picker(this.classList, {
        defaultValue: [this.query.classId],
        onConfirm: result => {
          let value = result[0].value; //取第一个元素
          let label = result[0].label;
          this.className = label;
          this.query.classId = value;
          this.homeworkQuery(this.query);
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
    //作业列表查询
    async homeworkQuery(params = {}) {
      let res = await service.homeworkQuery(params);
      if (res.errorCode === 0) {
        this.homeworkData = res.data;
      }
    }
  },
  mounted() {
    this.queryClassId(this.queryClass);
  },
  activated() {
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
.figure {
  padding: 0 30px;
  margin-bottom: 30px;
  background-color: #fff;
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
